use(["/libs/wcm/foundation/components/utils/AuthoringUtils.js"], function(AuthoringUtils) {
  "use strict";
  
  var DropTarget = Packages.com.day.cq.wcm.api.components.DropTarget;
  var Placeholder = Packages.com.day.cq.wcm.foundation.Placeholder;
  
  var path = properties.get("path");
  var ddClassName = DropTarget.CSS_CLASS_PREFIX + "paragraph";
  var error;
  var isTouch = AuthoringUtils.isTouch;
  
  if (path) {
    try {
      var referenceResource = resource.getResourceResolver().getResource(path);
      
      if (referenceResource) {
        var key = "com.day.cq.wcm.components.reference:" + referenceResource.getPath();
      
        if (!request.getAttribute(key)) {
          request.setAttribute(key, java.lang.Boolean.TRUE);
        } else {
            error = "Reference loop: " + path;
        }
      } else {
        error = "Referenced path does not exist";
      }
    } catch (e) {
      if (e.javaException) {
        log.error("Reference component error", e.javaException);
        error = e.javaException.toString();
      } else {
        log.error("An unknown error occurred", e);
        error = "An unknown error occurred";
      }
    }
  }
  
  return {
    "path": path,
    "ddClassName": ddClassName,
    "isTouch": isTouch,
    "error": error
  };
});