use(["/apps/medtronic-com/components/common/LanguageUtil.js"], function(LanguageUtil) {
  "use strict";

  var RTL_LANGUAGES = ["ar", "dv", "fa", "ha", "he", "iw", "ji", "ps", "ur", "yi"];
  var RTL = "rtl";
  var LTR = "ltr";
  var locale = LanguageUtil.getPageLanguage();
  // concatenate with a JS empty string, to make it a JS string for the
  // indexOf() call
  var language = locale.getLanguage() + "";
  var country = locale.getCountry() + ""
  var direction = LTR;

  if (RTL_LANGUAGES.indexOf(language) > -1) {
    direction = RTL;
  }
  var SITEMAP_NAME = "/sitemap.xml"
  var sitemapURL = currentPage.getAbsoluteParent(2);
  if( sitemapURL != null ){
    sitemapURL = resource.getResourceResolver().map(sitemapURL.getPath());
    sitemapURL += SITEMAP_NAME;
  }
  
  var flowplayerConfigService = sling.getService(Packages.com.medtronic.com.services.FlowplayerConfigService);
  var flowplayerKey = flowplayerConfigService.getFlowplayerKey();
  var flowplayerAnalyticsKey = flowplayerConfigService.getFlowplayerAnalyticsKey();

  return {
    "locale": locale.toString(),
    "textDirection": direction,
    "isRegion": country.charAt(0) == "X",
    "robots": pageProperties.migration_robotSettings ? pageProperties.migration_robotSettings:'index,follow',
    "sitemapURL": sitemapURL,
    "flowplayerKey": flowplayerKey,
    "flowplayerAnalyticsKey": flowplayerAnalyticsKey
  };
});