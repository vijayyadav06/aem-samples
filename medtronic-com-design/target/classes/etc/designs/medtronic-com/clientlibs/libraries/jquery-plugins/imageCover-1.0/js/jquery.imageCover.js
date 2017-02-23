/*!
 * jQuery Image Cover
 *
 */

(function($) {

  $.fn.imageCover = function() {
      var $parent = this.closest('.content'),
          offset = 0,
          imageRatio = this.width() / this.height(),
          containerRatio = $parent.width() / $parent.height();

      imageRatio = Math.round(imageRatio * 10) / 10;
      containerRatio = Math.round(containerRatio * 10) / 10;

      if (this[0].naturalWidth != 0) {
        // check the resolution of the image
        // in relation to the container
        if ( containerRatio <= imageRatio ) {
          // reset max-width to zero
          this.css('max-width', 'none');
          // set height
          this.parent('figure').height('100%');
          this.height('100%');
          // calculate offset by subtracting parent width
          // from image width and dividing by two
          offset = (this.width() - $parent.width()) / 2;
          // convert offset to negative percentage
          offset = '-' + offset / $parent.width() * 100 + '%'
          // set margin-top offset
          this.css('margin-left', offset);
        } else {
          // set width
          this.width('100%');
          // calculate offset by subtracting parent height
          // from image height and dividing by two
          offset = (this.height() - $parent.height()) / 2;
          // convert offset to negative percentage
          offset = '-' + offset / $parent.width() * 100 + '%'
          // set margin-top offset
          this.css('margin-top', offset);
        }
      } else {
        this.parent('figure').height('100%');
        this.height('100%').width('100%');
      }

      return this;
  };

  // auto-initialize plugin
  $('[data-image-cover]').load(function(){
    $(this).imageCover();
  }).each(function() {
    if(this.complete) {
      $(this).load();
    }
  });

})(jQuery);
