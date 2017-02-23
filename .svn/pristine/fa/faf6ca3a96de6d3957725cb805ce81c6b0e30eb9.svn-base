package com.medtronic.com.msm.workflow;

import com.adobe.granite.workflow.PayloadMap;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.adobe.granite.workflow.model.WorkflowModel;
import com.day.cq.wcm.api.NameConstants;
import com.day.cq.wcm.api.Page;
import com.medtronic.com.msm.service.MSMUserService;
import com.medtronic.com.util.MSMConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.*;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by anton on 1/6/2016.
 */
@Component
@Service
@Properties({
        @Property(name = Constants.SERVICE_DESCRIPTION, value = "Process that will start a workflow on the current payload."),
        @Property(name = Constants.SERVICE_VENDOR, value = "Medtronic"),
        @Property(name = "process.label", value = "Medtronic Start Workflow Process")})
public class StartWorkflowProcess implements WorkflowProcess {

    private final Logger log = LoggerFactory.getLogger(MoveLiveCopyProcess.class);

    @Reference
    MSMUserService msmUserService;

    @Override
    public void execute(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) throws WorkflowException {

        // Get session, and refresh it
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
            msmResourceResolver =  msmUserService.getResourceResolver();
            if (msmResourceResolver == null) return;

            // Get Workflow Data
            final WorkflowData workflowData = workItem.getWorkflowData();
            if (workflowData == null) {
                log.error("Error getting workflowData");
                return;
            }

            // Get Payload Resource
            final String path = workflowData.getPayload().toString();
            Resource payloadResource = msmResourceResolver.getResource(path);
            if (payloadResource == null || !payloadResource.isResourceType(NameConstants.NT_PAGE)) {
                log.error("Error getting payload resource");
                return;
            }

            // Adapt Payload Resource to a Page
            Page page = payloadResource.adaptTo(Page.class);
            if (page == null) {
                log.error("Error getting payload page");
                return;
            }


            WorkflowSession wfSession = msmResourceResolver.adaptTo(WorkflowSession.class);
            if(wfSession == null){
                log.error("Error adapting msmResourceResolver to a WorkflowSession in {}", this.getClass().getName());
            }

            // Create metadata map that has payload.
            Map<String, Object>  wfMetaData= new HashMap<String,Object>();
            String wfModelPath = metaDataMap.get(MSMConstants.PROCESS_ARGS, String.class);
            if (StringUtils.isNotBlank(wfModelPath)) {
                WorkflowModel wfModel = wfSession.getModel(wfModelPath);

                WorkflowData wfData = wfSession.newWorkflowData(PayloadMap.TYPE_JCR_PATH, page.getPath());
                wfSession.startWorkflow(wfModel, wfData, wfMetaData);
            }

            // If anything bad happens (or not), close resource resolver
        } finally {
            if(msmResourceResolver != null){
                msmResourceResolver.close();
            }
        }
    }
}