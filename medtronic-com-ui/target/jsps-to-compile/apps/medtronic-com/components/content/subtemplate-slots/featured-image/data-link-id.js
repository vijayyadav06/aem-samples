var dependencies = ["featured-image.js", "/apps/medtronic-com/components/common/DataLayer.js",
    "/apps/medtronic-com/components/common/data-layer-position-id.js",
    "/apps/medtronic-com/components/common/JavaHelper.js", "/apps/medtronic-com/components/common/Labels.js", "/apps/medtronic-com/components/common/DataLinkId.js"];

use(dependencies, function(featuredImage, dataLayer, positionId, JavaHelper, Labels, dataLinkId) {

  var linkId = "";
  linkId = properties.get("sling:resourceType");
  var _pageProperties = dataLinkId._pageProperties || pageProperties;
  var _properties =  dataLinkId._properties || properties;
  // linkId = linkId + "|" + resource.getPath();
    linkId = linkId + "|"
            + Labels.getLabelTextFor(_pageProperties.get("pageLevel", "L3"), _properties.get("labelHyperlink"));
  
  linkId = linkId + "|" +  _properties.get("image", "");
  linkId = linkId + "|" + _properties.get("alttext", "");
  
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