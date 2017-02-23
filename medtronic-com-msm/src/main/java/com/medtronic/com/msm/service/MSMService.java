package com.medtronic.com.msm.service;

import java.util.List;

import com.medtronic.com.msm.translation.config.LanguageMapping;
import org.apache.sling.api.resource.ResourceResolver;

import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.msm.api.LiveRelationship;
import com.day.cq.wcm.msm.api.RolloutConfig;

/**
 * Provides services methods to move a page that is under a LiveCopy.
 */
public interface MSMService {
    /**
     * removes the LiveRelationship from the provided page.
     * @param page Page object to detach LiveRelationship.
     * @return true if relationship removed, false otherwise.
     */
    Boolean detachLiveRelationship(Page page);

    /**
     * will establish a LiveRelationship between the two provided pages, establishing inheritance.
     * @param source
     * @param target
     * @param configs
     * @return
     */
    Boolean establishLiveRelationship(Page source, Page target, boolean deep, List<RolloutConfig> configs);

    /**
     * will return a list of Page objects that represent the Live Copies for the supplied Page.
     * @param page source of the Live Copies.
     * @return List of Page objects containing all Live Copies.
     */
    List<String> getLiveCopies(Page page);
    
    
    /**
     * will return a list of RolloutConfigs applicable to the LiveCopy the page is controlled by.
     * @param page Page object
     * @return List of RolloutConfig objects from the LiveCopy of the target page, null if not applicable.
     */
    List<RolloutConfig> getRolloutConfigsFromTarget(Page page);

    /**
     * will return the source page for the LiveRelationship of the provided page.
     * @param page Page object with LiveRelationship.
     * @return source Page of the relationship, null if no relationship.
     */
    Page getSourcePageFromLiveRelationship(Page page);

    /**
     * will return the original page name. This can be used on translated pages to find the source page.
     * @param page Page object.
     * @return String value of the original page name, null if value not available.
     */
    String getSourcePageName(Page page);

    /**
     * will return the original page path. This can be used on translated pages to find the source page.
     * @param page Page object.
     * @return String value of the original page path, null if value not available.
     */
    String getSourcePagePath(Page page);

    /**
     * will return the translated page name of the page provided.
     * @param page Page object that holds the property.
     * @return String value of the translated page name, null if value not available.
     */
    String getTranslatedPageName(Page page);

    /**
     * will move the page to the newName. If deep is true, all children will be moved as well.
     * @param resolver Resource resolver
     * @param page Page object to be moved.
     * @param newName String holding the value of the new name of the page.
     * @param deep Boolean to determine whether children are moved.
     * @return the Page object of the moved page, null if not moved.
     */
    Page movePage(ResourceResolver resolver, Page page, String newName, Boolean deep);

    /**
     * will move the page to the translated URL. This method should be idempotent. If the translated page name property
     * value does not change, the page will not be moved.
     * @param page Page object to move.
     * @return the Page object of the moved page, null if not moved.
     */
    Page moveToTranslatedURL(Page page, ResourceResolver resolver);

    /**
     * Utility method to save the page name into two properties: originalPageName and translatedPageName. The second
     * property will be used to get the translated page name during a content translation workflow. This will eliminate
     * the need for another round trip through the translation connector.
     * @param page Page object that will be used to get the name and persist the two properties.
     * @return true if the properties were persisted, false otherwise.
     */
    Boolean persistPageName(Page page);

    /**
     * will return whether the page is under a Site that requires URL Translation.
     * @param page Page object.
     * @return true if page's site requires URL Translation, false otherwise.
     */
    Boolean urlTranslationRequired(Page page);

    /**
     * Will return the live relationship between a source and a target. if target is null or resolves to null, null is returned. if there is no relationship, null is also returned
     * @param sourcePage the source absolute path (or null if you know target resource exists)
     * @param targetPath the target absolute path (if null or resolves to null the method will return null)
     * @return the live relationship. Otherwise null: if target is null or resolves to null or there is no relationship
     */
    LiveRelationship getLiveRelationship(String sourcePage, String targetPath, ResourceResolver resolver);

    /**
     * Will return a language mapping for Clay Tablet that can be used to get the language name
     * @return LanguageMapping object containing all of the LanguageMaps
     */
    LanguageMapping getLanguageMapping();
}