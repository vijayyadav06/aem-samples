use([], function() {
  "use strict";
  // a regex for verifying if a YouTube video
  var videoURLRegex = ".*?(?:www.youtube.com/watch.*?v=|youtu.be/|www.youtube.com/embed/)";
  // a regex for verifying if the type of video is valid
  var typeRegex = "(m3u8|webm|mp4|ogg|flv)$";

  function getType(videoURL) {
    // TODO get type of the video via the videoURL
    var typeTemp = (videoURL.toLowerCase()).match(typeRegex);
    var typeResult = typeTemp ? typeTemp[0] : null;
    var type;  
    if (typeResult != null) {
      if (typeResult == 'm3u8') { // if the type of the  video is hls using a special type named 'application/x-mpegurl'
          type = 'application/x-mpegurl';
      } else if (typeResult == 'flv'){
            type = 'video/flash';
      } else {
          type = 'video/' + typeResult;
      }
    }
    return type;
  }
  
  function getVideoId(videoURL) {
    // get the video id, because only the url contains 'www.youtube.com/embed/' is a valid url to play. For example videoURL = 'http://www.youtube.com/watch?v=UMKiz6SYVy4' videoId = 'UMKiz6SYVy4'
    var videoIdTemp = videoURL.replaceAll(videoURLRegex, "");
    var videoId;  
    if(videoIdTemp.indexOf("?") != -1){
        videoId = videoIdTemp.replaceFirst("\\?","?enablejsapi=1&showinfo=0&autohide=1&");
    }else if(videoIdTemp.indexOf("&") != -1){
        videoId = videoIdTemp.replaceFirst("&","?enablejsapi=1&showinfo=0&autohide=1&");
    }else{
        videoId = videoIdTemp.concat("?enablejsapi=1&showinfo=0&autohide=1");
    }
    return videoId;  
  }

  function getPlayerType(videoURL) {
	var result = (videoURL).match(videoURLRegex);
    return (result == null);  //if result==null, will use the flowplayer, else will use YouTube plugin.
  }  
  return {
    getType: function(videoURL) {
      return getType(videoURL);
    },
    getVideoId: function(videoURL) {
      return getVideoId(videoURL);  
    },
    getPlayerType: function(videoURL) {
	  return getPlayerType(videoURL);	
    }  
  }
});