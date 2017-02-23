use([], function() {
  "use strict";
  var ATTR_DATA_LAYER = "analyticsDataLayer";
  var dataLayer = request.getAttribute(ATTR_DATA_LAYER);
  
  if (dataLayer == null) {
    dataLayer = {};
    request.setAttribute(ATTR_DATA_LAYER, dataLayer);
  }
  
  return dataLayer;
});