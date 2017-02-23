/*
 * Listeners for Error Page 404 to replace the {requestURL} to the requested
 * page URL
 */

$(document).ready(function() {

  var requestURL = $('#error_page_template p:contains({requestURL})');
  $(requestURL).each(function() {
    var requestURLtext = $(this).text();
    $(this).text(requestURLtext.replace('{requestURL}', window.location.href));
  });
});