(function($) {
  $(function() {
    var jcarousel = $('.carousel--similar-devices'),
        counter = 0;

    jcarousel
      .on('jcarousel:reload jcarousel:create', function() {
        var carousel = $(this),
            width = carousel.innerWidth(),
            n = carousel.jcarousel('items').length;

        if (width >= 500) {
            width = width / 3;
        } else if (width >= 280) {
            width = width / 2;
        }

        carousel.jcarousel('items').css('width', Math.floor(width) + 'px');

      })

      .on('jcarousel:createend', function() {
        var carousel = $(this);
        carousel.css('background', 'none');
        carousel.find('.carousel__list').css('visibility', 'visible');
        carousel.siblings('.carousel-control').css('visibility', 'visible');
      })
      .jcarousel({
        transitions: Modernizr.csstransitions ? {
          transforms: Modernizr.csstransforms,
          transforms3d: Modernizr.csstransforms3d,
          easing: 'ease'
        } : false
      });

    $('.carousel-control--previous')
      .on('jcarouselcontrol:active', function() {
          $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
          $(this).addClass('inactive');
      })
      .jcarouselControl({
          target: '-=1'
      });

    $('.carousel-control--next')
      .on('jcarouselcontrol:active', function() {
          $(this).removeClass('inactive');
      })
      .on('jcarouselcontrol:inactive', function() {
          $(this).addClass('inactive');
      })
      .jcarouselControl({
          target: '+=1'
      });
  });
}(jQuery));
