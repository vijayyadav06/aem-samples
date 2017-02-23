use(["/libs/wcm/foundation/components/page/head.js", "/apps/medtronic-com/components/common/JavaHelper.js"], function(
        baseHead, JavaHelper) {
  var ValueMap = Packages.org.apache.sling.api.resource.ValueMap;
  var Resource = Packages.org.apache.sling.api.resource.Resource;

  function depth(resource) {
    return resource.getPath().split("/").length - 1;
  } 
  
  var nextParent = currentPage.adaptTo(Resource);
  
  while (depth(nextParent) > 3) {
    var nextParentResourceType = JavaHelper.javaToJS(nextParent.getChild("jcr:content/sling:resourceType"));
    var isNull = nextParentResourceType != null;
    if (nextParentResourceType && nextParentResourceType.adaptTo(java.lang.String) == "medtronic-com/components/pages/site-root-page") {
      break;
    }
    
    nextParent = nextParent.getParent();
  }

  var sitePath = JavaHelper.toJSString(request.getResourceResolver().map(request, nextParent.getPath()));

  // Strip off the http(s)://hostname:port/ part and replace it with a / 
  sitePath = sitePath.replace(/^.*?\/\/.*?\//, "/");

  baseHead.sitePath = sitePath;

  return baseHead;
});