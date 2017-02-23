import com.adobe.granite.asset.api.*
import org.apache.poi.xssf.usermodel.*
import org.apache.commons.lang3.*
import javax.jcr.query.Query
import org.apache.poi.ss.usermodel.Row
import groovy.json.*
import groovy.xml.MarkupBuilder
import groovy.xml.StreamingMarkupBuilder
import java.io.FileWriter

//where to read the xlsx file.
spreadsheetPath = "/content/dam/medtronic-com/ComponentPropertyMappings.xlsx"
saveChanges = false
//xml file name
xmlName = "component-paths.xml"


getAssetFromDAM(spreadsheetPath)?.getStream()?.withStream { stream ->
    def workbook = new XSSFWorkbook(stream)component-property-xml-creator
    def sheet = workbook.getSheetAt(0)
    //Doesn't do anything after this as it just prints the xml out. Will eventually save the xml file to the dam
    def xml = buildXmlFromSheet(sheet)
}

def getAssetFromDAM(assetPath) {
    def assetManager = resourceResolver.adaptTo(AssetManager)
    def asset = assetManager.getAsset(assetPath)
    asset?.getRendition("original")
}

def buildXmlFromSheet(sheet) {
    def rows = sheet.rowIterator().drop(1)
    def writer = new StringWriter()
    def xml  = new MarkupBuilder(writer)

    xml."com.claytablet.cq5.ctctranslation.service.ctcdata.ConfigTFieldList"() {
        xml.configTFieldList() {
           rows.each { row ->
                def componentPathValue = row.getCell(0, Row.RETURN_BLANK_AS_NULL).stringCellValue
                def propertyNameValue = row.getCell(1, Row.RETURN_BLANK_AS_NULL).stringCellValue
                xml."com.claytablet.cq5.ctctranslation.service.ctcdata.ConfigTField"() {
                    componentPath(componentPathValue)
                    propertyName(propertyNameValue.substring(2))
                }
            } 
        }
    }
        
    println writer.toString()
    xml
}