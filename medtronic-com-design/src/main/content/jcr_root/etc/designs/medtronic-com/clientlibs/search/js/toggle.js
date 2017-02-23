
function toggleSearchFilters() {
  $('#search-results__filter').on('click', '.top-filter .filter-toggle a', function(e) {
    e.preventDefault();

    if(!($('.accordion-filter')).hasClass('open')) {
      $(this).parent().addClass('open');
      $('.accordion-filter').addClass('open');
    }
    else {
      $(this).parent().removeClass('open');
      $('.accordion-filter').removeClass('open');
    }
  })
}

$(document).ready(function() {
  toggleSearchFilters();
});
