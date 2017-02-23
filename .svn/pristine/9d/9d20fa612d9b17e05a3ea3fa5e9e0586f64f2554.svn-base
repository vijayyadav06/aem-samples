Medtronic.Authoring.ApplicationRoot = (function() {
  "use strict";

  function setLanguageOptions(panel) {
    var languageFields = panel.find('key', '_DNT_languageName');
    var options = Medtronic.Authoring.I18n.getLanguageOptions();
    languageFields.forEach(function(languageField) {
      languageField.setOptions(options);
    });
  }

  // Component listeners goes here
  return {
    dialog: {
      loadContent: function(dialog) {
        setLanguageOptions(dialog);
      }
    },
    countries: {
      added: function(panel) {
        setLanguageOptions(panel);
      }
    }
  };
})();