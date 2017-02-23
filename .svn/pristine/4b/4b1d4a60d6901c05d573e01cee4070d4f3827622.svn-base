var dependencies = ["decorative.js", "/apps/medtronic-com/components/common/DataLayer.js",
    "/apps/medtronic-com/components/common/data-layer-position-id.js",
    "/apps/medtronic-com/components/common/JavaHelper.js", "/apps/medtronic-com/components/common/Labels.js", "/apps/medtronic-com/components/common/DataLinkId.js"];

use(dependencies, function(decorative, dataLayer, positionId, JavaHelper, Labels, dataLinkId) {

  var linkId = "";
  linkId = properties.get("sling:resourceType");
  var _properties =  dataLinkId._properties || properties;
  // linkId = linkId + "|" + resource.getPath();

  var decorative_src =  _properties.get("image", "") || decorative.src;
  linkId = linkId + "||" + decorative_src;
  
  var position = request.getAttribute(positionId.ATTR_POSITION_ID)
  if (dataLayer && dataLayer.promos) {
    dataLayer.promos.push({
      "id": JavaHelper.toJSString(linkId),
      "position": JavaHelper.toJSString(position)
    });
  }

  return {
    id: linkId,
    position: position
  };
});