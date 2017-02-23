Medtronic.Authoring.I18n = (function() {
  "use strict";
  return {
    getLanguages : function () {
      var languages;
      try {
        // use overlay servlet so customers can define /apps/wcm/core/resources/languages
        var json = CQ.utils.HTTP.eval("/etc/designs/medtronic-com/languages.infinity.json");
        $.each(json, function(name, lang) {
          if( lang.country ){
          lang.title = CQ.I18n.getVar(lang.country);
          if (lang.title && lang.language && lang.language != "*") {
            lang.title += " - "+CQ.I18n.getVar(lang.language);
          }
          }
        });
        languages = json;
      } catch (e) {
        languages = {};
      }
      return languages;
    },

    /**
     * Returns the available languages as options. This method can be used
     * directly as {@link CQ.Selection#optionsProvider} to draw a language
     * selector.
     *
     * @static
     * @return {Object[]} An array of objects with "value" (language code)
     *                    and "text" (language/country name) strings
     * @since 5.3
     */
    getLanguageOptions: function() {
        var opts = [];
        try {
            var languages = Medtronic.Authoring.I18n.getLanguages();
            for (var name in languages) {
                var lang = languages[name];
                if (lang.title) {
                    opts.push({
                        value: name,
                        text: lang.title
                    });
                }
            }

            // CQ-19848: Enforcing use of proper Chinese collation methods (Pinyin for Simplified, stroke count for Traditional)
            var sortingLocale = CQ.I18n.getLocale();
            if (/^zh.(cn\b|sg\b|hans\b)/gi.exec(sortingLocale)){
                sortingLocale = "zh-Hans-cn-u-co-pinyin";
            } else if (/^zh.(tw\b|hk\b|mo\b|hant\b)/gi.exec(sortingLocale)){
                sortingLocale = "zh-Hant-tw-u-co-stroke";
            } else {
                sortingLocale = sortingLocale.replace("_", "-");
            }

            opts.sort(function(l1, l2) {
                if (l1.text.localeCompare(l2.text, sortingLocale) < 0) {
                    return -1;
                } else if (l1.text.localeCompare(l2.text, sortingLocale) == 0) {
                    return 0;
                } else {
                    return 1;
                }
            });
        } catch (e) {
            CQ.Log.error("Medtronic.Authoring.I18n#getLanguageOptions failed: " + e.message);
        }
        return opts;
    }
  };
})();