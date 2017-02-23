/* JS For Video Component -- duration field */
flowplayer.conf.adaptiveRatio = true;


// format the number to a expect length, for example: formatNum(1,3) will make
// number 1 to '001'
function formatNum(value, length) {
  if (length < 2) {
    length = 2
  }
  return (Array(length).join(0) + value).slice(-length)
}

// the duration's unit we get from the player is 'second', format this number to
// a date format, for example formatSeconds(61) will return '01:01'
function formatSeconds(value) {
  var hours = parseInt(value / (60 * 60));
  var minutes = parseInt(value % (60 * 60) / 60);
  var seconds = parseInt(value % (60 * 60 * 60) % 60);
  if (hours != 0) {
    return formatNum(hours, String(hours).length) + ":" + formatNum(minutes, 2);
  } else {
    return formatNum(minutes, 2) + ":" + formatNum(seconds, 2);
  }
}

function displayDuration(videoContainer, duration) {
  var duration_span = $(videoContainer).closest('.video-container').find('.video__details--duration');
  if (duration_span.length > 0) {
    var durationFormat = formatSeconds(parseInt(duration));
    duration_span.text("(" + durationFormat + ")");
  }
}
/*
function createVideoElement(src, type) {
  var video = document.createElement("video");
  var source = document.createElement("source");
  source.src = src;
  source.type = type;
  video.appendChild(source);
  return video;
}

function writeDurationFlow(videoContainer, isNoTouch) {
  var duration = 0;
  if (!!isNoTouch) {
    flowplayer(videoContainer).on("ready", function(e, api, video) {
      duration = video.duration;
      displayDuration(videoContainer, duration);
      $(videoContainer).closest(".modal__video").removeClass("first_load");

    });
  }

  if (!!!isNoTouch) {
    var src = $(videoContainer).data("video-url"), type = $(videoContainer).data("type");
    if (type == "video/mp4") {
      var video = createVideoElement(src, type);
      video.load();
      var timer = setInterval(function() {
        if (video.readyState > 0) {
          displayDuration(videoContainer, video.duration);
          video.remove();
          clearInterval(timer);
        }
      }, 200);
    }
  }

}

$(document).ready(function() {
  // when the document is ready to fetch the flowplayers and add onready event
  // to get the duration and then write it to the duration span
  var isNoTouch = $('html.no-touch').length;
  $('.videoplayer').each(function(index) {
    writeDurationFlow(this, isNoTouch);
  });
});
*/

var players = {}; // Define a player storage object
// This function will be called when the API is fully loaded
function onYouTubePlayerAPIReady() {
  $("iframe[id*=iframe_]").each(function() {
    players[this.id] = new YT.Player(this.id, {
      events: {
        "onReady": writeDurationYT(this.id),
        "onStateChange": function() {
          var args = Array.prototype.slice.call(arguments, 0);

          if (typeof medtronicVideoOnPlayerStateChange == "function") {
            medtronicVideoOnPlayerStateChange.apply(null, args);
          }
        }
      }
    });
  });
}

// Load YouTube Frame API
(function() { // Closure, to not leak to the scope
  var s = document.createElement("script");
  s.src = (location.protocol == 'https:' ? 'https' : 'http') + "://www.youtube.com/player_api";
  var before = document.getElementsByTagName("script")[0];
  before.parentNode.insertBefore(s, before);
})();

// Returns a function to enable multiple events
function writeDurationYT(playerId) {
  return function(event) {
    var player = players[playerId];
    var duration = player.getDuration();
    displayDuration($("#" + playerId), duration);
    $("#" + playerId).closest(".modal__video").removeClass("first_load");
  }
}
