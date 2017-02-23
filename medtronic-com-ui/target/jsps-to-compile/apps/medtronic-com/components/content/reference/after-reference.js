use([], function() {
  "use strict";

  var path = properties.get("path");
  var referenceResource = resource.getResourceResolver().getResource(path);

  if (referenceResource) {
    var key = "com.day.cq.wcm.components.reference:" + referenceResource.getPath();

    request.removeAttribute(key);
  }
});