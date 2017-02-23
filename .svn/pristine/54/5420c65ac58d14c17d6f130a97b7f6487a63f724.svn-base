use([], function() {
  var ATTR_NAV_ID_PREFIX = "medtronic-com.nav-id-";
  var PRIMARY = "primary";
  var SECONDARY = "secondary";
  var TERTIARY = "tertiary";
  
  request.setAttribute(ATTR_NAV_ID_PREFIX + this.type, properties.get("navigationText", ""));
  
  var navIdParts = [];

  if (this.type == PRIMARY) {
    navIdParts.push(request.getAttribute(ATTR_NAV_ID_PREFIX + PRIMARY));
    request.removeAttribute(ATTR_NAV_ID_PREFIX + SECONDARY);
    request.removeAttribute(ATTR_NAV_ID_PREFIX + TERTIARY);
  } else if (this.type == "secondary") {
    navIdParts.push(request.getAttribute(ATTR_NAV_ID_PREFIX + PRIMARY));
    navIdParts.push(request.getAttribute(ATTR_NAV_ID_PREFIX + SECONDARY));
    request.removeAttribute(ATTR_NAV_ID_PREFIX + TERTIARY);
  } else if (this.type == "tertiary") {
    navIdParts.push(request.getAttribute(ATTR_NAV_ID_PREFIX + PRIMARY));
    navIdParts.push(request.getAttribute(ATTR_NAV_ID_PREFIX + SECONDARY));
    navIdParts.push(request.getAttribute(ATTR_NAV_ID_PREFIX + TERTIARY));
  }
  
  return navIdParts.join("|");
});