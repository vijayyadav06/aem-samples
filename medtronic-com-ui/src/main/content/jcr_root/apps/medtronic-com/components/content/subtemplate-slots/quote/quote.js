use(["/apps/medtronic-com/components/common/JavaHelper.js", "/apps/medtronic-com/components/common/LinkHelper.js",
    "/apps/medtronic-com/components/common/LanguageUtil.js"], function(JavaHelper, LinkHelper, LanguageUtil) {
  "use strict";

  function getDate(date) {
    var DateTimeFormat = org.joda.time.format.DateTimeFormat;
    var Locale = java.util.Locale;

    var locale = LanguageUtil.getPageLanguage();

    if (date) {
      try {
        var parser = new DateTimeFormat.forPattern("yyyy-MM-dd");
        // var formatter = DateTimeFormat.mediumDate().withLocale(locale);
        var formatter = DateTimeFormat.forPattern("d MMM yyyy").withLocale(locale);
        date = parser.parseLocalDate(date);
        date = formatter.print(date);
      } catch (e) {
        log.error("Problem parsing date {} {}", date, e);
      }

      return date;
    }
  }

  var text = properties.get("text");

  return {
    "showLabel": properties.get("showLabel", false),
    "labelHyperlink": LinkHelper.fixLink(properties.get("labelHyperlink")),
    "labelNewTab": properties.get("labelNewTab", false),
    "text": text,
    "attribution": properties.get("attribution"),
    "additionalInfo1": properties.get("additionalInfo1", ""),
    "additionalInfo2": properties.get("additionalInfo2", ""),
    "date": getDate(properties.get("date"))
  };
});