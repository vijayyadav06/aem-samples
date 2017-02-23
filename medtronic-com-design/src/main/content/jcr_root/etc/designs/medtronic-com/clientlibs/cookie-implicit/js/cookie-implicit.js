(function() {
  setSatTrackCookie(true);

  function checkCookie() {
    var cookied = cookies.get("legalcookie");

    if (!cookied) {
      $('#cookieBar').removeClass('hide');
    }
  }

  function addCookie() {
    cookies.set("legalcookie", true, 180);
  }

  window.addCookie = addCookie;

  window.onload = function() {
    checkCookie();
  }
}());
