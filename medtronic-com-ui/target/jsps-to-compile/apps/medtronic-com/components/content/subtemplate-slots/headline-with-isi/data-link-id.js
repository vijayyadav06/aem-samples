var dependencies = ["/apps/medtronic-com/components/common/DataLayer.js",
    "/apps/medtronic-com/components/common/data-layer-position-id.js",
    "/apps/medtronic-com/components/common/JavaHelper.js", "/apps/medtronic-com/components/common/DataLinkId.js"];

use(dependencies, function(dataLayer, positionId, JavaHelper, dataLinkId) {

  var COPYRIGHT = "©";
  var TRADEMARK = "™";
  var REGISTERED_TRADEMARK = "®";
  
  var linkId = "";
  linkId = properties.get("sling:resourceType");

  // linkId = linkId + "|" + resource.getPath();
  var _properties =  dataLinkId._properties|| properties;
  
  var _headlines = getHeadlines() || this.headlineWithIsi.getHeadlines();
  var headlines = JavaHelper.toJSArray(_headlines);

  headlines.forEach(function(headline) {
    linkId = linkId + "|" + headline.headingText;
  });

  // Strip out markup from the text
  var description = JavaHelper.toJSString(_properties.get("description"));
  description = description.replace(/(<([^>]+)>)/igm, "");

  linkId = linkId + "|" + description;
  
  var position = request.getAttribute(positionId.ATTR_POSITION_ID)
  if (dataLayer && dataLayer.promos) {
    dataLayer.promos.push({
      "id": JavaHelper.toJSString(linkId),
      "position": JavaHelper.toJSString(position)
    });
  }
  
  function getHeadlines() {
    var headings = _properties.get("headline", JavaHelper.getEmptyArray(java.lang.String));
    if (!headings.length) {
      return [];
    }

    var returnHeadings =  headings.map(function(jsonText) {
      return JSON.parse(jsonText);
    });
    returnHeadings.forEach(function(heading){
      heading["headingText"] = parseSpecialChar(heading["headingText"]);
    });
    return returnHeadings;
  }
  
 function parseSpecialChar(headingText) {
        headingText = replaceText(headingText, COPYRIGHT);
        headingText = replaceText(headingText, TRADEMARK);
        headingText = replaceText(headingText, REGISTERED_TRADEMARK);
        return headingText;
    }


  function replaceText(headingText, regex) {
        if (headingText.match(regex)) {
            var REPLACEMENT = "<span>" + regex + "</span>";
            headingText = headingText.replace(new RegExp(regex,"g"), REPLACEMENT);
        }
        return headingText;
    }

  return {
    id: linkId,
    position: position
  };
});