use(["/apps/medtronic-com/components/common/LinkHelper.js", "/apps/medtronic-com/components/common/VideoHelper.js"], function(LinkHelper,VideoHelper) {
    "use strict";
    // get a random id for video modal
    var uuid = java.util.UUID.randomUUID().toString();

    var videoURL = properties.get("videoURL", "");
    var isFlowplayer = VideoHelper.getPlayerType(videoURL);
    var type;
    var videoId;
    if (isFlowplayer) { // if this video will use flowplayer to play
        type = VideoHelper.getType(videoURL);
    } else { // using the YouTube plugin
        // get the video id, because only the url contains 'www.youtube.com/embed/' is a valid url to play. For example videoURL = 'http://www.youtube.com/watch?v=UMKiz6SYVy4' videoId = 'UMKiz6SYVy4'
        videoId = VideoHelper.getVideoId(videoURL);
    }
    return {
        "uuid": uuid,
        "isFlowplayer": isFlowplayer,
        "type": type,
        "transcriptURL": LinkHelper.fixLink(properties.get("transcriptURL", "")),
        "ctaURL": LinkHelper.fixLink(properties.get("ctaURL", "")),
        "videoId": videoId
    };
});