
package com.medtronic.com.msm.workflow;

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
import com.medtronic.com.util.MSMConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.*;
import org.apache.sling.api.resource.*;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

@Component
@Service
@Properties({ @Property(name = Constants.SERVICE_DESCRIPTION, value = "Process that will be used to persist User's URL Translation selection."),
        @Property(name = Constants.SERVICE_VENDOR, value = "Medtronic"),
        @Property(name = "process.label", value = "Medtronic Persist URL Translation Selection Workflow Process") })
public class PersistURLTranslationSelectionProcess implements WorkflowProcess {

    private final Logger log = LoggerFactory.getLogger(PersistURLTranslationSelectionProcess.class);

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
        // Many null checks to keep it safe, also because not sure of workflow api contracts and guarantees
        try {
            // Get Resource Resolver
            msmResourceResolver = msmUserService.getResourceResolver();
            if (msmResourceResolver == null) {
                log.error("Resource Resolver evaluates to null");
                return;
            }

            WorkflowData workflowData = workItem.getWorkflowData();
            if (workflowData == null) {
                return;
            }
            String payload = workflowData.getPayload().toString();
            if (payload == null) {
                return;
            }
            String rootPageName = StringUtils.substringBetween(payload, MSMConstants.CONTENT_BASE_PATH, "/");
            if (rootPageName == null) {
                return;
            }
            String rootPagePath = MSMConstants.CONTENT_BASE_PATH + rootPageName;

            Resource rootPageResource = msmResourceResolver.getResource(rootPagePath);
            if (rootPageResource == null) {
                return;
            }
            Page rootPage = rootPageResource.adaptTo(Page.class);
            if (rootPage == null) {
                return;
            }
            Resource pageContent = rootPage.getContentResource();
            if (pageContent == null) {
                return;
            }
            ValueMap props = pageContent.adaptTo(ModifiableValueMap.class);
            if (props == null) {
                return;
            }

            String choice = metaDataMap.get(MSMConstants.PROCESS_ARGS, String.class);
            props.put(MSMConstants.PROP_TRANSLATE_URL, choice);

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
