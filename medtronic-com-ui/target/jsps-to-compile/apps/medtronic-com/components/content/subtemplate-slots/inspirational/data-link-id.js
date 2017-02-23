var dependencies = ["inspirational.js", "/apps/medtronic-com/components/common/DataLayer.js",
    "/apps/medtronic-com/components/common/data-layer-position-id.js",
    "/apps/medtronic-com/components/common/JavaHelper.js", "/apps/medtronic-com/components/common/Labels.js",
    "/apps/medtronic-com/components/common/DataLinkId.js"];

use(dependencies, function(inspirational, dataLayer, positionId, JavaHelper, Labels, dataLinkId) {

  var linkId = "";
  linkId = properties.get("sling:resourceType");
  var _pageProperties = dataLinkId._pageProperties || pageProperties;
  var _properties =  dataLinkId._properties|| properties;
  // linkId = linkId + "|" + resource.getPath();

  var showLabel = JavaHelper.toJSBoolean(inspirational.showLabel);

  linkId = linkId + "|"
          + Labels.getLabelTextFor(_pageProperties.get("pageLevel", "L3"), _properties.get("labelHyperlink"));

  getHeadingsforLinkId(_properties).forEach(function(heading) {
    linkId = linkId + "|" + heading.text;
  });
  
  var position = request.getAttribute(positionId.ATTR_POSITION_ID)
  if (dataLayer && dataLayer.promos) {
    dataLayer.promos.push({
      "id": JavaHelper.toJSString(linkId),
      "position": JavaHelper.toJSString(position)
    });
  }

  function getHeadingsforLinkId(props) {
    var headings = props.get("headings", JavaHelper.getEmptyArray(java.lang.String));

    if (!headings.length) {
      return [];
    }

    return headings.map(function(jsonText) {
      return JSON.parse(jsonText);
    });
  }
  
  return {
    id: linkId,
    position: position
  };
});