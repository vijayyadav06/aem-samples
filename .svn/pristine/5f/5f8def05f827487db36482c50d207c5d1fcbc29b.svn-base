var dependencies = ["/apps/medtronic-com/components/common/JavaHelper.js",
    "/apps/medtronic-com/components/common/LinkHelper.js"];

use(dependencies, function(JavaHelper, LinkHelper, AuthoringUtils) {
  var redirectTarget = JavaHelper.toJSString(properties.get("redirectTarget", ""));
  var pagePath = JavaHelper.toJSString(currentPage.getPath());

  // Only redirect if there is a target AND w when in disabled mode
  if (redirectTarget && (wcmmode.disabled)) {
    if (redirectTarget != pagePath) {
       response.sendRedirect(LinkHelper.fixLink(redirectTarget));
    }
  }

  return {
    "redirectTarget": LinkHelper.fixLink(redirectTarget)
  }
})