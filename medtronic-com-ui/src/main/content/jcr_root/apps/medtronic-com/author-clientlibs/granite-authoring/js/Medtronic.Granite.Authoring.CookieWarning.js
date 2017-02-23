Medtronic.Granite.Authoring.CookieWarning = (function(){
    "use strict";

    var CTA_BUTTON_ONE = "[name='./cookieWarning_button1']"
    var CTA_BUTTON_TWO = "[name='./cookieWarning_button2']"

    var TITLE = "[name='./cookieWarning_title']"

    var EXPLICIT_DESCRIPTION = "[name='./cookieWarning_explicit_description']"
    var IMPLICIT_DESCRIPTION = "[name='./cookieWarning_implicit_description']"

    var IMPLICIT_SELECTED = "implicit";
    var EXPLICIT_SELECTED = "explicit";

    var FIELD_WRAPPER_SELECTOR = ".coral-Form-fieldwrapper"
    var RTE_FIELD_EDITOR = ".editable.coral-RichText";
    var REQUIRED_ATTR = "aria-required";
    var INVALID_CLASS = "is-invalid";

    $(document).on("foundation-contentloaded",
        function(event,objects){
            var selectField = $("#cookieWarning_type")[0];
            if( selectField ){
                toggleFields(selectField);
                $(selectField).off("selected");//prevent duplicate bindings
                $(selectField).on("selected", function(selectField){
                   toggleFields(this);
                });
            }
        });

    //Helper function to show a field and set it as required.
    function showAndSetRequired(field){
        var $field = $(field);
        $field.closest(FIELD_WRAPPER_SELECTOR).show();
        $field.attr(REQUIRED_ATTR,true);
    }

    //Helper function to hide and remove any required attributes on a field
    function hideAndRemoveRequired(field){
        var $field = $(field);
        $field.removeAttr(REQUIRED_ATTR);
        var $rteField = $field.siblings(RTE_FIELD_EDITOR)
        if( $rteField ){
            //MDT-1787: if the field has this sibling, it's an RTE and needs an additional step
            $rteField.removeAttr(REQUIRED_ATTR);
            $rteField.removeClass(INVALID_CLASS);
        }
        $field.checkValidity();
        $field.updateErrorUI();
        $field.closest(FIELD_WRAPPER_SELECTOR).hide();

    }

    //toggle the visible fields based on selection
    function toggleFields(selectSpan){
        var selectField = $(selectSpan).children('select')[0];
        var ctaButton1Field = $(CTA_BUTTON_ONE)[0];
        var ctaButton2Field = $(CTA_BUTTON_TWO)[0];
        var titleField = $(TITLE)[0];
        var explicitDescriptionField = $(EXPLICIT_DESCRIPTION)[0];
        var implicitDescriptionField = $(IMPLICIT_DESCRIPTION)[0];

        var selected = selectField.value;
        if( selected == EXPLICIT_SELECTED ){
            showAndSetRequired(ctaButton1Field);
            showAndSetRequired(ctaButton2Field);
            showAndSetRequired(titleField);
            showAndSetRequired(explicitDescriptionField);
            hideAndRemoveRequired(implicitDescriptionField);
        }else if ( selected == IMPLICIT_SELECTED ){
            showAndSetRequired(titleField);
            showAndSetRequired(implicitDescriptionField);
            hideAndRemoveRequired(ctaButton1Field);
            hideAndRemoveRequired(ctaButton2Field);
            hideAndRemoveRequired(explicitDescriptionField);
        }else{
            hideAndRemoveRequired(ctaButton1Field);
            hideAndRemoveRequired(ctaButton2Field);
            hideAndRemoveRequired(titleField);
            hideAndRemoveRequired(explicitDescriptionField);
            hideAndRemoveRequired(implicitDescriptionField);
        }
        $(selectField).checkValidity();
        $(selectField).updateErrorUI();
    }
})();