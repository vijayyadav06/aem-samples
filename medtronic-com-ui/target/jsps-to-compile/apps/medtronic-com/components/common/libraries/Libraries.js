use([], function() {
  "use strict";
  var ATTR_LIBRARIES = "medtronic-com.libraries";

  /**
   * library structure is expected to be like the following:
   * {"categories":"jquery","type":"js"}. The "categories" property is the same
   * as the categories passed into the clientlib template. The "mode" property
   * is one of "js", "css", or "all" directly related to the clientlib include
   * mode.
   */
  var requestArributeName = ATTR_LIBRARIES + "." + this.collection;
  var libraries = request.getAttribute(requestArributeName);

  if (libraries == null) {
    libraries = [];
    request.setAttribute(requestArributeName, libraries);
  }

  /**
   * When called from the footer libraries include template, add the specified
   * library to the list.
   */
  if (this.categories && this.mode) {
    log.debug("Clientlib Added [" + this.categories + ": " + this.mode.toLowerCase() + "]");
    libraries.push({
      "categories": this.categories,
      "mode": this.mode.toLowerCase()
    });
  } else {
    if (log.isDebugEnabled()) {
      log.debug("Clientlibs Rendered:\n" + JSON.stringify(libraries, null, 1));
    }
  }

  return libraries;
});