use(["/apps/medtronic-com/components/common/JavaHelper.js", "/apps/medtronic-com/components/common/LinkHelper.js"], function(JavaHelper, LinkHelper) {
  "use strict";
  function getHeadings() {
    var headings = properties.get("headings",JavaHelper.getEmptyArray(java.lang.String));

    if (!headings.length) {
      return [];
    }

    return headings.map(function(jsonText) {
      return JSON.parse(jsonText);
    });
  }
  var headings = getHeadings();
  

  return {
    "showLabel": properties.get("showLabel", false),
    "labelHyperlink":LinkHelper.fixLink(properties.get("labelHyperlink")),
    "labelNewTab": properties.get("labelNewTab", false),
    "headings": headings,
    "showCta": properties.get("showCta", false),
    "ctaUrl":LinkHelper.fixLink(properties.get("ctaUrl", "#")),
    "ctaOpenInNewTab": properties.get("ctaOpenInNewTab", false),
    "ctaText": properties.get("ctaText", "CTA Button")
  };
});