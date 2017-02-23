import com.adobe.granite.asset.api.*
import org.apache.poi.xssf.usermodel.*
import org.apache.commons.lang3.*
import com.day.cq.wcm.commons.ReferenceSearch
import org.apache.poi.ss.usermodel.Row
import org.apache.commons.lang3.exception.ExceptionUtils

searchRoot = "/content/medtronic-com/"

slingRepository = getService("org.apache.sling.jcr.api.SlingRepository")

movedPaths = [:]

// These are zero-indexed ranges
DATA_SOURCE = [
    IA_PATIENTS: [
        "/content/dam/admin-assets/ATLAS_IA_with_URLS.xlsx",
        1, columnIndex("L"), columnIndex("M")
    ],
    IA_HCP: [
        "/content/dam/admin-assets/ATLAS_IA_with_URLS.xlsx",
        2, columnIndex("M"), columnIndex("N")
    ],
    CONTENT_MOVE_PATIENTS: [
        "/content/dam/admin-assets/content-move-spreadsheet-from-sl.xlsx",
        1, columnIndex("D"), columnIndex("E")
    ]
]

ACTIONS = [MOVE_PAGE: "movePage", VERIFY_BEFORE_MOVE: "verifyBeforeMove", VERIFY_AFTER_MOVE: "verifyAfterMove"]

(spreadsheetPath,
sheetIndex,
oldUrlColumnIndex,
newUrlColumnIndex) = DATA_SOURCE.IA_PATIENTS
     
ACTION = ACTIONS.VERIFY_AFTER_MOVE

step1_PreVerify()
println "=" * 40
println ""

step2_MovePages()
println "=" * 40
println ""

step3_Verify()
println "=" * 40
println ""

println "finished"

def step1_PreVerify() {
    println "Step 1"
    println "=" * 8
    (spreadsheetPath,
    sheetIndex,
    oldUrlColumnIndex,
    newUrlColumnIndex) = DATA_SOURCE.IA_PATIENTS
     
    ACTION = ACTIONS.VERIFY_BEFORE_MOVE

    handleSpreadsheet()
}

def step2_MovePages() {
    println "Step 2"
    println "=" * 8
    (spreadsheetPath,
    sheetIndex,
    oldUrlColumnIndex,
    newUrlColumnIndex) = DATA_SOURCE.CONTENT_MOVE_PATIENTS
     
    ACTION = ACTIONS.MOVE_PAGE

    handleSpreadsheet()
}

def step3_Verify() {
    println "Step 3"
    println "=" * 8
    (spreadsheetPath,
    sheetIndex,
    oldUrlColumnIndex,
    newUrlColumnIndex) = DATA_SOURCE.IA_PATIENTS
     
    ACTION = ACTIONS.VERIFY_AFTER_MOVE

    handleSpreadsheet()
}

def handleSpreadsheet() {
    getAsset(spreadsheetPath)?.getStream()?.withStream { stream ->
        def workbook = new XSSFWorkbook(stream)
        def sheet = workbook.getSheetAt(sheetIndex)
        def attemptedMoves = handleSheet(sheet)
        def successes = attemptedMoves.findAll { it.success }
        def errors = attemptedMoves.findAll { it.error }
        
        println "Sheet: ${sheet?.sheetName}"
        println "${attemptedMoves?.size()} total rows processed"
        println "=" * 8
        println ""
        
        println "${errors?.size()} errors"
        println "=" * 8
        println ""
        
        if (errors?.size()) {
            errors?.each { result ->
                println "${result.rowNum}: ${result.error}"
                
                if (result.oldUrl && result.newUrl) {
                    println "${result.oldUrl}.html"
                    println "${result.newUrl}.html"
                }
                
                if (result.stackTrace) {
                    println result.stackTrace
                }
                
                println ""
            }
        }
        
        if (successes?.size()) {
            println "${successes?.size()} successes"
            println "=" * 8
            println ""
            
            successes?.each { result ->
                println "${result.rowNum}: ${result.success}"
                println "${result.oldUrl}.html"
                println "${result.newUrl}.html"
                println ""
            }
        }
    }
}

def getAsset(assetPath) {
    def assetManager = resourceResolver.adaptTo(AssetManager)
    def asset = assetManager.getAsset(assetPath)
    asset?.getRendition("original")
}

def handleSheet(sheet) {
    def rowIterator = sheet?.rowIterator()
    
    rowIterator?.inject([]) { collector, row ->
        def result = handleRow(row)
        
        if (result) {
            collector << result
        }
        collector 
    }
}

def handleRow(row) {
    def oldUrl, newUrl
    
    def rowNum = ["rowNum": row.rowNum + 1]
    
    try {
        oldUrl = normalizeUrl(row.getCell(oldUrlColumnIndex, Row.CREATE_NULL_AS_BLANK).getStringCellValue())
    } catch (e) {
        return ["error": "Exception occurred when getting oldUrl.", "stackTrace": e.message] << rowNum
    }
    
    try {
        newUrl = normalizeUrl(row.getCell(newUrlColumnIndex, Row.CREATE_NULL_AS_BLANK).getStringCellValue())
    } catch (e) {
        return ["error": "Exception occurred when getting newUrl.", "stackTrace": e.message] << ["oldUrl": oldUrl] << rowNum
    }
    
    // if the parent has moved, substitute the new parent path
    def oldParentUrl = oldUrl
    
    while (oldParentUrl) {
        oldParentUrl = oldParentUrl.substring(0, oldParentUrl.lastIndexOf("/"))
        def newParentUrl = movedPaths[oldParentUrl]
        
        if (newParentUrl) {
            oldUrl = newParentUrl + oldUrl.substring(oldParentUrl.length())
            break;
        }
    } 
    
    if (oldUrl && newUrl && oldUrl != newUrl) {
        def data = ["oldUrl": oldUrl, "newUrl": newUrl] << rowNum
        if (ACTION == ACTIONS.MOVE_PAGE) {
            return movePage(data)
        } else if (ACTION == ACTIONS.VERIFY_BEFORE_MOVE) {
            return verifyBeforeMove(data)
        } else if (ACTION == ACTIONS.VERIFY_AFTER_MOVE) {
            return verifyAfterMove(data)
        }
    }
}

def normalizeUrl(url) {
    url = url?.trim()
    if (url) {
        if (url.startsWith("/content/medtronic-com/")) {
            def dotHtml = url.lastIndexOf(".html")
            
            if (dotHtml > -1) {
                url = url[0..-6]
            }
        } else {
            url = null
        }
    }
    
    url
}

def verifyBeforeMove(data) {
    def oldPage = pageManager.getPage(data.oldUrl)
    
    if (!oldPage) {
        return ["error": "Page missing before move."] << data
    }
}

def verifyAfterMove(data) {
    def newPage = pageManager.getPage(data.newUrl)
    
    if (!newPage) {
        return ["error": "Page missing after move."] << data
    }
}

def movePage(data) {
    def oldPage = pageManager.getPage(data.oldUrl)
    def newPage = pageManager.getPage(data.newUrl)
    
    if (!oldPage) {
        return ["error": "Cannot move page. Page at oldUrl does not exist."] << data
    }
    
    if (newPage) {
        return ["error": "Cannot move page. Page at newUrl already exists."] << data
    }
    
    def parentUrl = data.newUrl
    parentUrl = parentUrl.substring(0, parentUrl.lastIndexOf("/"))
    
    if (!pageManager.getPage(parentUrl)) {
        return ["error": "Cannot move page. A parent of newUrl does not exist.", "parentUrl": parentUrl] << data
    }
    
    try {
        def referencingPages = findReferencingPages(data.oldUrl)
        
        newPage = pageManager.move(oldPage, data.newUrl, null, false, false, referencingPages)
        
        movedPaths[data.oldUrl] = data.newUrl
        
        return ["success": "Page moved"] << data
    } catch (e) {
        return ["error": "Exception occurred when moving page.", "stackTrace": ExceptionUtils.getStackTrace(e)] << data
    }
}

def findReferences(oldUrl) {
    new ReferenceSearch().search(resourceResolver, oldUrl).findAll { k, referenceInfo ->
        referenceInfo.page?.path.startsWith(searchRoot)
    }
}

def findReferencingPages(oldUrl) {
    findReferences(oldUrl).keySet() as String[]
}

def columnIndex(col) {
    (col.toUpperCase() as char) - ("A" as char)
}

null