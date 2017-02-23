(function() {
  window.setSatTrackCookie = function(track) {
    if (typeof _satellite !== "undefined") {
      _satellite.setCookie("sat_track", "" + track);
    }
  }
}());
