
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

@Component
@Service
@Properties({ @Property(name = Constants.SERVICE_DESCRIPTION, value = "Process that will be use to Persist Page Name."),
        @Property(name = Constants.SERVICE_VENDOR, value = "Medtronic"),
        @Property(name = "process.label", value = "Medtronic Persist PageName Workflow Process") })
public class PersistPageNameProcess implements WorkflowProcess {

    private final Logger log = LoggerFactory.getLogger(PersistPageNameProcess.class);

    @Reference
    MSMService msmService;

    @Reference
    MSMUserService msmUserService;

    @Override
    public void execute(WorkItem workItem,
                        WorkflowSession workflowSession,
                        MetaDataMap metaDataMap) throws WorkflowException {

        Session session = workflowSession.adaptTo(Session.class);
        try {
            session.refresh(true);
        } catch (RepositoryException e) {
            log.error("Error refreshing session {}", e);
            return;
        }
        ResourceResolver msmResourceResolver = null;
        // Manny null checks to keep it safe, also because not sure of workflow api contracts and guarantees
        try {
            // Get Resource Resolver
            msmResourceResolver = msmUserService.getResourceResolver();
            if (msmResourceResolver == null) {
                log.error("Resource Resolver evaluates to null");
                return;
            }

            // Get Workflow Data
            final WorkflowData workflowData = workItem.getWorkflowData();
            if (workflowData == null) {
                log.error("Error getting workflowData");
                return;
            }

            // Get payload resource
            final String path = workflowData.getPayload().toString();
            Resource payloadResource = msmResourceResolver.getResource(path);
            log.debug("From persist Page Name process : ");
            if (payloadResource == null || !payloadResource.isResourceType(NameConstants.NT_PAGE)) {
                log.error("Error getting payload resource");
                return;
            }

            // adabt payload resource to a page
            Page page = payloadResource.adaptTo(Page.class);
            if (page == null) {
                log.error("Error getting payload page");
                return;
            }

            // persist page name
            Boolean newPage = msmService.persistPageName(page);
            if (newPage == null) {
                log.error("Error in process of persist page name");
                return;
            }

            // commit changes
            try {
                if (msmResourceResolver.isLive()) {
                    msmResourceResolver.commit();
                }
            } catch (PersistenceException e) {
                log.error("Error committing changes to resource resolver", e);
            }
            // If anything bad happens (or not), close resource resolver
        } finally {
            if (msmResourceResolver != null) {
                msmResourceResolver.close();
            }
        }

    }

}
