(function($, $document) {
  "use strict";

  $(document).on("dialog-ready", function() {
    var fieldLabel = $("#application-root-country-selector").prev(".coral-Form-fieldlabel");
    fieldLabel.css("visibility", "hidden");
  });

})($, $(document));