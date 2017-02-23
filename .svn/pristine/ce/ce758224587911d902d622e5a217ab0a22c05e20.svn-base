/* Global Variables */
var searchTrigger, searchText, menuText, menu, searchIcon, searchOverlay, searchFieldQuery, searchDropdown;

function searchBtnEvent() {
  searchTrigger.click(function() {
    if ($('#search-overlay').is(':visible')) {
      closeSearchOverlay();
    } else {
      openSearchOverlay();
    }
  });
}

function closeSearchOverlay() {
  $('#search-overlay').hide();
  searchTrigger.removeClass('active');
  searchText.toggleClass('hidden');
  searchIcon.toggleClass('hidden');
  $('.search-overlay__search-field').val('');
  searchDropdown = $('#search-overlay__form .search__dropdown');
  removeDropdownContent(searchDropdown);
  searchDropdown.addClass('hidden');
}

function openSearchOverlay() {
  $('#search-overlay').show();
  searchTrigger.addClass('active');
  if ($('#main-navigation').is(':visible')) {
    menu.removeClass('active');
    menuText.toggleClass('hidden');
    $('#main-navigation').hide();
  }
  searchText.toggleClass('hidden');
  searchIcon.toggleClass('hidden');

  searchDropdown = $('.search__dropdown');
  if (searchDropdown.is(':visible')) {
    searchDropdown.addClass('hidden');
  }
  ;
}

// Clicking outside the overlay closes the overlay
function outsideClickToCloseSearch() {
  $('html').on('click', function(e) {
    if (searchOverlay.is(':visible') && !searchOverlay.is(e.target) && !searchOverlay.has(e.target).length) {
      closeSearchOverlay();
    }
    ;
  });
  searchTrigger.click(function(e) {
    e.stopPropagation();
  });
}

function outsideClickToCloseDropdown() {
  $('html').on(
          'click',
          function(e) {
            var isDropdown = false;
            $.each($('.search__dropdown'), function(id, element) {
              if ($(element).is(':visible')) {
                isDropdown = true;
              }
            });
            if (isDropdown && !searchDropdown.is(e.target) && !searchDropdown.has(e.target).length
                    && !$(e.target.parentElement).children('.search__dropdown').is(':visible')) {
              searchDropdown.toggleClass('hidden');
            }
          });
}

function kickOffDropdown() {
  $('#search-overlay__form, #search-results-form').on('input', '.search-overlay__search-field, .search-field',
          function(e) {
            searchDropdown = $(this).parent().children('.search__dropdown');
            if ($(this).val().replace(/\s+/g, '').length >= 3) {
              var lang = $('input[name="l"]').val();
              var site = $('input[name="s"]').val();
              var client = $('input[name="c"]').val();
              getPredictiveSuggestiveSearch($(this).val().trim(), lang, site, client);
            } else if ($('.search__dropdown-content').length > 0) {
              if (searchDropdown.is(':visible')) {
                searchDropdown.toggleClass('hidden');
              }
            }
          });
}

function getPredictiveSuggestiveSearch(query, lang, site, client) {
  var data = {
    q: query,
    l: lang,
    s: site,
    c: client
  }
  $.getJSON(Routes.getPredictiveSuggestiveResults, data, function() {})
    .done(function(json) {
      if (json.gsaPredictive.results.length !== 0 && (json.gsaResults.keyMatches || json.gsaResults.results.gsaResult !== null)) {
        buildOverlayDataList(addBold(json.gsaPredictive), removeBold(json.gsaResults));
      } else {
        if (searchDropdown.is(':visible')) {
          searchDropdown.toggleClass('hidden');
        }
        removeDropdownContent(searchDropdown);
      }
    }).fail(function() {
      console.log("Predictive overlay load failure");
    });
}

function removeDropdownContent(dropdownToEmpty) {
  $(dropdownToEmpty).children().children('.predictive').empty();
  $(dropdownToEmpty).children().children('.suggestive').empty();
}

function buildOverlayDataList(predictiveData, suggestiveData) {
  $('.search__dropdown').each(function(id, dropdown) {
    removeDropdownContent(dropdown);
  });
  $(predictiveData.results).each(function(id, result) {
    $(searchDropdown).children().children('.predictive').append('<a>' + result.name.replace(/\+/g,' ') + '</a>');
  });
  var count = 0;
  if (suggestiveData.keyMatches !== null) {
    $(suggestiveData.keyMatches).each(
            function(id, result) {
              if (count <= 2) {
                $(searchDropdown).children().children('.suggestive').append(
                        '<a href="' + result.url + '">' + result.title + '</a>');
                count++;
              }
            });
  }
  if (suggestiveData.results.gsaResult !== null) {
    $(suggestiveData.results.gsaResult).each(
            function(id, result) {
              if (count <= 2) {
                $(searchDropdown).children().children('.suggestive').append(
                        '<a href="' + result.url + '">' + result.title + '</a>');
                count++;
              }
            });
  }
  if (!searchDropdown.is(':visible')) {
    searchDropdown.toggleClass('hidden');
  }
  searchFieldQuery = $(searchDropdown).siblings('input[type=search]').val();
  dropdownMouseoverNav();
}

function addBold(json) {
  $.each(json.results, function(id, result) {
    var tag = 'b', word = json.query, regex = RegExp(word, 'gi'), replacement = '<' + tag + '>$&</' + tag + '>';

    result.name = result.name.replace(regex, replacement);
  });

  return json;
}

function removeBold(json) {
  if (json.keyMatches !== null) {
    $.each(json.keyMatches, function(elementId, element) {
      var stringTemp = element.title;
      if (stringTemp != null) {
        element.title = stringTemp.replace(/<(?!\/?>)[^>]*>/g, '');
      }
    });
  }
  $.each(json.results.gsaResult, function(elementId, element) {
    var stringTemp = element.title;
    if (stringTemp != null) {
      element.title = stringTemp.replace(/<(?!\/?>)[^>]*>/g, '');
    }
  });
  return json;
}

function addDropdownValueToField() {
  $('#search-results__search, .search-results__no-results, #search-overlay__form').on('click', '.predictive a',
          function() {
            $(this).parent().parent().parent().parent().find('input[type=search]').val($(this).text());
            $(this).closest('.search__dropdown').toggleClass('hidden');
            $(this).closest('form').submit();
          });
}

function dropdownKeyboardNav() {
  $(document)
          .keydown(
                  function(e) {
                    if ((searchDropdown !== undefined || $(searchDropdown).children().children().children().length > 0)
                            && (e.keyCode == 38 || e.keyCode == 40)) {
                      if (!$(searchDropdown).is(':visible')
                              && $(searchDropdown).siblings('input[type=search]').is(':focus')
                              && $(searchDropdown).children().children().children().length > 0) {
                        if (e.keyCode === 40) {
                          $(searchDropdown).children().children().children().first().addClass('hovered');
                        } else {
                          $(searchDropdown).children().children().children().last().addClass('hovered');
                        }
                        $(searchDropdown).toggleClass('hidden');
                      } else if ($(searchDropdown).is(':visible') && (e.keyCode == 38 || e.keyCode == 40)) {
                        if ($(searchDropdown).children().children().children('.hovered')) {
                          var currentHover;
                          if ($(searchDropdown).children().children().children().hasClass('hovered')) {
                            currentHover = $(searchDropdown).children().children().children('.hovered');
                          } else {
                            currentHover = $(searchDropdown).siblings('input[type=search]');
                          }
                          var hoverOptions = $(searchDropdown).siblings('input[type=search]').add(
                                  $(searchDropdown).children().children().children());
                          var hoverIndex = $(hoverOptions).index(currentHover[0]);
                          var direction = e.keyCode === 40 ? 1 : -1;
                          currentHover.removeClass('hovered');
                          if (hoverIndex + direction < 0) {
                            currentHover = $(hoverOptions)[$(hoverOptions).length - 1];
                            $(currentHover).addClass('hovered');
                            if (!$(currentHover).parent().hasClass('suggestive')) {
                              $(searchDropdown).siblings('input[type=search]').val($(currentHover).text());
                            } else {
                              $(searchDropdown).siblings('input[type=search]').val(searchFieldQuery);
                            }
                          } else if (hoverIndex + direction === $(hoverOptions).length || hoverIndex + direction === 0) {
                            $(searchDropdown).siblings('input[type=search]').val(searchFieldQuery);
                          } else {
                            currentHover = $(hoverOptions)[hoverIndex + direction];
                            $(currentHover).addClass('hovered');
                            if (!$(currentHover).parent().hasClass('suggestive')) {
                              $(searchDropdown).siblings('input[type=search]').val($(currentHover).text());
                            } else {
                              $(searchDropdown).siblings('input[type=search]').val(searchFieldQuery);
                            }
                          }
                        }
                      }
                    }
                    if (e.keyCode == 13
                            && $(searchDropdown).children().children('.suggestive').children().hasClass('hovered')) {
                      e.preventDefault();
                      document.location = $(searchDropdown).children().children('.suggestive').children('.hovered')
                              .attr('href');
                    }
                  });
}

function dropdownMouseoverNav() {
  $(searchDropdown).on('mouseover', 'a', function() {
    if (!$(this).hasClass('hovered')) {
      $(searchDropdown).children().children().children('.hovered').removeClass('hovered');
      $(this).addClass('hovered');
    }
  });
  $(searchDropdown).on('mouseleave', function() {
    $(searchDropdown).children().children().children('.hovered').removeClass('hovered');
  })
}

/* SEARCH OVERLAY JS */
$(document).ready(
        function() {
          searchTrigger = $('.btn__search'), searchText = $('.btn__search-text'), menuText = $('.btn__menu-text'),
                  menu = $('.btn__menu'), searchIcon = $('.btn__search div'), searchOverlay = $('#search-overlay');

          $('#search-results-form, #search-overlay__form').submit( function(e) {
            var trimmedQuery = $(this).find('.search-field, .search-overlay__search-field').val().trim();
            $(this).find('.search-field, .search-overlay__search-field').val(trimmedQuery);
            if ($(this).find('.search-field, .search-overlay__search-field').val().length < 1) {
              e.preventDefault();
            }
          });
          kickOffDropdown();
          outsideClickToCloseDropdown();
          addDropdownValueToField();
          searchBtnEvent();
          outsideClickToCloseSearch();
          dropdownKeyboardNav();
        });
