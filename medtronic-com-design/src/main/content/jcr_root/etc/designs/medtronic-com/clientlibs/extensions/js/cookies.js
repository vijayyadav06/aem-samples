window.cookies = (function() {
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    // if exdays is not set or set to 0
    // do not set "expires" in cookie
    var expires = (typeof exdays === "undefined" || exdays == 0)
      ? "" : "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=" + SITEPATH;
  }

  function getCookie(cname) {
    cname = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(cname) == 0) {
        return c.slice(cname.length);
      }
    }
    return "";
  }

  return {
    get: getCookie,
    set: setCookie
  };
})();