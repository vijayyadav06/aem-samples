var ACCORDION = function() {

  var $accordionLabel     = $('.accordion__label a'),
      $accordionExpandAll = $('.accordion__expand-all'),
      slideDuration = 200;

  var labelClickEvent = function(e) {
    e.preventDefault();

    var $parentAccordion = $(this).closest('.accordion');
    var $parentItem = $(this).closest('.accordion__item');

    if (!$parentAccordion.hasClass('accordion--mobile') || ($parentAccordion.hasClass('accordion--mobile') && window.isMobile)) {
      // $parent.siblings().removeClass('open').find('.accordion__content').slideUp('fast');
      $parentItem.toggleClass('open').find('.accordion__content').slideToggle('fast', function() {
        var $accordion = $(this).closest('.accordion'),
          $contents = $accordion.find('.accordion__content')

        if (!$contents.is(':visible')) {
          $accordion.data('allExpanded', false);
          $accordion.prev().find('.accordion__expand').removeClass('hidden');
          $accordion.prev().find('.accordion__collapse').addClass('hidden');
        }

        if (!$contents.is(':hidden')) {
          $accordion.data('allExpanded', true);
          $accordion.prev().find('.accordion__expand').addClass('hidden');
          $accordion.prev().find('.accordion__collapse').removeClass('hidden');
        }

      });
    }

  }

  var expandAllClickEvent = function(e) {
    e.preventDefault();

    var $this = $(this),
      $accordion = $this.next('.accordion');

    if ($accordion.data('allExpanded')) {
      $accordion.data('allExpanded', false)
        .find('.accordion__item').removeClass('open')
        .find('.accordion__content').slideUp('fast');
    } else {
      $accordion.data('allExpanded', true)
        .find('.accordion__item').addClass('open')
        .find('.accordion__content').slideDown('fast');
    }
    $this.find('.accordion__expand, .accordion__collapse').toggleClass('hidden');
  }

  var init = function() {
    var fromHashSelector = getAccordionHashSelector();
    $.each($('.accordion'), function(index, accordion) {

      // if not a mobile accordion
      // and if not a filter accordion
      // and if this accordion does not have the location.hash
      if (!$(accordion).hasClass('accordion--mobile') && !$(accordion).hasClass('accordion-filter') && !$(accordion).find(fromHashSelector).length) {

        // initially hide all but the first item
        $(accordion).data('allExpanded', false)
          .children('.accordion__item').first()
          .addClass('open').find('.accordion__content').slideDown()
          .siblings();
      }
    });

    $accordionLabel.off('click.accordion').on('click.accordion', labelClickEvent);
    $accordionExpandAll.off('click.accordion').on('click.accordion', expandAllClickEvent);

    $(window).off('hashchange.accordion').on('hashchange.accordion', function() {
      openAccordionForHash();
    });

    // check URL hash and open corresponding accordion item
    openAccordionForHash();
  }

  var getAccordionHashSelector = function() {
    // Find the id OR name attribute selector
    var fromHashSelector = "";

    if (location.hash) {
      fromHashSelector = location.hash + ',[name="' + location.hash.slice(1) + '"]';
    }

    return fromHashSelector;
  }

  var openAccordionForHash = function() {
    var fromHashSelector = getAccordionHashSelector();

    if (fromHashSelector && $(fromHashSelector).closest('.accordion').length && !$(fromHashSelector).closest('.accordion__item').hasClass('open')) {
      var $hashAnchor = $(fromHashSelector).closest('.accordion__item').find('.accordion__label a');
      $hashAnchor.trigger('click');
      setTimeout(function() {
        $(window).scrollTop($(fromHashSelector).offset().top);
      }, slideDuration);
    }
  }

  return {
    init: init,
    labelClickEvent: labelClickEvent
  }
}();

$(document).ready(function() {
  ACCORDION.init();
});
