var scope = this;
use([], function() {
  "use strict";
  return {
    /**
     * Returns an empty Java array of the given type. This is used mainly when
     * getting an array of properties from a Sling ValueMap, because ValueMap
     * does not support Javascript arrays.
     */
    getEmptyArray: function(javaType) {
      return java.lang.reflect.Array.newInstance(javaType, 0);
    },
    /**
     * Converts an object (Java, Javacript, other) to a Javascript string. This
     * needs to be used on Java Strings when using JSON.stringify().
     * 
     * @param obj
     *          the object to be converted to a string.
     */
    toJSString: function(obj) {
      return obj + "";
    },

    /**
     * Converts both Java boolean and java.lang.Boolean to JS boolean.
     * 
     * @param b
     *          the boolean/java.lang.Boolean to convert
     */
    toJSBoolean: function(b) {
      return b == true;
    },

    /**
     * Converts a Java array to a JS native one.
     * 
     * @param arr
     *          the array to convert
     */
    toJSArray: function(arr) {
      var ret = [];

      for (var i = 0; i < arr.length; i++) {
        ret.push(arr[i]);
      }
      
      return ret;
    },
    
    javaToJS: function(obj) {
      return Packages.org.mozilla.javascript.Context.javaToJS(obj, scope);
    }
  };
});