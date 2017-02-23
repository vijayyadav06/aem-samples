function customSelect() {
  $('#headerLanguage').select2({
    minimumResultsForSearch: -1,
    dropdownAutoWidth : true,
    dropdownCssClass: 'select2-dropdown--language'
  });

  $('#headerCountry').select2({
    minimumResultsForSearch: -1,
    dropdownAutoWidth : true,
    dropdownCssClass: 'select2-dropdown--country'
  });

  $('.header__select').css('visibility', 'visible');
}

function sizeHeaderSelects() {
  if (window.isMobileOrTablet) {
    var $selectList = $('.header__select'),
        $language   = $selectList.find('.select-language'),
        $country    = $selectList.find('.select-country');

    if ($language.width() < Math.floor($selectList.width() / 2)) {
      $country.css('max-width', $selectList.width() - $language.width() - 1);
    } else {
      $country.css('max-width', '50%');
    }

    if ($country.width() < Math.floor($selectList.width() / 2)) {
      $language.css('max-width', $selectList.width() - $country.width() - 1);
    } else {
      $language.css('max-width', '50%');
    }
  }
}

$(document).ready(function() {
  customSelect();
  sizeHeaderSelects();
  $(window).resize(sizeHeaderSelects);
  $('.header__select > li').change(sizeHeaderSelects)
});
