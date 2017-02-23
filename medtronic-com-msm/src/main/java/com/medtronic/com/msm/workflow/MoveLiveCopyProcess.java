package com.medtronic.com.msm.workflow;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.PersistenceException;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;
import com.medtronic.com.msm.service.MSMService;
import com.medtronic.com.msm.service.MSMUserService;

/**
 * Created by anton on 12/21/2015.
 */
@Component
@Service
@Properties({
    @Property(name = Constants.SERVICE_DESCRIPTION, value = "Process that will move a LiveCopy page and keep inheritance."),
    @Property(name = Constants.SERVICE_VENDOR, value = "Medtronic"),
    @Property(name = "process.label", value = "Medtronic Move LiveCopy Workflow Process")})
public class MoveLiveCopyProcess implements WorkflowProcess {

    private final Logger log = LoggerFactory.getLogger(MoveLiveCopyProcess.class);

    @Reference
    MSMService msmService;

    @Reference
    MSMUserService msmUserService;

    @Override
    public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) throws WorkflowException {

        Session session = workflowSession.adaptTo(Session.class);
        try {
            session.refresh(true);
        } catch (RepositoryException e) {
            log.error("Error refreshing session", e);
            return;
        }

        ResourceResolver resourceResolver =  msmUserService.getResourceResolver();
        //if resourceResolver is null, we cannot continue
        if (resourceResolver == null) return;

        final WorkflowData workflowData = workItem.getWorkflowData();
        if (workflowData == null) {
            log.error("Error getting workflowData");
            return;
        }

        final String path = workflowData.getPayload().toString();
        Resource payloadResource = resourceResolver.getResource(path);
        if (payloadResource == null || !payloadResource.isResourceType(NameConstants.NT_PAGE)) {
            log.error("Error getting payload resource");
            return;
        }

        Page page = payloadResource.adaptTo(Page.class);
        if (page == null) {
            log.error("Error getting payload page");
            return;
        }

        Page newPage = msmService.moveToTranslatedURL(page,resourceResolver);
        if (newPage == null) {
            log.error("Error moving page to translated URL");
            return;
        }

        try {
            resourceResolver.commit();
        } catch (PersistenceException e) {
            log.error("Error committing changes to resource resolver {}", e);
        }
    }
    
   
}
