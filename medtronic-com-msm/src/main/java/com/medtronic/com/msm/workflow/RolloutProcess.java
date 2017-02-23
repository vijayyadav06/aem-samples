
package com.medtronic.com.msm.workflow;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.jackrabbit.JcrConstants;
import org.apache.sling.api.resource.PersistenceException;
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
import com.day.cq.wcm.api.WCMException;
import com.day.cq.wcm.msm.api.LiveRelationship;
import com.day.cq.wcm.msm.api.RolloutManager;
import com.medtronic.com.msm.service.MSMService;
import com.medtronic.com.msm.service.MSMUserService;
import com.medtronic.com.util.MSMConstants;

/**
 * Created by anton on 1/6/2016.
 */
@Component
@Service
@Properties({ @Property(name = Constants.SERVICE_DESCRIPTION, value = "Process that will start a Rollout workflow."),
        @Property(name = Constants.SERVICE_VENDOR, value = "Medtronic"),
        @Property(name = "process.label", value = "Medtronic Start Rollout Workflow Process") })
public class RolloutProcess implements WorkflowProcess {

    private static final String TRANSLATE_MODEL = "/etc/workflow/models/medtronic-com/mdt-content-translation/jcr:content/model";
    
    @Reference
    MSMUserService msmUserService;

    @Reference
    MSMService msmService;

    @Reference
    RolloutManager rolloutManager;

    private final Logger log = LoggerFactory.getLogger(RolloutProcess.class);

    @Override
    public void execute(WorkItem workItem,
                        WorkflowSession workflowSession,
                        MetaDataMap metaDataMap) throws WorkflowException {

        WorkflowData workflowData = workItem.getWorkflowData();
        String target = workflowData.getPayload().toString();
        ResourceResolver msmResourceResolver = null;
        try {

            msmResourceResolver = msmUserService.getResourceResolver();
            if(msmResourceResolver == null){
                log.error("Resource Resolver is null in RolloutProcess.execute()");
                return;
            }
            MetaDataMap wfMetaDataMap = (workItem.getWorkflow() == null) ? null
                    : workItem.getWorkflow().getMetaDataMap();
            if (wfMetaDataMap == null) {
                // TODO - notify initiator then terminate wf instead of returning
                msmResourceResolver.close();
                return;
            }
            
            // if source is in the workflow metadata, get it, if not then set to null
            String source = (wfMetaDataMap.containsKey(MSMConstants.META_DATA_SOURCE_PATH))
                    ? wfMetaDataMap.get(MSMConstants.META_DATA_SOURCE_PATH, String.class) : null;
                    
            // this method accepts null for source as it can get LR just by target
            // since target is always the payload, it'll never be null (hopefully)
            LiveRelationship lr = msmService.getLiveRelationship(source, target,msmResourceResolver);
            if (lr == null) {
                log.error("no live relationship for target {}",target);
                msmResourceResolver.close();
                return;
            }
            try {
                rolloutManager.rollout(msmResourceResolver, lr, false);
            } catch (WCMException e) {
                log.error("ERROR ROLLING OUT!", e);
            }
            try {
                if(msmResourceResolver.isLive()){
                    msmResourceResolver.commit();
                }
            } catch (PersistenceException e) {
                log.error("Error committing changes to resource resolver", e);
            }
            msmResourceResolver = msmUserService.getResourceResolver();
            WorkflowSession wfSession = msmResourceResolver.adaptTo(WorkflowSession.class);
            if(wfSession == null){
                log.error("Error adapting msmResourceResolver to a WorkflowSession in {}", this.getClass().getName());
                return;
            }
            
            // Get the workflow model
            WorkflowModel wfModel = wfSession.getModel(TRANSLATE_MODEL);
            // Get the workflow data
            // The first param in the newWorkflowData method is the payloadType. Just a fancy name to let it know what
            // type of workflow it is working with.
            WorkflowData wfData = wfSession.newWorkflowData(PayloadMap.TYPE_JCR_PATH,
                    workItem.getWorkflowData().getPayload().toString());
            
         // Invoke the Workflow - leave commented for now for testing purposes
            wfSession.startWorkflow(wfModel, wfData);

           
        } finally {
            if (msmResourceResolver != null) {
                msmResourceResolver.close();
            }

        }
    }
}
