/**
 * Custom Validation function for Path Fields to validate eManual URLs  (within Granite). This will
 * check to ensure the correct URL for eManuals. See
 * granite-validation.css for corresponding css fixes for the warning sign.
 */

 /*

 RM: 03/2016 - Removing logic to disable this validation
 MDT-2493



(function($, Granite) {
  "use strict";
  $(document).on("blur", "[data-validation~='Medtronic.Granite.Validation.ValidateEManualUrl']", function(event, objects) {
    var pathField = $(this).children('pathbrowser')[0];
    $(pathField).checkValidity();
    $(pathField).updateErrorUI();
  });
  $.validator
          .register({
            selector: "[data-validation~='Medtronic.Granite.Validation.ValidateEManualUrl'] span input",
            validate: function(el) {
              var E_MANUAL = {
                MANUALS_HOST: "manuals.medtronic",
                MANUALS_PATH: "/manuals/search",
                ERROR_MESSAGE: "Please be in touch with an Oracle contact for the correct URL for the eManual you are trying to link to."
              };
              var value = el.val().toLowerCase();
              var $val_input = $(el);
              var value_valid = value.indexOf(E_MANUAL.MANUALS_HOST) === -1 || value.indexOf(E_MANUAL.MANUALS_PATH) > -1;
              if (!value_valid) {
                $val_input.addClass("is-invalid");
                return E_MANUAL.ERROR_MESSAGE;
              } else {
                $val_input.removeClass("is-invalid");
                return;
              }
            }
          });
})(Granite.$, Granite);
 */