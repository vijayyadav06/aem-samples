var SEARCH_AUTHORING = "/apps/medtronic-com/components/common/SearchAuthoring.js";
var JAVA_HELPER = "/apps/medtronic-com/components/common/JavaHelper.js";

use([SEARCH_AUTHORING, JAVA_HELPER], function(searchAuthoring, javaHelper) {

  var results;
  var ServletUtil = Packages.com.medtronic.com.util.ServletUtil;
  var LanguageUtil = Packages.com.medtronic.com.util.LanguageUseUtil;
  var languageUtil = LanguageUtil.getInstance(currentPage);
  var pageLocale = languageUtil.getPageLanguage();
  if (request.getParameter("q") !== null) {

    var query = ServletUtil.getParameter(request, "q");
    var pageNumber = parseInt(ServletUtil.getParameter(request, "p"));
    var resultsPageType = ServletUtil.getParameter(request, "t");
    var resultsRequested = resultsPageType.equals("list") ? 10 : 20;
    var language = ServletUtil.getParameter(request, "l");
    var site = ServletUtil.getParameter(request, "s");
    var client = ServletUtil.getParameter(request, "c");
    var selectedFilters = ServletUtil.getParameter(request, "filters") == null ? "" : ServletUtil.getParameter(request, "filters");
    var searchFiltersUsed = selectedFilters == null ? [] : selectedFilters.split(',');
    
    searchFiltersUsed = searchFiltersUsed.map(function(item) {
      return javaHelper.toJSString(item);
    });
    
    var JsonUtil = Packages.com.medtronic.com.util.JsonUtil;
    var gsaSearchService = sling.getService(Packages.com.medtronic.com.services.gsa.GsaSearchService);

    var resultsObj = gsaSearchService.search(query, pageNumber, resultsRequested, language, site, client, selectedFilters);

    if (resultsObj) {
      resultsObj.setQuery(xssAPI.encodeForJSString(resultsObj.getQuery()));
      var gsaParams = resultsObj.getParams();
      
      if (gsaParams != null) {
        var paramsIterator = gsaParams.iterator();
        
        while (paramsIterator.hasNext()) {
          var param = paramsIterator.next();
          param.setValue(xssAPI.encodeForJSString(param.getValue()));
          param.setOriginalValue(xssAPI.encodeForJSString(param.getOriginalValue()));
        }
      }
    }
    
    if (resultsObj.getPreviewData() != null) {
      resultsObj.setPreviewData(resultsObj.getPreviewData().replaceAll("resourceURI\":\"/",
              "resourceURI\":\"/bin/medtronic-com/gsaZoomServlet?"));
    }

    results = JsonUtil.mapper.writeValueAsString(resultsObj);
  }

  var tagManager = request.getResourceResolver().adaptTo(Packages.com.day.cq.tagging.TagManager);

  var filters = properties.get("filters", javaHelper.getEmptyArray(java.lang.String)).map(function(filterJson) {
    var filter = JSON.parse(filterJson);
    if (filter.primaryFilter) {
      var primaryTag = tagManager.resolve(filter.primaryFilter);
      if (primaryTag != null) {
        filter.filterText = javaHelper.toJSString(primaryTag.getTitle(pageLocale));
        filter.filterValue = javaHelper.toJSString(primaryTag.getName());
        if (filter.secondaryFilters) {
          filter.secondaryFilters = filter.secondaryFilters.map(function(secondaryFilterTagId) {
            var secondaryTag = tagManager.resolve(secondaryFilterTagId);
            if (secondaryTag != null) {
              return {
                filterText: javaHelper.toJSString(secondaryTag.getTitle(pageLocale)),
                filterValue: filter.filterValue + '/' + javaHelper.toJSString(secondaryTag.getName())
              };
            } else {
              log.warn("secondary tag {} does not exist", secondaryFilterTagId);
            }
          });
        }
      } else {
        log.warn("primary tag {} does not exist", filter.primaryFilter);
      }
    }
    delete filter.primaryFilter;

    return filter;
  });

  var language = pageLocale.getLanguage();
  
  var resultsCount = "0";
  
  if (resultsObj != null) {
    var resultsHolder = resultsObj.getResults();
    
    if (resultsHolder != null) {
      resultsCount = resultsHolder.getTotalResults();
    }
  }

  return {
    searchAuthoring: searchAuthoring,
    filters: JSON.stringify(filters, null, " "),
    language: language,
    results: results || "{}",
    searchResultsCount: resultsCount,
    searchKeyword: xssAPI.encodeForJSString(query),
    searchResultsPageType: resultsPageType,
    searchCriteria: searchFiltersUsed
  };

});