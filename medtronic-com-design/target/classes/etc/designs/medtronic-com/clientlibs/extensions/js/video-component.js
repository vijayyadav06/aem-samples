/* JS For Video Component */

$(document).ready(function () {

  var isNoTouch = $('html.no-touch').length;

  // Stop playing video when Bootstrap modal is closed or if someone clicks outside the modal to dismiss it
  $(".modal__video").on('hidden.bs.modal', function (e) {
    if ($(this).find("iframe").length) {
      $(this).find("video").attr("src", $(this).find("video").attr("src"));
      $(this).find("iframe").attr("src", $(this).find("iframe").attr("src"));
    }
    else {
      var video = flowplayer($(this).find('.flowplayer'));
      video.stop();
    }
  });

  // Do not spawn Bootstrap modal if browser passes the Modernizr test for "touch" capability
  $('.video__trigger').on('click', function(e){
    if (!!isNoTouch) {
      e.preventDefault();
      var modalID = $(this).data('target');
      $(modalID).removeClass("first_load");
      var video = $(modalID).find('.videoplayer');

      // instantiate the video player
      if (!video.hasClass('flowplayer')) {
        var url = video.data('video-url');
        var type = video.data('video-type');
        video.html('<video><source src="' + url + '" type="' + type + '"></video>').flowplayer();
      }
      // launch the modal
      $(modalID).modal();
    }
  });

})
