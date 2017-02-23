var dependencies = ["/apps/medtronic-com/components/common/DataLayer.js",
    "/apps/medtronic-com/components/common/data-layer-position-id.js",
    "/apps/medtronic-com/components/common/JavaHelper.js", "/apps/medtronic-com/components/common/Labels.js", "/apps/medtronic-com/components/common/DataLinkId.js"];

use(dependencies, function(dataLayer, positionId, JavaHelper, Labels, dataLinkId) {

  var linkId = "";
  linkId = properties.get("sling:resourceType");
  var _properties =  dataLinkId._properties || properties;
  // linkId = linkId + "|" + resource.getPath();
    //adding an empty string for the non-existant label in 2nd spot

  linkId = linkId + "||" + _properties.get("platform", "");
  linkId = linkId + "|" + _properties.get("accountName", "");
 
  
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