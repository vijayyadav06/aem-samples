var addthis_config = addthis_config||{};

function positionToolBox() {
  $('.addthis_outer').css('top', $(document).scrollTop() + 40)
}

function initAddThis() {
    if (typeof addthis !== "undefined") {
       addthis_config.pubid = 'ra-5638f6526848c6e7';
	   addthis_config.ui_use_css = false;
	   addthis.init();
    }
}

function initDefaultShare() {
  var pageUrl = encodeURIComponent(window.location.href);

  $('.addthis_button_print').prop('href', 'javascript:window.print();');
  $('.addthis_button_email').prop('href', 'mailto:?body=' + pageUrl);
  $('.addthis_button_facebook').prop('href', 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl);
  $('.addthis_button_twitter').prop('href', 'https://twitter.com/intent/tweet?text=' + pageUrl);
  $('.addthis_button_linkedin').prop('href', 'https://www.linkedin.com/shareArticle?mini=true&url=' + pageUrl);
}

$(document).ready(function() {
  positionToolBox();
  window.onscroll = positionToolBox;
  // get legal cookie
  var legalCookie = cookies.get("legalcookie");
  // run AddThis if legal cookie is not set to false
  (legalCookie == "" || legalCookie == "true" || legalCookie == "undefined") ? initAddThis() : initDefaultShare();
});
