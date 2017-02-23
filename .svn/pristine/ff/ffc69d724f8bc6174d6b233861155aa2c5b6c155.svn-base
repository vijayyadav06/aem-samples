/**
 * Custom Validation function for text fields (within Granite). This will check
 * to ensure the textfield has a hostname or URL for a value.
 */
(function($, Granite) {
  "use strict";
  $.validator.register({
    selector: "[data-validation~='Medtronic.Granite.Validation.ValidateHostname']",
    validate: function(el) {
      var value = el.val();
      var $val_input = $(el);
      var hostnameRegex = /^(http[s]?\:\/\/)?(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)+([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])(\/[\/a-zA-Z0-9\-\.]*)?$/g;
      if (!hostnameRegex.test(value)  && $val_input.attr('aria-required') == 'true') {
        $val_input.addClass("is-invalid");
        return "Please enter a valid hostname or URL";
      }else{
        $val_input.removeClass("is-invalid");
        return;
      }
    }
  });
})(Granite.$, Granite);