(function() {
  var cookieValue = cookies.get('legalcookie');
  setSatTrackCookie(cookieValue === "true");

  function checkCookie() {
    if (!cookieValue) {
      $('#modalCookie').modal();
    }
  }

  function cookieChoice(bool) {
    cookies.set("legalcookie", bool, 90);
    location.reload();
  }

  window.cookieChoice = cookieChoice;

  window.onload = function() {
    checkCookie();
  }
}());
