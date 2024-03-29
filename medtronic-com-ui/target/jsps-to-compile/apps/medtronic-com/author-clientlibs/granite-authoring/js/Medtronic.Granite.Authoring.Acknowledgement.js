Medtronic.Granite.Authoring.Acknowledgement = (function(){
    "use strict";
    var AUTH_TYPE = "#authentication_type";
    var AUTH_TYPE_NONE = "none";

    var AUTH_TYPE_ACKNOWLEDGEMENT = "acknowledgement";
    var ACKNOWLEDGEMENT_ACCEPT = "[name='./acknowledgement_accept_button']";
    var ACKNOWLEDGEMENT_REJECT = "[name='./acknowledgement_reject_button']";
    var ACKNOWLEDGEMENT_HEADLINE = "[name='./acknowledgement_headline']";
    var ACKNOWLEDGEMENT_TEXT = "[name='./acknowledgement_text']";
    var ACKNOWLEDGEMENT_URLS_DELETE = "[name='./acknowledgement_urls@Delete']";
    var ACKNOWLEDGEMENT_URLS = "[name='./acknowledgement_urls]";
    var ACKNOWLEDGEMENT_FIELDS = [
                ACKNOWLEDGEMENT_ACCEPT,
                ACKNOWLEDGEMENT_REJECT,
                ACKNOWLEDGEMENT_HEADLINE,
                ACKNOWLEDGEMENT_TEXT,
                ACKNOWLEDGEMENT_URLS_DELETE
    ];


    var FIELD_WRAPPER_SELECTOR = ".coral-Form-fieldwrapper"
    var RTE_FIELD_EDITOR = ".editable.coral-RichText";
    var REQUIRED_ATTR = "aria-required";
    var INVALID_CLASS = "is-invalid";

    $(document).on("foundation-contentloaded",
        function(event,objects){
            var selectField = $(AUTH_TYPE)[0];
            if( selectField ){
                toggleFields(selectField);
                $(selectField).off("selected");//prevent duplicate bindings
                $(selectField).on("selected", function(selectField){
                   toggleFields(this);
            });
        }
    });
    //force field to be read only (they have to enter via the browser.
    $(document).on("cui-contentloaded",
        function(){
            var $acknowledgement_urls = $(ACKNOWLEDGEMENT_URLS);
            $acknowledgement_urls.each(function(field){
                var $field = $(field);
                $field.checkValidity();
                $field.updateErrorUI();
                $field.attr('readonly',true);
            });
        }
    );

    //Helper function to show a field and set it as required.
    function showAndSetRequired(field){
        if( field && $.isArray(field) ){
            field.forEach ( showAndSetRequired );
        }else if (field) {
            var $field = $(field);
            $field.closest(FIELD_WRAPPER_SELECTOR).show();
            $field.attr(REQUIRED_ATTR,true);
        }
    }

    //Helper function to hide and remove any required attributes on a field
    function hideAndRemoveRequired(field){
        if( $.isArray(field) ){
            field.forEach( hideAndRemoveRequired );
        }else{
            var $field = $(field);
            $field.closest(FIELD_WRAPPER_SELECTOR).hide();
            $field.removeAttr(REQUIRED_ATTR);
            var $rteField = $field.siblings(RTE_FIELD_EDITOR);
            if( $rteField ){
                //MDT-1787: if the field has this sibling, it's an RTE and needs an additional step
                $rteField.removeAttr(REQUIRED_ATTR);
                $rteField.removeClass(INVALID_CLASS);
            }
            $field.checkValidity();
            $field.updateErrorUI();

        }
    }

    //toggle the visible fields based on selection
    function toggleFields(selectSpan){
        var selectField = $(selectSpan).children('select')[0];
        var selected = selectField.value;
        if( selected == AUTH_TYPE_ACKNOWLEDGEMENT ){
            showAndSetRequired(ACKNOWLEDGEMENT_FIELDS);
        }else{
            hideAndRemoveRequired(ACKNOWLEDGEMENT_FIELDS);
        }
        $(selectField).checkValidity();
        $(selectField).updateErrorUI();
    }
})();