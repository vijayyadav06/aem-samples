use(["/apps/medtronic-com/components/common/DataLayer.js"], function(dataLayer) {
  "use strict";

  function getBrokenJsonKeys(obj, currentKey, errors) {
    if (!errors) {
      errors = [];
    }

    if (typeof obj.getClass == "function") {
      /*
       * If obj has a getClass() method, assume it is a Java object and add it
       * to the errors list.
       */
      errors.push(currentKey + " is a " + obj.getClass().getName());
    } else if (typeof obj == "object") {
      /*
       * If obj is otherwise a JS object, then call recursively on each of its
       * keys.
       */
      for ( var nextKey in obj) {
        var nextObj = obj[nextKey];
        getBrokenJsonKeys(nextObj, currentKey + "." + nextKey, errors);
      }
    }

    return errors;
  }

  try {
    var json = JSON.stringify(dataLayer, null, !wcmmode.disabled ? 1 : -1);
  } catch (e) {
    var brokenKeys = getBrokenJsonKeys(dataLayer, "dataLayer");
    if (brokenKeys.length) {
      log.error("Error with data layer keys: \n\t{}", brokenKeys.join("\n\t"), e.rhinoException);
    } else {
      log.error("Error serializing to JSON", e.rhinoException);
    }
  }

  return json || {};
});