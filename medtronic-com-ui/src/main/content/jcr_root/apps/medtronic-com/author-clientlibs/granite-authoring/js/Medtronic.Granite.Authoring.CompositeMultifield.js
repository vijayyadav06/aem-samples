/*
 * overwrite touchui-composite-multifield.js within ACS AEM Commons Package
 * 
*/

(function () {
    var DATA_ACS_COMMONS_NESTED = "data-acs-commons-nested",
        CFFW = ".coral-Form-fieldwrapper",
        _ = window._, CUI = window.CUI,
        Class = window.Class,
        contentLoaded=false;

    function setSelect($field, value){
        var select = $field.closest(".coral-Select").data("select");

        if(select){
            select.setValue(value);
        }
    }

    //reads multifield data from server, creates the nested composite multifields and fills them
    function addDataInFields() {
        $(document).on("foundation-contentloaded", function() {
            contentLoaded=true;
            var mNames = [],
                $fieldSets = $("[" + DATA_ACS_COMMONS_NESTED + "][class='coral-Form-fieldset']"),
                $form = $fieldSets.closest("form.foundation-form"),
                actionUrl = $form.attr("action") + ".json",
                mValues, $field, name;

            if(_.isEmpty($fieldSets)){
                return;
            }

            $fieldSets.each(function (i, fieldSet) {
                mNames.push($(fieldSet).data("name"));
            });

            mNames = _.uniq(mNames);

            //creates & fills the nested multifield with data
            function fillNestedFields($multifield, valueArr){
                _.each(valueArr, function(record, index){
                    $multifield.find(".js-coral-Multifield-add").click();

                    //a setTimeout may be needed
                    _.each(record, function(value, key){
                        var $field = $($multifield.find("[name='./" + key + "']")[index]);
                        var type = $field.prop("type");

                        if(type == "checkbox"){
                            $field.attr("checked", value);
                        }else if(type == "select-one"){
                            setSelect($field, value);
                        }else{
                            $field.val(value);
                        }
                    });
                });
            }

            function postProcess(data){
                _.each(mNames, function(mName){
                    if(_.isEmpty(mName)){
                        return;
                    }

                    $fieldSets = $("[data-name='" + mName + "']");

                    //strip ./
                    mName = mName.substring(2);

                    mValues = data[mName];

                    if(_.isString(mValues)){
                        mValues = [ JSON.parse(mValues) ];
                    }

                    _.each(mValues, function (record, i) {
                        if (!record) {
                            return;
                        }

                        if(_.isString(record)){
                            record = JSON.parse(record);
                        }

                        _.each(record, function(rValue, rKey){
                            $field = $($fieldSets[i]).find("[name='./" + rKey + "']").last();

                            if(_.isArray(rValue) && !_.isEmpty(rValue)){
                                fillNestedFields( $($fieldSets[i]).find("[data-init='multifield']"), rValue);
                            }else{
                                var type = $field.prop("type");

                                if(type == "checkbox"){
                                    $field.attr("checked", rValue);
                                }else if(type == "select-one"){
                                    setSelect($field, rValue);
                                }else{
                                    $field.val(rValue);
                                }
                            }
                        });
                    });
                });
            }

            $.ajax(actionUrl).done(postProcess);
        });
    }

    function fillValue($field, record){
        var name = $field.attr("name");

        if (!name) {
            return;
        }

        //strip ./
        if (name.indexOf("./") === 0) {
            name = name.substring(2);
        }

        var type = $field.attr("type");
        if(type == "checkbox"){
          record[name] = $field.is(':checked');
        }else{
          record[name] = $field.val();
        }


        //remove the field, so that individual values are not POSTed
        $field.remove();
    }

    //for getting the nested multifield data as js objects
    function getRecordFromMultiField($multifield){
        var $fieldSets = $multifield.find("[class='coral-Form-fieldset']"),
            records = [], record, $fields, name;

        $fieldSets.each(function (i, fieldSet) {
            $fields = $(fieldSet).find("[name]");

            record = {};

            $fields.each(function (j, field) {
                fillValue($(field), record);
            });

            if(!$.isEmptyObject(record)){
                records.push(record);
            }
        });

        return records;
    }

    //collect data from widgets in multifield and POST them to CRX as JSON
    function collectDataFromFields() {
        var $form = $(this).closest("form.foundation-form"),
            $fieldSets = $("[" + DATA_ACS_COMMONS_NESTED + "][class='coral-Form-fieldset']"),
            record, $fields, $field, name, $nestedMultiField;

        $fieldSets.each(function (i, fieldSet) {
            $fields = $(fieldSet).children().children(CFFW);

            record = {};

            $fields.each(function (j, field) {
                $field = $(field);

                //may be a nested multifield
                $nestedMultiField = $field.find("[data-init='multifield']");

                if($nestedMultiField.length === 0){
                    fillValue($field.find("[name]"), record);
                }else{
                    name = $nestedMultiField.find("[class='coral-Form-fieldset']").data("name");

                    if(!name){
                        return;
                    }

                    //strip ./
                    name = name.substring(2);

                    record[name] = getRecordFromMultiField($nestedMultiField);
                }
            });

            if ($.isEmptyObject(record)) {
                return;
            }

            //add the record JSON in a hidden field as string
            $('<input />').attr('type', 'hidden')
                .attr('name',  $(fieldSet).data("name"))
                .attr('value', JSON.stringify(record))
                .appendTo($form);
        });
    }

    $(document).ready(function () {
        addDataInFields();
        window.setTimeout(function(){
            if( !contentLoaded ){
				console.log("Dialog-ready event never fired.  Firing now.");
                $(document).trigger('foundation-contentloaded');
            }
        },2000);
        $(document).on("foundation-contentloaded", function() {
            //$(document).on("click", ".cq-dialog-submit", submitAction);
            var dialog = document.querySelector('form.cq-dialog');

            if(dialog){
                dialog.addEventListener('submit', collectDataFromFields, true);
            }else{
                //if there's no dialog, we're in the view properties screen.
                var propForm = document.querySelector('#propertiesform');
                 if( propForm){
                    propForm.addEventListener('submit', collectDataFromFields,true);
                 }
             }


        });
    });
}());