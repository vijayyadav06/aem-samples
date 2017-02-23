import com.adobe.granite.asset.api.*
import org.apache.poi.xssf.usermodel.*
import org.apache.commons.lang3.*

spreadsheetPath = "/content/dam/medtronic-com/DoNotTranslate.xlsx"
//toggle on whether to inherit from the previous row's column if blank. (if false, empty string is used instead.)
inheritOnNull = true

propertyTable = []
headers = []
NUM_COLUMNS = 4
//assume the first row is filled with column headers?
firstRowHeader = true

getAsset(spreadsheetPath)?.getStream()?.withStream { stream ->
    def workbook = new XSSFWorkbook(stream)
    def sheet = workbook.getSheetAt(0)
    convertSheetToTable(sheet)
    return table {
        columns(headers)
        rows(propertyTable)}
}


def getAsset(assetPath) {
    def assetManager = resourceResolver.adaptTo(AssetManager)
    def asset = assetManager.getAsset(assetPath)
    asset?.getRendition("original")
}

def getInheritedProperty(columnNum){
    return getInheritedProperty(columnNum,null)
}

def getInheritedProperty(columnNum,index){
    def inherited = null
    if( index == null) index = propertyTable.size() - 1
    if (index > 0){
        def lastCell = propertyTable.get(index)
        if( StringUtils.isNotEmpty(lastCell[columnNum]) ){
            inherited = lastCell[columnNum]
        }else{
            //shouldn't ever need this as we're filling in as we go..
            inherited = getInheritedProperty(columnNum,index - 1)
        }
    }
    return inherited
}

def handleRow(row) {
    def lastColumn = NUM_COLUMNS
    def rowProps = []
    def rowNum = row.getRowNum()

    //iterate over all cells, including null/blank
    for (def colNum = 0; colNum < lastColumn; colNum++) {
        def cell = row.getCell(colNum, org.apache.poi.ss.usermodel.Row.RETURN_BLANK_AS_NULL);
        if( cell == null){
            if( StringUtils.isBlank(headers[colNum] as String) ){
                //if its null, and there is no existing header value, skiiiip
                continue
            }else{
                //it is null and there is a header.
                rowProps[colNum] = inheritOnNull ? getInheritedProperty(colNum):""
            }
        } else {
            if( rowNum == 0 && firstRowHeader){
                //the cell has a value and we're in first row, set the column headers
                headers[colNum] = cell.getStringCellValue()
            }else if( StringUtils.isNotBlank(cell.getStringCellValue()) ){
                //the cell has a value and the header also does, wicked, lets use it!
                rowProps[colNum] = cell.getStringCellValue();
            }
        }
    }
    if( rowProps.size() > 0 ){
        propertyTable.add(rowProps)
    }
}

def convertSheetToTable(sheet) {
    def rowIterator = sheet.rowIterator()
    //note, this skips empty rows.
    if( !firstRowHeader){
        (1..NUM_COLUMNS).each { i ->
            headers[i-1] = "Column ${i}"
        }
    }
    rowIterator.each { row ->
        handleRow(row)
    }
}