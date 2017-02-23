(function() {

  // stop modal from closing
  function closeModalEvent(e) { e.preventDefault(); }

  window.showAcknowledgeModal = function() {
    // loop through each specified URL
    for (var i = 0; i < acknowledgement_urls.length; i++) {
      // if the current page contains one of the strings
      // from the acknowledgement_urls array
      if (window.location.href.indexOf(acknowledgement_urls[i]) != -1) {
        // open the modal
        $('#modalAcknowledge').modal() // open modal
          .on('hide.bs.modal', closeModalEvent); // modal hide callback
      } else {
        $('body').removeClass('hide-content');
      }
    }
  }

  $(document).ready(function(){
    var $acknowledgeModal = $('#modalAcknowledge');

    if (!window.isExplicitCookieModalShown && !cookies.get('acknowledgementSession')) {
        window.showAcknowledgeModal();
    }

    if (cookies.get('acknowledgementSession')) {
      $('body').removeClass('hide-content');
    }

    // accept button click
    $('.btn-yep').on('click', function(){
      $acknowledgeModal.off('hide.bs.modal', closeModalEvent).modal('hide');
      $('body').removeClass('hide-content');
      cookies.set("acknowledgementSession", true);
    });

    // reject button click
    $('.btn-nope').on('click', function(){
      window.location = $('header .header__logo').attr('href');
    });
  });
}());
