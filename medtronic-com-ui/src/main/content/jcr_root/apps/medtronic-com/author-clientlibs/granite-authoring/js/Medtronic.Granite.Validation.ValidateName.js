/**
 * Custom Validation function for text fields (within Granite). This will check
 * to ensure the textfield has a valid value. For some reason there is no
 * support OOTB for text fields. See granite-validation.css for corresponding
 * css fixes for the warning sign.
 */
(function($, Granite) {
  "use strict";
  $(document).on("blur", "[data-validation~='Medtronic.Granite.Validation.ValidateName']", function(event, objects) {
    var textField = $(this).children('input');
    $(textField).checkValidity();
    $(textField).updateErrorUI();
  });
  $.validator.register({
    selector: "[data-validation~='Medtronic.Granite.Validation.ValidateName']",
    validate: function(el) {
      var value = el.val();
      var $val_input = $(el);
      var regexText = /[.*:'"\[\]\/| ]/g;
      if (regexText.test(value)) {
        $val_input.addClass("is-invalid");
        return "Please enter a valid name without special characters";
      } else {
        $val_input.removeClass("is-invalid");
        return;
      }
    }
  });
})(Granite.$, Granite);