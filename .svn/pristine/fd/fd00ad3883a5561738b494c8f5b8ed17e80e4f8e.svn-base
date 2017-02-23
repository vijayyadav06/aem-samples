
package com.medtronic.com.msm.service.impl;

import com.day.cq.commons.jcr.JcrUtil;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.commons.ReferenceSearch;
import com.day.cq.wcm.commons.ReferenceSearch.Info;
import com.day.cq.wcm.msm.api.LiveRelationship;
import com.day.cq.wcm.msm.api.LiveRelationshipManager;
import com.day.cq.wcm.msm.api.RolloutConfig;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.medtronic.com.constants.ContentConstants;
import com.medtronic.com.msm.service.MSMService;
import com.medtronic.com.msm.service.MSMUserService;
import com.medtronic.com.msm.translation.config.LanguageMapping;
import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.jackrabbit.core.fs.FileSystem;
import org.apache.sling.api.resource.ModifiableValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RangeIterator;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Component(label = "MSM Service for Medtronic", description = "Service to provide MSM related actions.", metatype = false, immediate = false)
@Service
public class MSMServiceImpl implements MSMService {

    private static final String TRANSLATED_PAGE_NAME = "translatedPageName";
    private static final String ORIGINAL_PAGE_NAME = "originalPageName";
    private static final String ORIGINAL_PAGE_PATH = "originalPagePath";
    private static final boolean DEEP = true;
    private static final boolean AUTOSAVE = false;

    Logger log = LoggerFactory.getLogger(Page.class);

    @Reference
    LiveRelationshipManager liveRelationshipManager;

    @Reference
    MSMUserService msmUserService;

    @Override
    public Boolean detachLiveRelationship(Page page) {
        if (page == null) {
            return false;
        }

        Resource pageResource = page.getContentResource();
        if (pageResource == null) {
            return false;
        }

        if (liveRelationshipManager.hasLiveRelationship(pageResource)) {
            try {
                liveRelationshipManager.endRelationship(pageResource, AUTOSAVE);
            } catch (WCMException e) {
                log.error("Error trying to endRelationship in detachLiveRelationship in MSMServiceImpl {}", e);
                return false;
            }
        }

        return true;
    }

    @Override
    public Boolean establishLiveRelationship(Page source,
                                             Page target,
                                             boolean deep,
                                             List<RolloutConfig> configs) {
        if (source == null || target == null || configs == null) {
            return false;
        }

        RolloutConfig[] configArray = configs.toArray(new RolloutConfig[configs.size()]);

        try {
            liveRelationshipManager.establishRelationship(source, target, deep, AUTOSAVE, configArray);
        } catch (WCMException e) {
            log.error("Error trying to establish relationship in MSMServiceImpl.establishLiveRelationship {}", e);
            return false;
        }

        return true;
    }

    @Override
    public List<String> getLiveCopies(Page page) {
        List<String> liveCopies = new LinkedList<>();
        RangeIterator relationships = null;
        Resource pageResource = page.adaptTo(Resource.class);
        try {
            relationships = liveRelationshipManager.getLiveRelationships(pageResource, null, null);
        } catch (WCMException e) {
            log.error("Error getting LiveRelationship on resource {} - {}", pageResource, e);
            return null;
        }

        if (relationships == null) {
            return null;
        }

        String PagePath = page.getPath();
        while (relationships.hasNext()) {
            LiveRelationship lr = (LiveRelationship) relationships.next();
            String lrTargetPath = lr.getTargetPath().replaceAll("/jcr:content$", "");
            if (!lrTargetPath.equals(PagePath)) {
                liveCopies.add(lrTargetPath);
            }
        }
        return liveCopies;
    }

    @Override
    public LiveRelationship getLiveRelationship(String sourcePath,
                                                String targetPath,
                                                ResourceResolver resolver) {
        if (resolver == null) {
            log.error("ResourceResolver is null, returning null");
            return null;
        }
        // if there is no target path, we can't get relationship, same if both target and source paths are null
        if (targetPath == null || (targetPath == null && sourcePath == null)) {
            log.error("targetPath is null, returning null");
            return null;
        }

        // resolving source or target, this way we'll can check if they exist or not (null or not)
        Resource target = resolver.getResource(targetPath);
        Resource source = resolver.getResource(sourcePath);

        // if sourcePath is null, get relationship based on target
        if (target != null) {
            try {
                Page pageTarget = target.adaptTo(Page.class);
                Resource targetContent = pageTarget.getContentResource();
                return liveRelationshipManager.getLiveRelationship(targetContent, false);
            } catch (WCMException e) {
                log.error(
                        "Error getting LiveRelationship for resource {} during getSourcePageFromLiveRelationship in MSMServiceImpl {}",
                        target.getPath(), e);
            }
        }
        // if target is null, i.e was not rolled out
        else if (target == null && source != null) {
            RangeIterator relationships = null;
            Page pageSource = source.adaptTo(Page.class);
            if (pageSource == null) {
                log.error("page source is null in MSMServiceImpl.getLiveRelationship()");
                return null;
            }
            Resource sourceContent = pageSource.getContentResource();
            try {
                relationships = liveRelationshipManager.getLiveRelationships(sourceContent, null, null);
            } catch (WCMException e) {
                log.error("Error getting LiveRelationship on resource {} - {}", sourceContent, e);
                return null;
            }
            if (relationships == null) {
                return null;
            }
            while (relationships.hasNext()) {
                LiveRelationship lr = (LiveRelationship) relationships.next();
                String lrTargetPath = lr.getTargetPath().replaceAll("/jcr:content$", "");
                if (lrTargetPath.equals(targetPath)) {
                    return lr;
                }
            }
            return null;
        }
        return null;
    }

    private String getPageProperty(Page page,
                                   String propertyName) {
        if (page == null) {
            return null;
        }

        Resource contentResource = page.getContentResource();
        if (contentResource == null) {
            return null;
        }

        ValueMap map = contentResource.getValueMap();
        if (map == null) {
            return null;
        }

        return map.get(propertyName, String.class);
    }

    @Override
    public List<RolloutConfig> getRolloutConfigsFromTarget(Page page) {
        if (page == null) {
            return null;
        }

        Resource pageResource = page.adaptTo(Resource.class);
        if (pageResource == null) {
            return null;
        }

        LiveRelationship liveRelationship;
        try {
            liveRelationship = liveRelationshipManager.getLiveRelationship(pageResource, false);
        } catch (WCMException e) {
            log.error("Error getting LiveRelationship on resource {} - {}", pageResource, e);
            return null;
        }

        return liveRelationship.getRolloutConfigs();
    }

    @Override
    public Page getSourcePageFromLiveRelationship(Page page) {
        if (page == null) {
            return null;
        }

        Resource pageResource = page.adaptTo(Resource.class);
        if (pageResource == null) {
            return null;
        }

        LiveRelationship liveRelationship = null;
        try {
            liveRelationship = liveRelationshipManager.getLiveRelationship(pageResource, false);
        } catch (WCMException e) {
            log.error(
                    "Error getting LiveRelationship for resource {} during getSourcePageFromLiveRelationship in MSMServiceImpl {}",
                    pageResource.getPath(), e);
        }

        if (liveRelationship == null) {
            return null;
        }

        String sourcePath = liveRelationship.getSourcePath();
        if (StringUtils.isBlank(sourcePath)) {
            return null;
        }

        PageManager pageManager = page.getPageManager();
        if (pageManager == null) {
            return null;
        }

        return pageManager.getPage(sourcePath);
    }

    @Override
    public String getSourcePageName(Page page) {
        return getPageProperty(page, ORIGINAL_PAGE_NAME);
    }

    @Override
    public String getSourcePagePath(Page page) {
        return getPageProperty(page, ORIGINAL_PAGE_PATH);
    }

    @Override
    public String getTranslatedPageName(Page page) {
        return getPageProperty(page, TRANSLATED_PAGE_NAME);
    }

    @Override
    public Page movePage(ResourceResolver resolver,Page page,
                         String newName,
                         Boolean deep) {
        if (page == null || StringUtils.isBlank(newName)) {
            return null;
        }

        PageManager pageManager = page.getPageManager();
        if (pageManager == null) {
            return null;
        }
        newName = JcrUtil.createValidName(newName);
        String originalPath  = page.getPath();
        String newPath = page.getParent().getPath() + FileSystem.SEPARATOR + newName;

        Page newPage = null;
        try {
            // get all references to new page
            ReferenceSearch refSearch = new ReferenceSearch();
            Map<String, Info> refMap = refSearch.search(resolver, originalPath);
            List<String> adjustPathsList = new ArrayList<String>();
            for (Map.Entry<String, Info> entry : refMap.entrySet()){
                Info value = entry.getValue();
                if (value != null){
                    adjustPathsList.add(value.getPage().getPath());
                }
            }
            // arraylist to array
            String[] adjustPaths = new String[adjustPathsList.size()];
            adjustPaths = adjustPathsList.toArray(adjustPaths);
            // move page and adjust all it's references

            newPage = pageManager.move(page, newPath, null, !deep, true, adjustPaths);

        } catch (WCMException e) {
            log.error("Error moving page in MSMServiceImpl.movePage {}", e);
            return null;
        }
        return newPage;
    }

    @Override
    public Page moveToTranslatedURL(Page page, ResourceResolver resolver) {
        if (page == null) {
            return null;
        }

        String translatedPageName = getTranslatedPageName(page);
        // Move page only if translated page name different from source page name, or current page name.
        if (translatedPageName.equals(getSourcePageName(page)) || translatedPageName.equals(page.getName())) {
            return page;
        } else if (StringUtils.isBlank(translatedPageName)) {
            return null;
        }

        Page newPage = movePage(resolver, page, translatedPageName, DEEP);
        if (newPage == null) {
            return null;
        }
        return newPage;
    }

    @Override
    public Boolean persistPageName(Page page) {
        if (page == null) {
            return false;
        }

        Resource contentResource = page.getContentResource();
        if (contentResource == null) {
            return false;
        }

        String name = page.getName();
        if (StringUtils.isBlank(name)) {
            return false;
        }
        ModifiableValueMap map = contentResource.adaptTo(ModifiableValueMap.class);
        if (map == null) {
            return false;
        }
        // Only if original page name does not exists on the page, add it, along with Translated page property.
        if (!map.containsKey(ORIGINAL_PAGE_NAME)) {
            map.put(ORIGINAL_PAGE_NAME, name);
            map.put(TRANSLATED_PAGE_NAME, name);
        }
        // return false because we don't want to override properties
        else {
            return false;
        }

        ResourceResolver resourceResolver = null;
        resourceResolver = contentResource.getResourceResolver();
        if (resourceResolver == null) {
            return false;
        }
        return true;
    }

    // TODO - implement this
    //
    @Override
    public Boolean urlTranslationRequired(Page page) {
        return true;
    }

    @Override
    public LanguageMapping getLanguageMapping() {
        ResourceResolver resourceResolver = msmUserService.getResourceResolver();
        if (resourceResolver == null) {
            return null;
        }

        Resource config = resourceResolver.getResource(ContentConstants.LANGUAGE_CONFIG_PATH);
        if (config == null) {
            return null;
        }

        ValueMap map = config.getValueMap();
        if (map == null) {
            return null;
        }

        String languageConfig = map.get(ContentConstants.PN_LANGUAGE_CONFIG, String.class);
        if (languageConfig == null) {
            return null;
        }

        XmlMapper mapper = new XmlMapper();
        LanguageMapping languageMapping = null;
        try {
            languageMapping = mapper.readValue(languageConfig, LanguageMapping.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return languageMapping;
    }
}
