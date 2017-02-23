(function($) {
  $(function() {
    var jcarousel = $('#carousel--product-overview');


      jcarousel
        .on('jcarousel:reload jcarousel:create', function() {
          var carousel = $(this),
            width = carousel.innerWidth(),
            n = carousel.jcarousel('items').length;

          carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
          carousel.jcarousel('list').css('width', Math.ceil(width * n) + 'px');

          $.each(carousel.jcarousel('items'), function(index, item) {
            var $img = $(item).find('img');

            if ($img[0].naturalWidth > $img[0].naturalHeight) {
              var ratio = carousel.width() / $img.height();
              var w = $img.width() * ratio;
              var ml = (w - carousel.width()) / 2 * -1
              $img.css({
                'width': w,
                'height': $img.height() * ratio,
                'margin-left': ml,
                'max-width': 'none'
              });
            } else if ($img[0].naturalWidth < $img[0].naturalHeight) {
              var mt = ($img.height() - carousel.width()) / 2 * -1;
              $img.css({
                'width': carousel.width(),
                'margin-top': mt
              });
            } else {

              $img.width('100%').height('100%').parent('li').height(Math.ceil(width));
            }
          });
        })
        .on('jcarousel:createend', function() {
          var carousel = $(this);
          carousel.css('background', 'none');
          carousel.find('.carousel__list').css('visibility', 'visible');
          carousel.siblings('.carousel__pagination').css('visibility', 'visible');
        })
        .jcarousel();

    // make carousel if more than one item
    if (jcarousel.find('.carousel__item').length > 1) {
      $('.carousel__pagination')
        .on('jcarouselpagination:active', 'a', function() {
          $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function() {
          $(this).removeClass('active');
        })
        .on('click', function(e) {
          e.preventDefault();
        })
        .jcarouselPagination({
          perPage: 1,
          item: function(page) {
            var slide = jcarousel.find('.carousel__list').children('.carousel__item').get(page - 1),
              src = $(slide).find('img').prop('src'),
              alt = $(slide).find('img').prop('alt');
            return '<a href="#' + page + '"><img src="' + src + '" alt="' + alt + '" /></a>';
          }
        });
    }
  });
}(jQuery));
