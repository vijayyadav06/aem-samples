Medtronic.Authoring.Accordion = (function() {
    "use strict";
    var PROP_SECTIONPATH = "sectionPath";
    var PROP_COLUMNS = "_DNT_columns";
    var PROP_ONE_COLUMN = "one";
    var PROP_TWO_COLUMN = "two";
    var FIRST_SECTION_DESCRIPTION = "This section will be expanded by default.";
    var TWO_COLUMN_PARSYS_SUFFIX = ["_rightpar","_leftpar"];
    var ONE_COLUMN_PARSYS_SUFFIX = ["_row"];

    var DELETE = "@Delete";
    return {
        /* global variable for number of multifiled items */
        itemNum : 0,

        loadcontent : function (dialog){
            //for some reason, the dialog isn't available in the removed event,
            //so we store it here for later use.
            if (!this.dialog){
                this.dialog = dialog;
            }
            Medtronic.Authoring.addMinimumMultifieldItems(dialog);
        },

        /* dynamically display the fieldLabel */
        displayFieldLabel : function (field) {
          this.itemNum = this.itemNum + 1;
          if (this.itemNum == 1) {
            field.fieldDescription = FIRST_SECTION_DESCRIPTION;
          }
        },

        /* reduce the itemNum before the item removed */
        removeItem : function (field) {
          if (this.itemNum == 0) { return false; }
          this.itemNum = this.itemNum - 1;
          var count = field.items.getCount() - 1;
          for (var i = 0; i < count; i++) {
            var item = field.items.get(i).findByType("textfield")[0];
            var text_item = $("#" + item.id).parent().parent();
            if (i == 0) {
              var help_text = $(text_item).children(".x-form-item-description");
              var description = "<div style='padding-left: 180px;' class='x-form-item-description'>"+FIRST_SECTION_DESCRIPTION+"</div>"
              if (help_text.length == 0) {
                var xFormElement = $(text_item).children(".x-form-element")[0];
                $(xFormElement).after(description);
              }
            }
          }
        },

        /* reset the itemNum before dialog hide */
        resetValueAcc : function () {
          this.itemNum = 0;
        },

        sectionPathAdded : function (field) {
            //first, hide the field (hidden fields aren't submitted in multifieldpanels
            field.hide();

            //then, give field a unique name for inclusion (if it doesnt have one already)
            if( field && !field.getValue()){
                field.setValue(field.key + "_" + new Date().getTime());
            }
        },
        sectionRemoved : function (field,multiField) {
            //in case the column was toggled prior to removal, we always remove
            //using the original value, not the current.
            var originalValue = field.panelValue.getValue();
            if( originalValue ){
                var columnValue,sectionPathValue;
                try{
                    var jsonValue = JSON.parse(originalValue);
                    columnValue = jsonValue[PROP_COLUMNS];
                    sectionPathValue = jsonValue[PROP_SECTIONPATH];
                }catch( err ){
                    //not valid json, return
                    return;
                }
                //get the suffix for the parsys based on the amount of columns
                var suffixArray = [];
                if( columnValue == PROP_ONE_COLUMN){
                   suffixArray = ONE_COLUMN_PARSYS_SUFFIX;
                }else if ( columnValue == PROP_TWO_COLUMN ){
                    suffixArray = TWO_COLUMN_PARSYS_SUFFIX;
                }
                //set up the names of the node names to be deleted
                var deleteFields = {};
                suffixArray.forEach(function(suffix){
                    deleteFields["./"+sectionPathValue+suffix+DELETE] = null;
                });
                //add the hidden delete fields to dialog submit.
                this.dialog.addHidden(deleteFields);
            }

        }
    };
})();