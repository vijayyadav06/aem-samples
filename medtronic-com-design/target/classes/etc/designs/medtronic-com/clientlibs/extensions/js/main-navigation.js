/* GLOBAL VARIABLES */
var isNoTouch,
    menuTrigger,
    menuText,
    L2SubnavContainer,
    L3SubnavContainer,
    L1Link,
    L2Link,
    L3Link,
    L1Nav,
    L2Nav,
    L3Nav,
    backLink,
    overviewLink,
    navWrapper,
    mainNav,
    KEY_ENTER,
    KEY_TAB,
    searchDropdown;


/* GLOBAL FUNCTIONS */

// Check for submenus
function submenuCheck() {
  if ($('.nav-items__level-1--link ~ .nav-items__wrapper') || $('.nav-items__level-2--link ~ .nav-items__wrapper')) {
    $('.nav-items__level-1--link ~ .nav-items__wrapper').prev(L1Link).addClass('has-submenu');
    $('.nav-items__level-2--link ~ .nav-items__wrapper').prev(L2Link).addClass('has-submenu');
  }
}

// Close Menu
function closeMenuEvent() {
  mainNav.hide();

  L2Nav.removeClass('showing');
  L3Nav.removeClass('showing');
  L1Link.removeClass('active');
  L2Link.removeClass('active');

  menuText.toggleClass('hidden');
  menuTrigger.removeClass('active').blur().attr('aria-expanded', 'false');
}

// Open Menu
function openMenuEvent() {
  mainNav.show();
  checkHeight();
  menuText.toggleClass('hidden');

  menuTrigger.attr('aria-expanded', 'true');
  if ($('#search-overlay').is(':visible')) {
    $('#search-overlay').hide();
    $('.btn__search').removeClass('active');
    $('.btn__search-text').toggleClass('hidden');
    $('.btn__search div').toggleClass('hidden');
  }

  searchDropdown = $('.search__dropdown');
  if (searchDropdown.is(':visible')) {
    searchDropdown.addClass('hidden');
  };
}

function checkHeightDesktop() {
  $('.nav-menu, .nav-items__level-1, .nav-items__level-2, .nav-items__level-3').removeAttr('style');

  var L1Height = $('.nav-items__level-1').height(),
      L2Height = $('.nav-items__level-2.showing').height(),
      L3Height = $('.nav-items__level-3.showing').height(),
      menuHeight = L1Height;

  if (L2Height > menuHeight) {
    menuHeight = L2Height;
  }
  if (L3Height > menuHeight) {
    menuHeight = L3Height;
  }
  $('.nav-menu, .nav-items__level-1, .nav-items__level-2.showing, .nav-items__level-3.showing').height(menuHeight);

  // $('.nav-menu').height(menuHeight);
}

function checkHeightMobile() {
  var L1Height = $('.nav-items__level-1').height(),
      L2Height = $('.nav-items__level-2.showing').height(),
      L3Height = $('.nav-items__level-3.showing').height(),
      menuHeight = L1Height;

  if (L2Nav.hasClass('showing') && !L3Nav.hasClass('showing')) {
    menuHeight = L2Height;
  }
  if (L2Nav.hasClass('showing') && L3Nav.hasClass('showing')) {
    menuHeight = L3Height;
  }

  $('.nav-menu').height(menuHeight);
}

function checkHeight() {
  if (window.isMobileOrTablet) {
    checkHeightMobile();
  } else {
    checkHeightDesktop();
  }
}

// Menu/Close button that toggles the navigation panel
function menuButtonEvent() {
  menuTrigger.on('click', function(e) {
    e.preventDefault();
    if(mainNav.is(':visible')) {
      closeMenuEvent();
      $(this).removeClass('active').blur();
    }
    else {
      openMenuEvent();
      $(this).addClass('active');
    }
  });
}

// Clicking outside the menu closes the menu
function outsideClickToClose() {
  $('html').on('click', function (e) {
    if (mainNav.is(':visible') && !mainNav.is(e.target) && !mainNav.has(e.target).length) {
      closeMenuEvent();
    }
  });
  menuTrigger.click(function(e) {
    e.stopPropagation();
  });
}

// Primary Nav Event: L1 nav link toggles L2 submenu
function primaryNavEvent(e) {

  if (e.type == 'click') {

    if ($(this).hasClass('has-submenu')) {
      e.preventDefault();

      L2SubnavContainer = $(this).next(L2Nav);

      L1Link.removeClass('active');
      L2Link.removeClass('active');
      $(this).addClass('active').attr('aria-expanded', 'true');

      L2Nav.removeClass('showing');
      L3Nav.removeClass('showing');
      $(L2SubnavContainer).addClass('showing');
    }

  }

  if ((e.type == 'keydown' && e.keyCode == KEY_ENTER)) {

    if ($(this).hasClass('has-submenu')) {
      e.preventDefault();

      backLink.show();

      L2SubnavContainer = $(this).next(L2Nav);

      L1Link.removeClass('active');
      L2Link.removeClass('active');
      $(this).addClass('active').attr('aria-expanded', 'true');

      L2Nav.removeClass('showing');
      L3Nav.removeClass('showing');
      $(L2SubnavContainer).addClass('showing');
    }

  }

  checkHeight();
}

// Secondary Nav Event: L2 nav link toggles L3 submenu
function secondaryNavEvent(e) {

  if (e.type == 'click') {

    if ($(this).hasClass('has-submenu')) {
      e.preventDefault();

      L2Link.removeClass('active');
      $(this).addClass('active').attr('aria-expanded', 'true');

      L3SubnavContainer = $(this).next(L3Nav);

      L3Nav.removeClass('showing');
      $(L3SubnavContainer).addClass('showing');
    }
  }

  if (e.type == 'keydown' && e.keyCode == KEY_ENTER) {

    if ($(this).hasClass('has-submenu')) {
      e.preventDefault();

      backLink.show();

      L2Link.removeClass('active');
      $(this).addClass('active').attr('aria-expanded', 'true');

      L3SubnavContainer = $(this).next(L3Nav);

      L3Nav.removeClass('showing');
      $(L3SubnavContainer).addClass('showing');
    }

  }

  checkHeight();
}

function goBackEvent(e) {
  if ((e.type == 'keydown' && e.keyCode == KEY_ENTER) || e.type == 'click') {
    e.preventDefault();

    var currentList = $(this).closest(navWrapper);

    currentList.removeClass('showing');
    currentList.prev().removeClass('active').attr('aria-expanded', 'false').focus();

    checkHeight();
  }
}

/* TOUCH DEVICE NAVIGATION: Click events */
function touchNavigation() {
  L1Link.on('click keydown', primaryNavEvent);
  L2Link.on('click keydown', secondaryNavEvent);
  backLink.on('click keydown', goBackEvent);
}

/* MAIN NAVIGATION JS */
$(document).ready(function () {
  isNoTouch = $('html.no-touch').length,
  menuTrigger = $('.btn__menu'),
  menuText = $('.btn__menu-text'),
  L2SubnavContainer,
  L3SubnavContainer,
  L1Link = $('.nav-items__level-1--link'),
  L2Link = $('.nav-items__level-2--link'),
  L3Link = $('.nav-items__level-3--link'),
  L1Nav = $('.nav-items__level-1'),
  L2Nav = $('.nav-items__level-2'),
  L3Nav = $('.nav-items__level-3'),
  backLink = $('.nav-items__back-link'),
  overviewLink = $('.nav-items__overview-link'),
  navWrapper = $('.nav-items__wrapper'),
  mainNav = $('#main-navigation'),
  KEY_ENTER = 13,
  KEY_TAB = 9;

  submenuCheck();

  menuButtonEvent();
  outsideClickToClose();
  touchNavigation();

  checkWindowSize();
  $(window).resize(checkWindowSize);

});
