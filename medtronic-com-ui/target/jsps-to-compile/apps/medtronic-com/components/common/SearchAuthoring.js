use(["/apps/medtronic-com/components/common/LinkHelper.js"], function(linkHelper) {
  "use strict";

  return {
    searchResultsPage: request.getResourceResolver().map(request, linkHelper.fixLink(inheritedPageProperties.get("globalHeader_search_resultsUrl"))),
    advancedLinkUrl: request.getResourceResolver().map(request, linkHelper.fixLink(inheritedPageProperties.get("globalHeader_search_linkUrl"))),
    advancedLinkText: inheritedPageProperties.get("globalHeader_search_linkText")
  };
});