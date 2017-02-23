package com.medtronic.com.msm.workflow;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

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
import com.medtronic.com.msm.service.MSMService;
import com.medtronic.com.msm.service.MSMUserService;
import com.medtronic.com.util.MSMConstants;

/**
 * Created by anton on 1/6/2016.
 */
@Component
@Service
@Properties({
    @Property(name = Constants.SERVICE_DESCRIPTION, value = "Process that will start a workflow for all Live Copies of page."),
    @Property(name = Constants.SERVICE_VENDOR, value = "Medtronic"),
    @Property(name = "process.label", value = "Medtronic Start Workflow Live Copies Process")})
public class StartWorkflowLiveCopiesProcess implements WorkflowProcess {

    private final Logger log = LoggerFactory.getLogger(MoveLiveCopyProcess.class);
    private static final String MODEL_ROLLOUT = "/etc/workflow/models/medtronic-com/mdt-content-rollout/jcr:content/model";
   
    @Reference
    MSMService msmService;
    
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

            // Adabt Payload Resource to a Page 
            Page page = payloadResource.adaptTo(Page.class);
            if (page == null) {
                log.error("Error getting payload page");
                return;
            }
            
            // get liveCopies of payloadPage. If none, terminate workflow and notify initiator 
            List<String> lcPaths = msmService.getLiveCopies(page);
            if (lcPaths == null || lcPaths.isEmpty()) {
                log.error("Error getting Live Copy paths, terminating workflow..");
                // TODO -  notify initiator that the payload for this workflow has no live copies/ relationships.
                try {
                    workflowSession.terminateWorkflow(workItem.getWorkflow());
                } catch (WorkflowException e) {
                    log.error("There was a problem terminating the workflow",e);
                }
                return;
            }
            
            // Create metadata map that has paylod. This will be used all rollout workflows we will kickoff 
            Map<String, Object>  wfMetaData= new HashMap<String,Object>();
            wfMetaData.put(MSMConstants.META_DATA_SOURCE_PATH, path);
            wfMetaData.put(MSMConstants.META_DATA_AUTORING_INITIAL_INITIATOR, workItem.getWorkflow().getInitiator());
            
            WorkflowSession wfSession = msmResourceResolver.adaptTo(WorkflowSession.class);
            if(wfSession == null){
                log.error("Error adapting msmResourceResolver to a WorkflowSession in {}", this.getClass().getName());
            }
            if(wfSession == null){
                log.error("workflow session is null in: "+StartWorkflowLiveCopiesProcess.class.getCanonicalName());
                return;
            }
            WorkflowModel wfModel = wfSession.getModel(MODEL_ROLLOUT);
            
            // For each liveCopy path (of payload), dynamically check if the group that will rollout the live copy exists.
            // If it does, then kickoff a rollout workflow with the payload as the respective liveCopy
            // if it does not, notify initiator.
            for (String lcPath : lcPaths) {                        
                WorkflowData wfData = wfSession.newWorkflowData(PayloadMap.TYPE_JCR_PATH, lcPath);
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
