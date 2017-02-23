package com.medtronic.com.app;

import com.adobe.cq.sightly.WCMUse;

import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by ryanmccullough on 2015-11-26.
 */
public class ResponsiveTable extends WCMUse {
    private static final Logger LOG = LoggerFactory.getLogger(ResponsiveTable.class);

    /* Dialog Properties
    *
    * If you change these, please ensure the JS file and dialog is changed accordingly:
    *
    *   author-clientlibs/js/Medtronic.Authoring.ResponsiveTable.js
    *   dialog.xml
    * */
    public static final String PROP_NUM_COLUMNS = "numColumns";
    public static final String PROP_NUM_ROWS = "numRows";
    public static final String PROP_DISPLAY = "display";
    public static final String PROP_TITLE = "title";
    public static final String PROP_DESCRIPTION = "description";
    public static final String PROP_COL_ORDER = "colOrder";
    public static final String PROP_ROW_ORDER = "rowOrder";
    public static final String PROP_IS_FIRST_COL_HEADER = "isFirstHeader";
    public static final String PROP_SHOW_MODE = "showMode";
    public static final String PROP_SHOW_SORT = "showSort";


    /* Dialog Defaults */
    private static final int DEFAULT_ROWS = 1;
    private static final int DEFAULT_COLS = 1;
    private static final String DEFAULT_DISPLAY = "togglecolumn";
    private static final Boolean DEFAULT_IS_FIRST_COL_HEADER = false;
    private static final Boolean DEFAULT_SHOW_MODE = true;
    private static final Boolean DEFAULT_SHOW_SORT = true;

    /* Property Values */
    private String title;
    private String display;
    private String description;
    private int numCols;
    private int numRows;
    private Boolean isFirstColHeader;
    private String[] colOrder;
    private String[] rowOrder;
    private Boolean showSort;
    private Boolean showMode;

    /*
        table-cell include prefixes

        td-1-1 = first column, first row
        th-1 = first header
    */
    private static String TH_ELEMENT = "th";
    private static String TD_ELEMENT = "td";
    private static String TABLE_CELL_FORMAT = TD_ELEMENT+"-%s-%s";
    private static String TABLE_HEADER_FORMAT = TH_ELEMENT+"-%d";
    public static String TABLE_HEADER_COL_REGEX = TH_ELEMENT+"-(\\d)";//make sure this matches format ^

    List<Integer> columnIndexList;
    List<String> tableHeaders;
    List<List<String>> tableRows;

    @Override
    public void activate() {
        ValueMap properties = getProperties();
        title = properties.get(PROP_TITLE,String.class);
        display = properties.get(PROP_DISPLAY,DEFAULT_DISPLAY);
        description = properties.get(PROP_DESCRIPTION,String.class);
        numCols = properties.get(PROP_NUM_COLUMNS, DEFAULT_COLS);
        numRows = properties.get(PROP_NUM_ROWS, DEFAULT_ROWS);
        isFirstColHeader = properties.get(PROP_IS_FIRST_COL_HEADER,DEFAULT_IS_FIRST_COL_HEADER);
        colOrder = properties.get(PROP_COL_ORDER, String[].class);
        rowOrder = properties.get(PROP_ROW_ORDER, String[].class);
        showMode = properties.get(PROP_SHOW_MODE, DEFAULT_SHOW_MODE);
        showSort = properties.get(PROP_SHOW_SORT, DEFAULT_SHOW_SORT);


        initTableHeaders();
        initTableRows();

    }

    private void initTableHeaders(){
        tableHeaders = new ArrayList<>();
        columnIndexList = new ArrayList<>();
        for( int i=0; i < numCols; i++){
            String tableHeader;
            if(colOrder != null && i < colOrder.length){
                //if there is a column order, and i is a valid index, use that value
                tableHeader = colOrder[i];

            }else if (colOrder != null && i >= colOrder.length ) {
                //if the colOrder string array is shorter than the number of columns, generate the missing entries dynamically
                tableHeader = getFirstMissingHeaderName();
            }else{
                tableHeader = String.format(TABLE_HEADER_FORMAT,i+1);
            }
            columnIndexList.add(getColumnNumberFromName(tableHeader));
            tableHeaders.add(tableHeader);
        }
    }


    private void initTableRows(){
        tableRows = new ArrayList<>();
        for( int i = 0; i < numRows; i++){
            List<String> curRow = new ArrayList<String>();
            for( int j = 0; j < numCols; j++){
                int rowIndex = rowOrder != null && rowOrder.length > i ? Integer.parseInt(rowOrder[i]):i+1;
                curRow.add(String.format(TABLE_CELL_FORMAT, rowIndex, columnIndexList.get(j)));
            }
            tableRows.add(curRow);
        }
    }

    private String getFirstMissingHeaderName(){
        //get the first unused table header value.  default to 1
        String tableHeader = String.format(TABLE_HEADER_FORMAT,1);
        for(int i = 1 ; i <= numCols; i++){
            tableHeader = String.format(TABLE_HEADER_FORMAT,i);
            if(!tableHeaders.contains(tableHeader) ){
                break;
            }
        }
        return tableHeader;
    }

    public String getTitle(){
        return title;
    }

    public String getDescription(){
        return description;
    }

    public List<String> getHeaders(){
        return tableHeaders;
    }

    public List<List<String>> getRows(){
        return tableRows;
    }

    public String getDisplay(){
        return display;
    }

    public Boolean getShowSort(){
        return showSort;
    }

    public Boolean getShowMode(){
        return showMode;
    }

    public String getFirstColElement(){
        return isFirstColHeader ? TH_ELEMENT:TD_ELEMENT;
    }

    public String getTDElement(){
        return TD_ELEMENT;
    }

    public static int getColumnNumberFromName(String name){
        int colNum = -1;
        Matcher colNumMatcher = Pattern.compile(ResponsiveTable.TABLE_HEADER_COL_REGEX).matcher(name);
        if(colNumMatcher.find()) {
            colNum = Integer.parseInt(colNumMatcher.group(1));
        }
        if( colNum <=0 ){
            LOG.warn("Could not find a valid column number from node name.  Defaulting to 1.");
            colNum = 1;
        }
        return colNum;
    }
}
