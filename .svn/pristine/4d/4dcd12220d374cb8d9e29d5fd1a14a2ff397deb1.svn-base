Medtronic.Granite.Authoring.WarnOnLeave = (function() {
    "use strict";
    /* initialize the change event on the Warn on Leave Checkbox (id=WOL_Checkbox) */
    $(document).on("foundation-contentloaded",function(event){
        var wol_checkbox = $("#WOL_Checkbox")[0];
        //init checkbox to match the "value" hidden field
        var wol_value = $("input[name='./warnOnLeave_enabled']")[0];

        if( wol_checkbox && wol_value ){
            wol_checkbox.checked = wol_value.value == 'true' ? true:false;
            Medtronic.Granite.Authoring.WarnOnLeave.toggleSelected(wol_checkbox,wol_value);
            $(wol_checkbox).change(function(){
               Medtronic.Granite.Authoring.WarnOnLeave.toggleSelected(wol_checkbox,wol_value);
            });

        }
    });

    var WARN_ON_LEAVE_INPUT_NAMES = ["./warnOnLeave_title","./warnOnLeave_description","./warnOnLeave_button1","./warnOnLeave_button2","./warnOnLeave_exceptions"];
    var FIELD_WRAPPER_SELECTOR = ".coral-Form-fieldwrapper"
    var REQUIRED_ATTR = "aria-required";
    var INVALID_CLASS = "is-invalid";
    var RTE_FIELD_EDITOR = ".editable.coral-RichText";

    return {
        toggleSelected: function(wol_checkbox,wol_value) {
            //keep hidden field in sync with change.
            wol_value.value = wol_checkbox.checked ? 'true':'false';
            //multifield special case (if 0 items the input wont hide)
            var $exceptionsField = $("input[name='./warnOnLeave_exceptions@Delete']").closest(FIELD_WRAPPER_SELECTOR);
            wol_checkbox.checked ? $exceptionsField.show():$exceptionsField.hide();

            //if field is checked, warn on leave is enabled (required)
            WARN_ON_LEAVE_INPUT_NAMES.forEach(
                function(fieldName){
                    var $field = $("input[name='"+fieldName+"']");
                    if( wol_checkbox.checked ){
                     $field.closest(FIELD_WRAPPER_SELECTOR).show();
                     $field.attr(REQUIRED_ATTR,true);
                    }else{
                        $field.closest(FIELD_WRAPPER_SELECTOR).hide();
                        $field.removeAttr(REQUIRED_ATTR);
                        var $rteField = $field.siblings(RTE_FIELD_EDITOR)
                        if( $rteField ){
                            //if the field has this sibling, it's an RTE and needs an additional step
                            $rteField.removeAttr(REQUIRED_ATTR);
                            $rteField.removeClass(INVALID_CLASS);
                        }
                    }
                    $field.checkValidity();
                    $field.updateErrorUI();
                }
            );
        }
    };
})()


