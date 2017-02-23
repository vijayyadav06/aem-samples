
package com.medtronic.com.app;

import org.apache.sling.api.resource.ResourceResolver;
import com.adobe.cq.sightly.WCMUse;

/**
 * Created by wango1 on 2016-01-27. LinkTransformer class is used to Transform the Link URL for a page request/resources
 */
public class LinkTransformer extends WCMUse {

    private static final String SUFFIX_EXTENTIONS = ".html";
    private String currentPagePath;

    @Override
    public void activate() throws Exception {
        currentPagePath = getCurrentPage().getPath();
    }

    /**
     * Gets mapped page url.
     * 
     * @return mapped page url
     */
    public String getCurrentPageURL() {
        final ResourceResolver resourceResolver = getResourceResolver();
        final String mappedUrl = resourceResolver.map(getRequest(), currentPagePath + SUFFIX_EXTENTIONS);
        return mappedUrl;
    }
    
}
