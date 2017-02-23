package com.medtronic.com.msm.servlet;

import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.Workflow;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.medtronic.com.constants.ContentConstants;
import com.medtronic.com.msm.service.MSMService;
import com.medtronic.com.msm.service.MSMUserService;
import com.medtronic.com.msm.translation.TranslationProperties;
import com.medtronic.com.msm.translation.config.LanguageMapping;
import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.codehaus.jackson.map.ObjectMapper;

import javax.servlet.ServletException;
import java.io.IOException;

/**
 * Created by anton on 2/16/2016.
 */
@SlingServlet(
        paths = {"/bin/medtronic/translationproperties"},
        methods = {"GET"},
        extensions = {"json"}
)
@Properties(
        {
                @Property(
                        name = "service.pid",
                        value = "com.medtronic.com.msm.servlet.TranslationPropertiesServlet"
                ),
                @Property(
                        name = "service.description",
                        value = "Translation Properties servlet"
                ),
                @Property(
                        name = "service.vendor",
                        value = "Medtronic"
                )
        }
)
public class TranslationPropertiesServlet extends SlingSafeMethodsServlet {

    @Reference
    MSMService msmService;

    @Reference
    MSMUserService msmUserService;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        // expects path to workitem.
        ResourceResolver resourceResolver = msmUserService.getResourceResolver();
        if (resourceResolver == null) {
            return;
        }

        TranslationProperties props = new TranslationProperties();

        String path = request.getParameter("workitem_path");
        if (path == null) {
            return;
        }

        Page payload = getPayload(path, resourceResolver);
        if (payload == null) {
            PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
            if (pageManager != null) {
                payload = pageManager.getPage(path);
            }
        }

        props.setPageTitle(payload.getTitle());
        props.setPagePath(payload.getPath());

        String targetLocale = StringUtils.substringBetween(payload.getPath() + "/", ContentConstants.MEDTRONIC_COM_ROOT + "/", "/");
        LanguageMapping languageMapping = msmService.getLanguageMapping();
        props.setTargetLanguage(languageMapping.getLanguageName(targetLocale));

        Page blueprint = msmService.getSourcePageFromLiveRelationship(payload);
        String sourceLocale = "";
        if (blueprint != null) {
            sourceLocale = StringUtils.substringBetween(blueprint.getPath() + "/", ContentConstants.MEDTRONIC_COM_ROOT + "/", "/");
            props.setSourceLanguage(languageMapping.getLanguageName(sourceLocale));
        }

        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(response.getWriter(), props);

    }

    private Page getPayload(String workItemPath, ResourceResolver resourceResolver) {
        if (resourceResolver == null) {
            return null;
        }

        Resource workItemResource = resourceResolver.getResource(workItemPath);
        if (workItemResource == null) {
            return null;
        }

        WorkItem workItem = workItemResource.adaptTo(WorkItem.class);
        if (workItem == null) {
            return null;
        }

        Workflow wf = workItem.getWorkflow();
        if (wf == null) {
            return null;
        }

        WorkflowData wfData = wf.getWorkflowData();
        if (wfData == null) {
            return null;
        }

        String payloadPath = wfData.getPayload().toString();
        if (payloadPath == null) {
            return null;
        }

        Resource payloadResource = resourceResolver.getResource(payloadPath);
        if (payloadResource == null) {
            return null;
        }

        return payloadResource.adaptTo(Page.class);
    }
}
