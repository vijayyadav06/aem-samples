/* Global Variables */
var total_pages;
var page_number;
var filters = [];
var rows_per_view;

function initPage() {  
  $.Deferred().resolve(searchResults).promise()
  .done(function(json) {
    if ($.isEmptyObject(json) || (json.results == null && json.keyMatches == null)) {
      var data = {
              query: !$.isEmptyObject(json) ? json.query.replace(/\+/g,' ') : 'Nothing',
              staticText: SEARCH_STATIC_TEXT
            }
            buildNoSearchResults(data);
    } else {
      $.each(json.params, function(key, value) {
        if (value.name === 'num') {
          rows_per_view = parseInt(value.value);
        }
      });
      if (json.results !== null) {
        total_pages = Math.ceil(json.results.totalResults / rows_per_view);
        json.results.totalResults = json.results.totalResults;
      } else {
        total_pages = 1;
        json.results = {totalResults: 0};
      }
      json.query = json.query.replace(/\+/g,' ');
      var urlVars = getUrlVars();
      page_number = parseInt(urlVars.p);
      search_results = {
        json: removeCharacters(json),
        staticText: SEARCH_STATIC_TEXT,
        desktopPagination: buildPagination(json, "desktop"),
        mobilePagination: buildPagination(json, "mobile"),
        filters: searchFilters
      };
      populateResults(search_results);
      boldResults(json.query);
      checkFilterFromUrl();
      expandCheckedFilters();
      initFilters();
    }
  }).fail(function() {
    console.log("gsa result load failure");
  });
}

function buildNoSearchResults(data) {
  var listTemplate = Templates['search-results__no-search-results'];
  $('.search-results__no-results').html(listTemplate(data));
  $('.search-results__no-results').removeClass('hidden');
  setPageNumber();
}

function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}

function boldResults(query) {
  $('.list-item-content p, .list-item-content span').wrapInTag({
    tag: 'strong',
    words: [query]
  });
}

function removeCharacters(json) {
  if (json.keyMatches !== null) {
    $.each(json.keyMatches, function(elementId, element) {
      var stringTemp = element.description;
      if (stringTemp != null) {
        element.description = stringTemp.replace(/<(?!\/?>)[^>]*>/g, '');
        element.description = element.description.substring(0, 175);
      }
    });
  }
  if (json.results.gsaResult !== undefined) {
    $.each(json.results.gsaResult, function(elementId, element) {
      var stringTemp = element.description;
      if (stringTemp != null) {
        element.description = stringTemp.replace(/<(?!\/?>)[^>]*>/g, '');
        element.description = element.description.substring(0, 175);
        if (element.metaDescription != null) {
          element.metaDescription.description = stringTemp.replace(/<(?!\/?>)[^>]*>/g, '');
          element.metaDescription.description = element.metaDescription.description.substring(0, 175);
        }
      }
    });
  }
  
  return json;
}

$.fn.wrapInTag = function(opts) {
  var tag = opts.tag, words = opts.words || [], regex = RegExp(words.join('|'), 'gi'), replacement = '<' + tag
          + '>$&</' + tag + '>';

  return this.html(function() {
    return $(this).text().replace(regex, replacement);
  });
};

function buildPagination(data, type) {
  var pagination = {
    currentPage: page_number,
    totalPages: parseInt(total_pages),
    displayElipses: false,
    displayLastNumber: false,
    isFirstPage: false,
    isLastPage: false,
    prevPage: "",
    nextPage: "",
    pageLinks: [],
    displayPagination: true
  };
  var countStart = 1;
  var countLength;
  pagination.displayPagination = data.results.totalResults > rows_per_view ? true : false;

  if (type === "desktop") {
    countLength = 5;
  } else {
    countLength = 3;
  }

  if (page_number >= 6 && total_pages >= 7) {
    countStart = page_number - 4;

    if (page_number == total_pages) {
      // If we are on the last page, then we need to ensure we show 6
      // numbers
      countStart--;
    }
  }

  if (total_pages > 1) {
    if (total_pages > countLength) {
      for (var count = countStart; count < (countStart + countLength) && count <= total_pages; count++) {
        var obj = {}
        obj.pageNumber = count;
        obj.isActive = (count === page_number) ? true : false;
        pagination.pageLinks.push(obj);
      }
    } else {
      for (var count = countStart; count < total_pages; count++) {
        var obj = {}
        obj.pageNumber = count;
        obj.isActive = (count === page_number) ? true : false;
        pagination.pageLinks.push(obj);
      }
    }   
  }

  if (total_pages >= 7 && page_number + 1 < total_pages) {
    pagination.displayElipses = true;
  }

  if (pagination.currentPage === 1) {
    pagination.isFirstPage = true;
  }

  if (pagination.currentPage === pagination.totalPages) {
    pagination.isLastPage = true;
  }

  if (pagination.currentPage === 1) {
    pagination.prevPage = 1;
  } else {
    pagination.prevPage = pagination.currentPage - 1;
  }

  if (pagination.currentPage === total_pages) {
    pagination.nextPage = total_pages;
  } else {
    pagination.nextPage = pagination.currentPage + 1;
  }
  return pagination;
}

function populateResults(data) {
  var listTemplate = Templates['search-results__list'];
  $('#search-results__container').html(listTemplate(data));
  var searchTemplate = Templates['search-results__search'];
  $('#search-results__search').html(searchTemplate(data));
  var totalTemplate = Templates['search-results__total'];
  $('#search-results__total').html(totalTemplate(data));
  var paginationTopTemplate = Templates['search-results__pagination'];
  $('#search-results__pagination-top').html(paginationTopTemplate(data));
  var paginationBottomTemplate = Templates['search-results__pagination'];
  $('#search-results__pagination-bottom').html(paginationBottomTemplate(data));
  var filterTemplate = Templates['search-results__filter'];
  $('#search-results__filter').html(filterTemplate(data));
  setPageNumber();

  Previewer.init();
  SVG.init();

  $('.search-results').removeClass('hidden');
  checkForPrimaryOnly();
}

function expandCheckedFilters() {
  $.each($('.accordion__parent, .accordion__child'), function(key, value) {
    if ($(this).is(':checked')) {
      var $parent = $(this).closest('.accordion__item');
      if (!$parent.hasClass('open')) {
        $parent.find('.accordion__label a').trigger('click');
      }
    }
  });
}

function initFilters() {
  var hasParentChecked;
  var isParent;
  filters = [] //reset the filters

  // loop through each checkbox in the filters form
  $.each($('#search-results-form').find('input[type="checkbox"]'), function(index, input) {

    var hasParentChecked = $(input).closest('.accordion__item').find('.accordion__parent').is(':checked');
    var isParent = $(input).hasClass('accordion__parent');

    // if the child input is checked and the parent is not,
    // OR if the parent checkbox is checked
    // push that value into the filters array
    if ($(input).is(':checked') && !hasParentChecked || (hasParentChecked && isParent)) {
      filters.push($(input).val());
    }
  });
  buildFiltersString();
}

// apply the filters array data to the hidden "filters" input value
function buildFiltersString() {
  var field = $('#search-results-form').find('input[name="filters"]');
  field.val(filters.join());
}

// will set the filters that are in the url to checked
function checkFilterFromUrl() {
  var urlVars = getUrlVars();
  var checkedFilters = decodeURIComponent(urlVars.filters).split(',');
  
  $.each($('#search-results-form').find('input[type="checkbox"]'), function(index, input) {
    $.each(checkedFilters, function(filterIndex, filter) {
      if (input.value === filter) {
        $(input).prop('checked', true);
      }
    });
    var hasParentChecked = $(input).closest('.accordion__item').find('.accordion__parent').is(':checked');
    var $parent = $(this).closest('.accordion__item');
    if (hasParentChecked) {
      // if parent is checked, check all children
      $parent.find('.accordion__child').prop('checked', $(this).is(':checked'));
    }
  });
}

function runSearchInsteadForQuery() {
  $('.search-field').val($('.search-instead a').text());
  $('input[name="p"]').val(1);
  $('#search-results-form').submit();
}

function setPageNumber() {
  $('#search-results-form input[name="p"]').val(1);
}

function runPaginationClick(pageNumber) {
  $('input[name="p"]').val(pageNumber);
  $('#search-results-form').submit();
}

function checkForPrimaryOnly() {
  $.each($('.search-results__filter-container .accordion__label'), function(key, value) {
    if ($(value).siblings().children().length < 1) {
      $(value).find('.icon').toggleClass('hidden');
      $(value).find('.accordion__link').bind('click', false);
    }
  });
}

$(document).ready(function() {  
  // on click accordion label
  $('#search-results__filter').on('click', '.accordion__link', ACCORDION.labelClickEvent);

  // on click accordion parent checkbox
  $('#search-results__filter').on('click', '.accordion__parent', function() {
    var $parent = $(this).closest('.accordion__item');
    var val = $(this).val();

    // if parent is checked, check all children
    $parent.find('.accordion__child').prop('checked', $(this).is(':checked'));

    // open child accordion if it's closed
    if ($(this).is(':checked') && $parent.children('.accordion__content').is(':hidden')) {
      $parent.find('.accordion__label a').trigger('click');
    }

    // rebuild filters
    initFilters();
  });

  // on click accordion child checkbox
  $('#search-results__filter').on('click', '.accordion__child', function() {
    var $parent = $(this).closest('.accordion__item');
    var flag = true; // determines whether clicking child should check parent

    // run through all child checkboxes for parent
    // and set flag to false if any are not checked
    $parent.find('.accordion__child').each(function() {
      if (!$(this).is(':checked')) {
        flag = false;
      }
    });
    $parent.find('.accordion__parent').prop('checked', flag);

    // rebuild filters
    initFilters();
  });

  // on filters reset
  $('#search-results__filter').on('click', '.clear-button', function(e) {
    e.preventDefault();
    $('.accordion__parent, .accordion__child').prop('checked', false);

    // rebuild filters
    initFilters();
  });

  Handlebars.registerHelper('firstElement', function(first, pageNumber) {
    return first.data.root.json.searchInsteadValue.gsaOneSynonym[0].text;
  });

  $('#search-results__pagination-top, #search-results__pagination-bottom').on('click', '.page-numbers a', function(e) {
    if ($(this).hasClass('not-active')) {
      e.preventDefault();
    } else {
      runPaginationClick($(this).data('pageNumber'));
    }    
  });

  $('#search-results__search').on('click', '.search-instead a', function() {
    runSearchInsteadForQuery();
  });
  
  if ($(".search-results").length > 0) {
    initPage();
  }
});