(function($, Granite) {
  "use strict";
  $.validator.register({
    selector: "[data-validation~='Medtronic.Granite.Validation.EnhancedErrorText']",
    validate: function(el) {
      var MESSAGES = {
        ERROR_MESSAGE: "Please fill out this field."
      };
      var value = el.val().toLowerCase();
      var val_input = $(el);
      var info_span = $(val_input).parent().find('span').attr('data-quicktip-type', 'info');

      if (!value.length > 0) {
        val_input.addClass("is-invalid");
        $(info_span).addClass("customErrorInfoText");
        return MESSAGES.ERROR_MESSAGE;
      } else {
        var className = $(val_input).attr('class');
        $(info_span).removeClass("customErrorInfoText");
        if (className.indexOf('is-invalid') > -1) {
          val_input.removeClass("is-invalid");
        }
        return;
      }
    }
  });
  $.validator.register({
    selector: "[data-validation~='Medtronic.Granite.Validation.EnhancedErrorText'] span input",
    validate: function(el) {
      var MESSAGES = {
        ERROR_MESSAGE: "Please fill out this field."
      };
      var value = el.val().toLowerCase();
      var val_input = $(el);
      var info_span = $(val_input).closest("div").find('span').attr('data-quicktip-type', 'info').filter(
              '.coral-Icon--infoCircle');

      if (!value.length > 0) {
        val_input.addClass("is-invalid");
        $(info_span).addClass("customErrorInfoText");
        return MESSAGES.ERROR_MESSAGE;
      } else {
        var className = $(val_input).attr('class');
        $(info_span).removeClass("customErrorInfoText");
        if (className.indexOf('is-invalid') > -1) {
          val_input.removeClass("is-invalid");
        }
        return;
      }
    }
  });
})(Granite.$, Granite);