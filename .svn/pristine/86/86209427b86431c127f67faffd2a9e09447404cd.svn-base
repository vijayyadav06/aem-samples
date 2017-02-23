import com.adobe.granite.asset.api.*
import org.apache.poi.xssf.usermodel.*
import org.apache.commons.lang3.*
import com.day.cq.wcm.commons.ReferenceSearch

spreadsheetPath = "/content/dam/admin-assets/moved-pages.xlsx"
searchRoot = "/content/medtronic-com/"

getAsset(spreadsheetPath)?.getStream()?.withStream { stream ->
    def workbook = new XSSFWorkbook(stream)
    def sheet = workbook.getSheetAt(0)
    
    handleSheet(sheet)
}

def getAsset(assetPath) {
    def assetManager = resourceResolver.adaptTo(AssetManager)
    def asset = assetManager.getAsset(assetPath)
    asset?.getRendition("original")
}

def handleUrls(oldUrl, newUrl) {
    new ReferenceSearch().search(resourceResolver, oldUrl).findAll { k, v ->
        k.startsWith(searchRoot)
    }.each { k, v ->
        println k
        v.properties.each {
            println "\t${it[(k.length())..-1]}"
        }
    }
}

def handleRow(row) {
    def cellIterator = row.cellIterator().drop(3)
    def oldUrl
    def newUrl
    
    if (cellIterator.hasNext()) {
        oldUrl = "${cellIterator.next()}"
        if (oldUrl && cellIterator.hasNext()) {
            newUrl = "${cellIterator.next()}"
            
            if (oldUrl[-5..-1] == ".html") {
                oldUrl = oldUrl[0..-6]
            }
            
            if (newUrl[-5..-1] == ".html") {
                newUrl = newUrl[0..-6]
            }
            
            if (oldUrl != newUrl) {
                handleUrls(oldUrl, newUrl)
            }
        }
    }
}

def handleSheet(sheet) {
    def rowIterator = sheet.rowIterator()
    rowIterator.each { row ->
        if (row.firstCellNum > -1) {
            handleRow(row)
        }
    }
}