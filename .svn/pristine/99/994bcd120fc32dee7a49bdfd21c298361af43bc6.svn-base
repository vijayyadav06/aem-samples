/**
 * Authorable Page backing js
 */

use([], function(JavaHelper) {
  "use strict";
  var path = currentPage.path;
  var pathRegex;
  if(path.indexOf("content/medtronic-com") != -1){// this page is in Dev or Dispatcher instance
    pathRegex = "/content/medtronic-com/.*?/[^/]+";
  }else{
    pathRegex = "/.*?/.*?[^/]+";
  }
  var result = path.match(pathRegex);	
  response.setStatus(javax.servlet.http.HttpServletResponse.SC_MOVED_PERMANENTLY);
  response.setHeader("Location",result[0]+'.html'); 
});


