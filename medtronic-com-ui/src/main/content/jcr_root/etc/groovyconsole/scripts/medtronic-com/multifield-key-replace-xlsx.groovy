import com.adobe.granite.asset.api.*
import org.apache.poi.xssf.usermodel.*
import org.apache.commons.lang3.*
import javax.jcr.query.Query
import org.apache.poi.ss.usermodel.Row
import groovy.json.*

//where to read the xlsx file.
spreadsheetPath = "/content/dam/medtronic-com/DoNotTranslate.xlsx"
searchRoot = "/content/medtronic-com/"
saveChanges = false


getAssetFromDAM(spreadsheetPath)?.getStream()?.withStream { stream ->
    def workbook = new XSSFWorkbook(stream)
    def sheet = workbook.getSheetAt(0)
    def mapping = getMappingFromSheet(sheet)
    
    updateMultifieldProperties(mapping)
    
    doSave()
}

def updateMultifieldProperties(mapping) {
    
    mapping.each { resourceType, multifields ->
        def query = "SELECT * FROM [nt:unstructured] AS s WHERE ISDESCENDANTNODE([${searchRoot}]) AND s.[sling:resourceType] LIKE '%${resourceType}'"

        def resourcePaths = resourceResolver.findResources(query, Query.JCR_SQL2).collect { resource ->
            resource.path
        } as Set

        println "-" * 80
        println "Resource type ${resourceType} has ${resourcePaths.size()} components"

        // for each resource of this type
        resourcePaths.each { resourcePath ->
            def resourceProperties = resourceResolver.getResource(resourcePath).adaptTo(ModifiableValueMap.class)
            
            println "-" * 40
            println "Found at ${resourcePath}"
            println "Resource type on node ${resourceProperties['sling:resourceType']}"
            
            multifields.each { multifieldName, mappedJsonFields ->
                def multifieldValues = resourceProperties.get(multifieldName, String[].class)
                
                println "-" * 20
                println "Working on multifield ${multifieldName}"
                println "Replacing properties with the following mapping ${mappedJsonFields}"
                
                println "${multifieldValues?.size() ?: 0} value${multifieldValues?.size() == 1 ? '' : 's'} found"
                
                multifieldValues = multifieldValues?.inject([]) { result, value ->
                    def parsedJson = new JsonSlurper().parseText(value)
                    
                    mappedJsonFields.each { oldField, newField ->
                        if (parsedJson[oldField] && !parsedJson[newField]) {
                            println "${result.size()}: Replacing ${oldField} with ${newField}"
                            def oldFieldValue = parsedJson[oldField]
                            parsedJson.remove(oldField)
                            parsedJson[newField] = oldFieldValue
                        }
                    }
                    
                    result << new JsonBuilder(parsedJson).toString()
                } as String[]
                
                if (multifieldValues) {
                    resourceProperties.remove(multifieldName)
                    resourceProperties.put(multifieldName, multifieldValues)
                }
                
                println ""
            }
        }
    }
}

def getAssetFromDAM(assetPath) {
    def assetManager = resourceResolver.adaptTo(AssetManager)
    def asset = assetManager.getAsset(assetPath)
    asset?.getRendition("original")
}

def getMappingFromSheet(sheet) {
    def rows = sheet.rowIterator().drop(1)
    
    rows.inject([:]) { mapping, row ->
        insertRowIntoMapping(row, mapping)
        
        mapping
    }
}

def insertRowIntoMapping(row, mapping) {
    def resourceType = row.getCell(0, Row.RETURN_BLANK_AS_NULL).stringCellValue
    def multifieldProperty = row.getCell(1, Row.RETURN_BLANK_AS_NULL).stringCellValue
    def oldJsonField = row.getCell(2, Row.RETURN_BLANK_AS_NULL).stringCellValue
    def newJsonField = row.getCell(3, Row.RETURN_BLANK_AS_NULL).stringCellValue
    
    def multifields = mapping[resourceType] ?: [:]
    mapping[resourceType] = multifields
    
    def multifield = multifields[multifieldProperty] ?: [:]
    multifields[multifieldProperty] = multifield
    
    multifield[oldJsonField] = newJsonField
    
    mapping
}

def doSave(){
    if( saveChanges ){
        resourceResolver.commit()
    }else{
        resourceResolver.revert()
    }
}