use(["/libs/sightly/js/3rd-party/q.js"], function(Q) {
  "use strict";
  var SIZE = {
    MINI: "one-by-one",
    SLENDER: "one-by-two",
    VARIABLE: "height-variable one-by-one"
  };
  var PAR = {
    MINI: "par-mini",
    SLENDER: "par-slender",
    VARIABLE: "par-variable"
  };

  function getParName(wrapperSize) {
    if (wrapperSize == SIZE.MINI) {
      return PAR.MINI;
    } else if (wrapperSize == SIZE.SLENDER) {
      return PAR.SLENDER;
    } else if (wrapperSize == SIZE.VARIABLE) {
      return PAR.VARIABLE;
    }
    return null;
  }
  
  var wrapperSize = properties.get("wrapperSize", "");
  var parName = getParName(wrapperSize);
  var hasContentDefer = Q.defer();
  
  granite.resource.resolve(granite.resource.path + "/" + parName).then(function(parResource) {
    return parResource.getChildren();
  }, function() {
    hasContentDefer.resolve(false);
  }).then(function(children) {
    hasContentDefer.resolve(children.length > 0);
  });
  

  return {
    "decorativeOnly": properties.get("decorativeOnly", false).booleanValue() && wrapperSize != SIZE.VARIABLE,
    "wrapperSize": properties.get("wrapperSize", SIZE.MINI),
    "backgroundColor": properties.get("backgroundColor", ""),
    "parName": parName,
    "hasContent": hasContentDefer.promise
  };
});