/**
    Custom Validation function for select fields (within Granite).

    This will check to ensure the selection has a value (not empty or null).  For some reason
    there is no support OOTB for required select fields.  See granite-validation.css for
    corresponding css fixes for the warning sign.
*/
(function($, Granite) {
    "use strict";
    $(document).on("selected","[data-validation~='Medtronic.Granite.Validation.SelectRequired']",
    function(event,objects){
        var selectField = $(this).children('select')[0];
        $(selectField).checkValidity();
        $(selectField).updateErrorUI();
    });
    $.validator.register({
        selector: "[data-validation~='Medtronic.Granite.Validation.SelectRequired'] select",
        validate: function(el) {
            var value = el.val();
            var $val_button = $(el).parent().children('button');
            if (!value || value == "") {
                $val_button.addClass("is-invalid");
                return "You must make a selection.";
            }else{
                $val_button.removeClass("is-invalid");
                return;
            }
        }
    });
})(Granite.$, Granite);