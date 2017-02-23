use(["/apps/medtronic-com/components/common/LinkHelper.js", "/apps/medtronic-com/components/common/JavaHelper.js", "/apps/medtronic-com/components/common/VideoHelper.js"],function(LinkHelper, JavaHelper, VideoHelper) {
    "use strict";

    function getFirstVideo() {
        var uuid = java.util.UUID.randomUUID().toString();
        var videoURL = properties.get("videoURL", "");
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
            "textDisplay": properties.get("textDisplay", ""),
            "thumbnailImage": properties.get("thumbnailImage", ""),
            "imageAltText": properties.get("imageAltText", ""),
            "playButtonAltText": properties.get("playButtonAltText", ""),
            "showYoutubeIcon": properties.get("showYoutubeIcon", false),
            "duration": properties.get("duration", false),
            "showTranscript": properties.get("showTranscript", false),
            "transcriptText": properties.get("transcriptText", ""),
            "transcriptURL": LinkHelper.fixLink(properties.get("transcriptURL", "")),
            "transcriptNewTab": properties.get("transcriptNewTab", false),
            "showCta": properties.get("showCta", false),
            "ctaText": properties.get("ctaText", ""),
            "ctaURL": LinkHelper.fixLink(properties.get("ctaURL", "")),
            "ctaNewTab": properties.get("ctaNewTab", false)
        }
    }
    function getRestVideos() {
        var videos = properties.get("videos", JavaHelper.getEmptyArray(java.lang.String));
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
    var firstVideo = getFirstVideo();
    var restVideos = getRestVideos();
    return {
      'firstVideo': firstVideo,
      'restVideos': restVideos
    }
});