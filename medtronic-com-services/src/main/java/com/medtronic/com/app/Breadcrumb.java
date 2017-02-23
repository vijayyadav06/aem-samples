
package com.medtronic.com.app;

import java.util.ArrayList;
import java.util.List;

import com.day.cq.wcm.api.PageManager;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;
import com.day.cq.wcm.api.Page;

/**
 * This is Breadcrumb component.
 * 
 * @author laura.lao
 */
public class Breadcrumb extends WCMUse {

    private static final Logger LOG = LoggerFactory.getLogger(Breadcrumb.class);
    private Page siteRootPage = null;
    private Page homePage = null;
    private List<Page> items = new ArrayList<Page>();
    private static final int HOMEPAGE_LEVEL = 3;
    private static final int SITEROOT_LEVEL = 2;
    private static final String REDIRECT_PROPERTY = "redirectTarget";
    private static final String DEFAULT_HOMEPAGE_NAME = "index";

    /**
     * Initializes the breadcrumb
     */
    public void activate() throws Exception {
        siteRootPage = getCurrentPage().getAbsoluteParent(SITEROOT_LEVEL);
        homePage = getHomePage();
        items = generateBreadcrumb();
        LOG.debug("Breadcrumb List : " + items);
    }

    private List<Page> generateBreadcrumb(){
        List<Page> breadcrumb = new ArrayList<>();
        final int currentPageLevel = getCurrentPage().getDepth();
        int level = HOMEPAGE_LEVEL;
        breadcrumb.add(homePage);
        while ( level < currentPageLevel ) {
            Page trail = getCurrentPage().getAbsoluteParent(level);
            if( trail == null || trail.equals(siteRootPage) && getCurrentPage().equals(homePage) ){
                break;
            }

            if( !breadcrumb.contains(trail) && (!trail.isHideInNav() || trail.equals(getCurrentPage())) ){
                breadcrumb.add(trail);
            }
            level++;
        }
        return breadcrumb;
    }

    /**
     * Returns the Home page for a given page.  Homepage is found by the following logic:
     *      A) If a redirectTarget is set on the site-root (it should), use that target to get the homepage
     *      B) A child page named "index" (default homepage name for english and untranslated sites)
     *      C) The site root page - this will be problematic (title-wise, but they should have the redirect set up in prod)
     *
     * EX: /content/medtronic-com/site-root-page/home-page
     * since home-page can have siblings, we cannot assume that level 3 is a homepage.
     *
     * @return Home page
     */
    public Page getHomePage() {
        Page homePage = null;
        ValueMap siteRootProperties = siteRootPage.getProperties();
        //first, try to get the homepage from the redirect target.  If that doesn't exist, try to find an
        String homePagePath;
        if( siteRootProperties.containsKey(REDIRECT_PROPERTY) ){
            homePagePath = (String)siteRootProperties.get(REDIRECT_PROPERTY);
        }else {
            homePagePath = siteRootPage.getPath() + "/" + DEFAULT_HOMEPAGE_NAME;
        }

        homePage = getResourceResolver().adaptTo(PageManager.class).getPage(homePagePath);

        //as a fallback, return the siteroot.
        if( homePage == null || !homePage.isValid()){
            homePage = siteRootPage;
        }

        return homePage;
    }

    /**
     * Returns the breadcrumb items.
     * 
     * @return breadcrumb items
     */
    public List<Page> getItems() {
        return items;
    }
}
