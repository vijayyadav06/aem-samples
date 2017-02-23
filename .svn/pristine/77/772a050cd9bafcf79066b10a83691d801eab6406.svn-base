var dependencies = ["video-slender-squat.js", "/apps/medtronic-com/components/common/DataLayer.js",
    "/apps/medtronic-com/components/common/data-layer-position-id.js",
    "/apps/medtronic-com/components/common/JavaHelper.js", "/apps/medtronic-com/components/common/DataLinkId.js", "/apps/medtronic-com/components/common/LinkHelper.js", "/apps/medtronic-com/components/common/VideoHelper.js"];

use(dependencies, function(videoSlenderSquat, dataLayer, positionId, JavaHelper, dataLinkId, LinkHelper, VideoHelper) {

  var linkId = "";
  linkId = properties.get("sling:resourceType");
  var _properties =  dataLinkId._properties || properties;
  
  var firstVideo = getFirstVideo();
  var restVideos = getRestVideos();
  // linkId = linkId + "|" + resource.getPath();
    //adding an empty string for the non-existant label in 2nd spot
  linkId = linkId + "||main-" + firstVideo.textDisplay;
  linkId = linkId + "|main-" + firstVideo.transcriptText;
  linkId = linkId + "|main-" + firstVideo.isFlowplayer ? "FlowPlayer" : "YouTube";
  linkId = linkId + "|main-" + firstVideo.isFlowplayer ? firstVideo.videoURL
          : firstVideo.videoId;
  linkId = linkId + "|main-" + firstVideo.thumbnailImage;
  linkId = linkId + "|main-" + firstVideo.imageAltText;

  var restVideos = JavaHelper.toJSArray(restVideos);

  restVideos.forEach(function(video, index) {
    linkId = linkId + "|other-" + index + videoSlenderSquat.firstVideo.textDisplay;
    linkId = linkId + "|other-" + index + video.transcriptText;
    linkId = linkId + "|other-" + index + video.isFlowplayer ? "FlowPlayer" : "YouTube";
    linkId = linkId + "|other-" + index + video.isFlowplayer ? video.videoURL : video.videoId;
    linkId = linkId + "|other-" + index + video.thumbnailImage;
    linkId = linkId + "|other-" + index + video.imageAltText;
  });

  var position = request.getAttribute(positionId.ATTR_POSITION_ID)
  if (dataLayer && dataLayer.promos) {
    dataLayer.promos.push({
      "id": JavaHelper.toJSString(linkId),
      "position": JavaHelper.toJSString(position)
    });
  }
  function getFirstVideo() {
        var uuid = java.util.UUID.randomUUID().toString();
        var videoURL = _properties.get("videoURL", "");
        var isFlowplayer = VideoHelper.getPlayerType(videoURL);
        var type;
        var videoId;
        if (isFlowplayer) { // if this video will use flowplayer to play
            type = VideoHelper.getType(videoURL);
        } else { // using the YouTube plugin
            // to get the video id, because only the url contains 'www.youtube.com/embed/' is a valid url to play.
            // For example videoURL = 'http://www.youtube.com/watch?v=UMKiz6SYVy4' videoId = 'UMKiz6SYVy4'
            videoId = VideoHelper.getVideoId(videoURL);
        }
        return {
            "uuid": uuid,
            "isFlowplayer": isFlowplayer,
            "videoURL": videoURL,
            "type": type,
            "videoId": videoId,
            "textDisplay": _properties.get("textDisplay", ""),
            "thumbnailImage": _properties.get("thumbnailImage", ""),
            "imageAltText": _properties.get("imageAltText", ""),
            "playButtonAltText": _properties.get("playButtonAltText", ""),
            "showYoutubeIcon": _properties.get("showYoutubeIcon", false),
            "duration": _properties.get("duration", false),
            "showTranscript": _properties.get("showTranscript", false),
            "transcriptText": _properties.get("transcriptText", ""),
            "transcriptURL": LinkHelper.fixLink(_properties.get("transcriptURL", "")),
            "transcriptNewTab": _properties.get("transcriptNewTab", false),
            "showCta": _properties.get("showCta", false),
            "ctaText": _properties.get("ctaText", ""),
            "ctaURL": LinkHelper.fixLink(_properties.get("ctaURL", "")),
            "ctaNewTab": _properties.get("ctaNewTab", false)
        }
    }
  function getRestVideos() {
        var videos = _properties.get("videos", JavaHelper.getEmptyArray(java.lang.String));
        return videos.map(function(content) {
            // get a random id for the video modal
            var uuid = java.util.UUID.randomUUID().toString();
            var jsonContent = JSON.parse(content);
            //var jsonTranscript = JSON.parse(jsonContent.transcript);
            var videoURL = java.lang.String.valueOf(jsonContent.videoURL);
            var isFlowplayer = VideoHelper.getPlayerType(videoURL);
            var type;
            var videoId;
            if (isFlowplayer) { // if this video will use flowplayer to play
                type = VideoHelper.getType(videoURL);
            } else { // using the YouTube plugin
                  // to get the video id, because only the url contains 'www.youtube.com/embed/' is a valid url to play.
                  // For example videoURL =  'http://www.youtube.com/watch?v=UMKiz6SYVy4' videoId = 'UMKiz6SYVy4'
                  videoId = VideoHelper.getVideoId(videoURL);
            }
            var video = {
                uuid: uuid,
                isFlowplayer: isFlowplayer,
                type: type,
                videoURL: jsonContent.videoURL,
                videoId: videoId,
                textDisplay: jsonContent.textDisplay,
                thumbnailImage: jsonContent.thumbnailImage,
                imageAltText: jsonContent.imageAltText,
                playButtonAltText: jsonContent.playButtonAltText,
                _DNT_duration: jsonContent._DNT_duration,
                _DNT_showTranscript: jsonContent._DNT_showTranscript,
                transcriptText: jsonContent.transcriptText,
                transcriptURL: LinkHelper.fixLink(jsonContent.transcriptURL),
                _DNT_transcriptNewTab: jsonContent._DNT_transcriptNewTab
            };
            return video;
        });
    }
  return {
    id: linkId,
    position: position
  };
});