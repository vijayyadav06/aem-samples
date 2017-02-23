use(["/apps/medtronic-com/components/common/LiveRelationships.js"], function(LiveRelationships) {
  "use strict";
  var ValueMap = Packages.org.apache.sling.api.resource.ValueMap;

  var liveRelationshipManager = sling.getService(Packages.com.day.cq.wcm.msm.api.LiveRelationshipManager);
  var resolver = request.getResourceResolver();

  function getPageProperties(page) {
    if (page) {
      return page.getProperties();
    }
  }

  function getProperties(resource) {
    if (resource) {
      return shallowestResource.adaptTo(ValueMap);
    }
  }

  var shallowestResource = LiveRelationships.getShallowestResource(resource, liveRelationshipManager, resolver);
  var shallowestPage = pageManager.getContainingPage(shallowestResource);
  var _pageProperties = getPageProperties(shallowestPage);
  var _properties = getProperties(shallowestResource);

  return {
    "_pageProperties": _pageProperties,
    "_properties": _properties
  };
});