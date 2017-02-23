var dependencies = ["video-mini.js", "/apps/medtronic-com/components/common/DataLayer.js",
    "/apps/medtronic-com/components/common/data-layer-position-id.js",
    "/apps/medtronic-com/components/common/JavaHelper.js", "/apps/medtronic-com/components/common/DataLinkId.js",
    "/apps/medtronic-com/components/common/VideoHelper.js"];

use(dependencies, function(videoMini, dataLayer, positionId, JavaHelper, dataLinkId, VideoHelper) {

  var linkId = "";
  linkId = properties.get("sling:resourceType");

  var _properties = dataLinkId._properties || properties;

  var videoURL = _properties.get("videoURL", "");
  var isFlowplayer = VideoHelper.getPlayerType(videoURL);
  var videoId = VideoHelper.getVideoId(videoURL);
  // linkId = linkId + "|" + resource.getPath();
  // empty string for label, since it doesn't exist
  linkId = linkId + "||" + _properties.get("textDisplay", "");
  linkId = linkId + "|" + _properties.get("transcriptLink", "");
  linkId = linkId + "|" + isFlowplayer ? "FlowPlayer" : "YouTube";
  linkId = linkId + "|" + isFlowplayer ? _properties.get("videoURL", "") : videoId;
  linkId = linkId + "|" + _properties.get("thumbnailImage", "");
  linkId = linkId + "|" + _properties.get("imageAltText", "");

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