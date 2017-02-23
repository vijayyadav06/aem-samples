use(["/apps/medtronic-com/components/common/JavaHelper.js","/apps/medtronic-com/components/common/LinkHelper.js"], function(JavaHelper,LinkHelper) {
    var hideContentClass = "hide-content"

    //used to set a javascript variable, "acknowledgement_urls" to an array of each authored URL
    function getAcknowledgementURLs(urls){
        var urlStr = "[";
        for( var i = 0; i < urls.length; i++){
            var url = LinkHelper.fixLink(request.getResourceResolver().map(request,urls[i]));
            if( i > 0 ){
                urlStr += ",";
            }
            urlStr += "\"" + url + "\""

        }
        return urlStr + "]";
    }

    function getAuthenticationBodyClass(auth_type){
        var bodyClass = "";
        if( auth_type == "acknowledgement" ){
            bodyClass = hideContentClass;
        }
        return bodyClass;
    }

  return {
    urls : getAcknowledgementURLs(inheritedPageProperties.get('acknowledgement_urls', JavaHelper.getEmptyArray(java.lang.String))),
    bodyClass : wcmmode.disabled ? getAuthenticationBodyClass(inheritedPageProperties.get("authentication_type","none")):''
  }
});