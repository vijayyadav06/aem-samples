/*
 * Utility Functions
 *
 * Various global functions
 */

function checkWindowSize() {
  // check if the window is currently in mobile view
  window.isMobile = window.innerWidth < 500;
  window.isMobileOrTablet = window.innerWidth < 750;
}

jQuery.fn.extend({
  tableOverflowScroll: function() {
    return this.each(function(){
      var $this = $(this);
      var parentWidth = $this.parent().width(),
          width = $this.width();

      if (!$this.parent().hasClass('overflow-scroll') && width > parentWidth) {
        $this.wrap('<div class="overflow-scroll"></div>');
      } else if ($this.parent().hasClass('overflow-scroll') && width <= parentWidth) {
        $this.unwrap();
      }
    });
  }
});

(function(){
  window.addEventListener('resize', function(){
    checkWindowSize;
    $('table').not('.responsive-table table, .tablesaw').tableOverflowScroll();
  });

  $('table').not('.responsive-table table, .tablesaw').tableOverflowScroll();
})()
