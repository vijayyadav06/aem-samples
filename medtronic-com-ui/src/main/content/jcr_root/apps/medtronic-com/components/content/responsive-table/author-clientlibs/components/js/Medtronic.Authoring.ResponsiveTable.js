Medtronic.Authoring.ResponsiveTable = (function() {
    "use strict";

    var TABLE_HEADER_RESOURCE_TYPE="medtronic-com/components/content/responsive-table/table-header";
    var HEADER_NODE_PREFIX = "th-";
    var ROW_TITLE_PREFIX = "Row";
    var HEADER_NOTITLE_PREFIX = "Column";//when the header doesn't have a name yet, but node exists
    var NUM_COLUMNS_PROP = "numColumns";
    var NUM_ROWS_PROP = "numRows";

    return {
        initHiddenToggle : function (field, hiddenFieldName, newValue){
            var hiddenField = field.ownerCt.find('name',hiddenFieldName);
            if( hiddenField && hiddenField.length > 0){
                if( hiddenField[0].getValue() == null || hiddenField[0].getValue() == ""){
                    field.setValue(hiddenField[0].defaultValue);
                }else{
                    field.setValue(hiddenField[0].getRawValue());
                }
            }
        },
        changeHiddenToggle: function (field, hiddenFieldName, newValue){
            var hiddenField = field.ownerCt.find('name',hiddenFieldName);
            if( hiddenField && hiddenField.length > 0){
                hiddenField[0].setValue(newValue);
            }
        },
        ColumnOrderFunctions : {
            getHeaderCols : function (path) {
                var tableHeaderJSON = [];
                var tableHeaderNodes = [];
                var pathProperties = CQ.HTTP.get(path + ".infinity.json?timestamp=" + new Date().getTime());
                if( pathProperties && pathProperties.responseText ){
                    var pathJSON = JSON.parse(pathProperties.responseText);
                    var numColumns = pathJSON[NUM_COLUMNS_PROP];
                    for( var child in pathJSON ){
                        var node = pathJSON[child];
                        if( node['sling:resourceType'] && node['sling:resourceType'] == TABLE_HEADER_RESOURCE_TYPE ){
                            var headerCol = {};
                            headerCol.text = node.title || this.getDefaultHeaderText(child);
                            headerCol.value = child;
                            tableHeaderJSON.push(headerCol);
                            tableHeaderNodes.push(child);
                        }
                    }
                    if( tableHeaderJSON.length < numColumns ){
                        var missingHeaderJSON = this.getMissingHeaderNodes(tableHeaderNodes,numColumns);
                        tableHeaderJSON = $.merge(tableHeaderJSON, missingHeaderJSON);
                    }
                }
                return tableHeaderJSON.sort(this.sortHeaderCols);
            },
            sortHeaderCols : function (a,b){
                var cmp = 0;
                if (a.value < b.value) {
                    cmp = -1;
                }
                else if (a.value > b.value){
                    cmp = 1;
                }
                return cmp;
            },
            getMissingHeaderNodes : function(tableHeaderNodes,numColumns){
                var missingHeaders = [];
                for( var i = 1; i <= numColumns; i++ ){
                    var headerName = HEADER_NODE_PREFIX + i;
                    if( $.inArray(headerName, tableHeaderNodes) == -1){
                        var missingHeaderCol = {};
                        missingHeaderCol.text = this.getDefaultHeaderText(headerName);
                        missingHeaderCol.value = headerName;
                        missingHeaders.push(missingHeaderCol);
                    }
                }
                return missingHeaders;
            },
            getDefaultHeaderText: function(nameOrNumber){
                var headerName;
                if( $.isNumeric( nameOrNumber) ){
                    return  HEADER_NOTITLE_PREFIX +" "+ nameOrNumber;
                }else{
                    headerName =  HEADER_NOTITLE_PREFIX + " " + this.getHeaderNumber(nameOrNumber);
                }
                return headerName;
            },
            getHeaderNumber : function(name){
                var pattern = /\d/g;
                var match = pattern.exec(name);
                var colNumber = 1;
                if( match && match.length > 0){
                    colNumber = match[0];
                }
                return colNumber;
            },
            validateColOrder : function(colOrder){
                var columnOrderItems = colOrder.findByType("textfield");
                var uniqueValues = [];

                for( var i = 0; i < columnOrderItems.length; i++){
                   var selectionValue = columnOrderItems[i].getValue();
                   if($.inArray( selectionValue, uniqueValues) == -1 ){
                       uniqueValues.push(selectionValue);
                       columnOrderItems[i].clearInvalid();
                   } else {
                       //it has duplicates!  Mark all (other than first) as invalid.
                       columnOrderItems[i].markInvalid("This value is already being used.");
                   }
                }
                return uniqueValues.length == columnOrderItems.length
            },
            loadContent: function(field,record,path){
                var numColumns = record.data[NUM_COLUMNS_PROP] || 1;
                var curData = field.getValue();
                var headerCols = this.getHeaderCols(path);

                if( curData.length <= numColumns ){
                    var index = 0;
                    //first, remove any that are in the current data.
                    for( var i=0; i < headerCols.length ; i++ ){
                        if( $.inArray(headerCols[i].value, curData) == -1 ){
                            field.addItem(headerCols[i].value);
                        }
                    }
                }else if (curData.length > numColumns){
                    var items = field.findByType("multifielditem");
                    for( var i = curData.length; i > numColumns; i--){
                        //remove all extra items
                        field.remove(items[i-1]);
                    }
                }
            }
        },
        RowOrderFunctions: {
            loadContent : function(field,record,path){
                var numRows = record.data[NUM_ROWS_PROP] || 1;
                var curData = field.getValue();
                var rows = this.getRows(path);

                if( curData.length < numRows ){
                    var index = 0;
                    var missingRows = numRows - curData.length;
                    for( var i=0; i < rows.length ; i++ ){
                        if( $.inArray(rows[i].value, curData) == -1 ){
                            field.addItem(rows[i].value);
                        }
                    }
                }else if (curData.length > numRows){
                    var items = field.findByType("multifielditem");
                    for( var i = curData.length; i > numRows; i--){
                    //remove all extra items
                        field.remove(items[i-1]);
                    }
                }
            },
            validateRowOrder : function(rowOrder){
                var rowOrderItems = rowOrder.findByType("textfield");
                var uniqueValues = [];

                for( var i = 0; i < rowOrderItems.length; i++){
                   var selectionValue = rowOrderItems[i].getValue();
                   if($.inArray( selectionValue, uniqueValues) == -1 ){
                       uniqueValues.push(selectionValue);
                       rowOrderItems[i].clearInvalid();
                   } else {
                       //it has duplicates!  Mark all (other than first) as invalid.
                       rowOrderItems[i].markInvalid("This value is already being used.");
                   }
                }
                return uniqueValues.length == rowOrderItems.length
            },
            getRows : function(path){
                var tableRowJSON = [];
                var pathProperties = CQ.HTTP.get(path + ".infinity.json?timestamp=" + new Date().getTime());

                if( pathProperties && pathProperties.responseText ){
                    var pathJSON = JSON.parse(pathProperties.responseText);
                    var numRows = pathJSON[NUM_ROWS_PROP];
                    for( var i = 1 ; i <= numRows; i++){
                        var rowJSON = {};
                        rowJSON.text = ROW_TITLE_PREFIX +" "+ i;
                        rowJSON.value = i.toString();
                        tableRowJSON.push(rowJSON);
                    }
                }
                return tableRowJSON;
            }
        },
        TableCell : {
            validateAltText : function (field,value) {
                var imageField = field.ownerCt.find("name","./image");
                if( imageField && imageField[0]){
                    var imagePath = imageField[0].getRawValue();
                    if( imagePath && imagePath != "" && value == ""){
                        return "You must provide an Image Alt Text if you set an image."
                    }
                }
              return true;
            }
        },
        TableCellImage : {
            validateImageField : function (field,value) {
                var imageAltTextField = field.ownerCt.find("name","./imageAlt");
                if( imageAltTextField && imageAltTextField[0]){
                    var imageAltTextPath = imageAltTextField[0].getRawValue();
                    if( imageAltTextPath && imageAltTextPath != "" && value == ""){
                        return "You must provide an Image Path if you set an Image Alt Text."
                    }
                }
              return true;
            }
        },
        Dialog : {
            validate : function (dialog){
                var isValid = true;

                var colOrderIsValid = Medtronic.Authoring.ResponsiveTable
                                        .ColumnOrderFunctions.validateColOrder(dialog.findById("colOrder"));

                if(!colOrderIsValid){
                    CQ.Ext.Msg.show({
                        title : 'Validation Failed',
                        msg : 'The column order cannot contain duplicate values.',
                        buttons : CQ.Ext.Msg.OK,
                        icon : CQ.Ext.MessageBox.ERROR
                    });
                    isValid = false;
                }

                var rowOrderIsValid = Medtronic.Authoring.ResponsiveTable
                                        .RowOrderFunctions.validateRowOrder(dialog.findById("rowOrder"));
                if(!rowOrderIsValid && isValid){
                    CQ.Ext.Msg.show({
                        title : 'Validation Failed',
                        msg : 'The row order cannot contain duplicate values.',
                        buttons : CQ.Ext.Msg.OK,
                        icon : CQ.Ext.MessageBox.ERROR
                    });
                    isValid = false;
                }

                return isValid;

            }
        }
    };
})();