var dependencies = ["/apps/medtronic-com/components/common/DataLayer.js",
    "/apps/medtronic-com/components/common/data-layer-position-id.js",
    "/apps/medtronic-com/components/common/JavaHelper.js", "/apps/medtronic-com/components/common/Labels.js", "/apps/medtronic-com/components/common/DataLinkId.js"];

use(dependencies, function(dataLayer, positionId, JavaHelper, Labels, dataLinkId) {

  var linkId = "";
  linkId = properties.get("sling:resourceType");

  // linkId = linkId + "|" + resource.getPath();
  var _properties =  dataLinkId._properties|| properties;
  
  var accountName1 = JavaHelper.toJSString(_properties.get("accountName1", ""));
  var accountName2 = JavaHelper.toJSString(_properties.get("accountName2", ""));
    //adding an empty string for the non-existant label in 2nd spot
  linkId = linkId + "||" + _properties.get("platform", "");
  linkId = linkId + "|" + accountName1;
  linkId = linkId + "|" + (accountName2 ? accountName2 : accountName1);

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