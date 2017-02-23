var dependencies = ["/apps/medtronic-com/components/common/DataLayer.js",
    "/apps/medtronic-com/components/common/RunModes.js", "/apps/medtronic-com/components/common/JavaHelper.js",
    "/apps/medtronic-com/components/common/LiveRelationships.js"];
use(dependencies, function(dataLayer, runModes, JavaHelper, LiveRelationships) {
  "use strict";

  var locale = currentPage.getLanguage(false);
  var country = locale.getCountry();
  var liveRelationshipManager = sling.getService(Packages.com.day.cq.wcm.msm.api.LiveRelationshipManager);
  var resolver = request.getResourceResolver();

  /**
   * We force using "UK" instead of "GB" for the United Kingdom
   */
  if (country == "GB") {
    country = "UK";
  }

  function getSiteData() {
    /**
     * We do not have a difference between desktop and mobile sites. We are
     * using responsive design, so the same site is displayed in both.
     */
    return {
      "isProduction": !!runModes.production && !!runModes.author,
      "type": "desktop",
      "id": "medtronic",
      "language": JavaHelper.toJSString(locale.getLanguage()),
      "country": JavaHelper.toJSString(country)
    };
  }

  function getSourcePageOf(page) {
    var pageResource = page.getContentResource();
    var shallowestResource = LiveRelationships.getShallowestResource(pageResource, liveRelationshipManager, resolver);
    
    return pageManager.getContainingPage(shallowestResource);
  }

  function getAemPath() {
    var aemPath = getSourcePageOf(currentPage).getPath();

    // Strip off everything around aemPath
    // From "/content/medtronic-com/[...]/this/is/the/aem/path"
    // To "this/is/the/aem/path"
    // Start with /content/medtronic-com/
    aemPath = aemPath.substring("/content/medtronic-com/".length);
    // then remove the [...]/ part
    aemPath = aemPath.substring(aemPath.indexOf("/") + 1);

    return JavaHelper.toJSString(aemPath);
  }

  function getSourceCopyPath() {
    var sourcePage = getSourcePageOf(currentPage);
    
    if (sourcePage.getPath() != currentPage.getPath()) {
      return JavaHelper.toJSString(sourcePage.getPath());
    } else {
      return "";
    }
  }

  function getPageData() {
    var tags = JavaHelper.toJSArray(currentPage.getTags());
    var audienceTags = tags.filter(function(tag) {
      // First filter out any tags that are not under audience

      return JavaHelper.toJSString(tag.getTagID()).toLowerCase().indexOf(":audience/") > -1;
    }).map(getTagSplitter("audience"));

    var pageData = {
      /* from tag? */
      "audience": audienceTags,
      /* page title */
      "detail": JavaHelper.toJSString(getSourcePageOf(currentPage).getTitle()),
      /* template path */
      "type": JavaHelper.toJSString(pageProperties.get("cq:template", "")),
      "aemPath": getAemPath(),
      /* Always AEM for any page in AEM */
      "platform": "AEM",
      /* LiveCopy source page, if available, blank if no source */
      "sourceCopy": getSourceCopyPath()
    };

    /**
     * level[x] is the friendly name of the physical hierarchy (L1 or L2 pages),
     * not including self. L3 pages will be endpoints, with name in detail. L2
     * pages will be levelx.
     */
    var pageForLevel = currentPage;

    if (pageProperties.get("pageLevel", "L3") == "L3") {
      pageData.detail = JavaHelper.toJSString(getSourcePageOf(currentPage).getTitle());
      pageForLevel = currentPage.getParent();
    }

    while (pageForLevel && pageForLevel.getDepth() > 3) {
      var pageLevel = "level" + (pageForLevel.getDepth() - 3);

      pageData[pageLevel] = JavaHelper.toJSString(getSourcePageOf(pageForLevel).getTitle());

      pageForLevel = pageForLevel.getParent();
    }

    return pageData;
  }

  function getBusinessUnitTagSet() {
    var tags = JavaHelper.toJSArray(currentPage.getTags());
    return tags.filter(function(tag) {
      // First filter out any tags that are not under corporate-business-unit
      return JavaHelper.toJSString(tag.getTagID()).toLowerCase().indexOf(":corporate-business-units/") > -1;
    }).map(getTagSplitter("corporate-business-units"));
  }

  /**
   * Contains the site level data. Should be the same for all pages within the
   * same environment.
   */
  dataLayer.site = getSiteData();

  /**
   * Contains the page level data. The type of information should be largely the
   * same regardless of the page, but will differ page-by-page.
   */
  dataLayer.page = getPageData();

  /**
   * Contains the business unit tag information for all business unit tags
   * applied.
   */
  dataLayer.businessUnitTagSet = getBusinessUnitTagSet();

  /**
   * Placeholder object for use by javascript on the page. Not populated by
   * anything on the backend.
   */
  dataLayer.event = {
    "name": []
  };

  /**
   * Array of all datalayer-click-tracking elements on the page. This will be
   * populated by each "promo" component as they are rendered.
   */
  dataLayer.promos = [];

  /**
   * Always an array of one on the product detail page or zero on any other page
   * type. The array element will be an object with the properties "id" (the
   * product sku/number) and "name" (the product name). This will be populated
   * by the product detail component.
   */
  dataLayer.product = [];

  /*
   * TODO On hold for R1, no definition of their contents yet
   */
  dataLayer.content = {
  // "title": "",
  // "type": "",
  // "treatmentPhase": "",
  };

  /**
   * To be populated by the search page. This will hold the filters selected by
   * the user.
   */
  dataLayer.filters = [];

  /**
   * To be populated by the search page. This will hold the general search data.
   */
  dataLayer.search = {
    "keyword": "",
    "results": 0,
    "criteria": [], // probably not yet
    "pageType": "list", // "list" or "grid"
  };

  /**
   * Visitor information. This should be populated by the front-end.
   * "loginState" will be either "anonymous" or "logged-in". Until login in
   * implemented, this will always be "anonymous".<br>
   * <br>
   * "type" will be the type of the page (patient, hca, hcp). It is TBD how this
   * will be populated.<br>
   * <br>
   * "id" will be the visitorId pulled from an analytics cookie. It is TBD how
   * this will be implemented.<br>
   */
  /*
   * Kevin to give us the cookie name to pull id, needs some JS to actually pull
   * it before _satellite.pageBottom();
   * 
   * Type will likely come from a tag on the content.
   */
  dataLayer.visitor = {
    "loginState": "anonymous",
    "type": "",
    "id": ""
  };

  /*
   * This data will be implemented at a later date (when there are forms in the
   * medtronic-com project.
   */
  dataLayer.form = {
    "condition": "", // how do we use without a form?
    "therapyType": "", // how do we use without a form?
    "country": ""
  };

  function getTagSplitter(ignoreAtAndAbove) {
    return function(tag) {
      return splitTagIntoLevels(tag, ignoreAtAndAbove)
    }
  }

  function splitTagIntoLevels(tag, ignoreAtAndAbove) {
    var tags = [];

    while (tag != null) {
      tags.unshift(tag);
      tag = tag.getParent();
    }

    return tags.filter(function(tag) {
      return !tag.isNamespace() && tag.getName() != ignoreAtAndAbove;
    }).reduce(function(obj, tag, index) {
      var level = "level" + (index + 1);
      obj[level] = JavaHelper.toJSString(tag.getTitle());
      return obj;
    }, {});
  }
});