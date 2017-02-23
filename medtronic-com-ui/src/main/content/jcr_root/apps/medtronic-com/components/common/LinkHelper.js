use([], function() {
  "use strict";
  
  function addDotHtmlIfNeeded(url) {
    // TODO get the actual resource type extension?
    if (url && url.slice(0, 9) == "/content/" && url.indexOf(".") == -1) {
      return url + ".html";
    }
    
    return url;
  }
  
  function addHttpIfNeeded(url) {
    if(url){
      var firstChar = url.slice(0, 1);
      if (firstChar != "/" && firstChar != "#" && url.search(/^(ht|f)tps?:/) == -1) {
        return "http://" + url;
      }
      
      return url;
    }
  }
  
  return {
    fixLink: function(url) {
      return addDotHtmlIfNeeded(addHttpIfNeeded(url))
    },
    inlineFixLink: addDotHtmlIfNeeded(addHttpIfNeeded(this.url))
  }
});