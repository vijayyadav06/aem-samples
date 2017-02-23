
package com.medtronic.com.msm.workflow;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.ParticipantStepChooser;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.medtronic.com.msm.service.MSMUserService;
import com.medtronic.com.util.MSMConstants;

@Component
@Service
@Properties({
        @Property(name = Constants.SERVICE_DESCRIPTION, value = "Process Step that will get the participant based on content path/resource"),
        @Property(name = Constants.SERVICE_VENDOR, value = "Medtronic"),
        @Property(name = "process.label", value = "Medtronic Rollout Participant Step Chooser Workflow Process") })
public class ParticipantStepChooserProcess implements ParticipantStepChooser {

    @Reference
    MSMUserService msmUserService;
    
    private static Logger log = LoggerFactory.getLogger(ParticipantStepChooserProcess.class);

    @Override
    public String getParticipant(WorkItem workItem, WorkflowSession workflowSession, MetaDataMap metaDataMap) throws WorkflowException {
        
        final WorkflowData workflowData = workItem.getWorkflowData();
        
        String action = getAction(metaDataMap);
        if(action == null){
            log.error("There was no argument action entered in the ParticipantStepChooserProcess for workflow titled: {}, returning null", workItem.getWorkflow().getWorkflowModel().getTitle());
            return null;
        }
        
        if (workflowData == null) {
            log.error("Error getting workflowData");
            return null;
        }
        final String path = workflowData.getPayload().toString();
        
        DynamicUserChooser actionChooser = DynamicUserChooser.valueOf(action);//(path,action);
        String group  = null;
        Authorizable authGroup = null;
        if(actionChooser != null){
            group =  actionChooser.getGroupName(path);
            authGroup = msmUserService.getAuthorizable(group);
        }
        if(authGroup == null){
            log.error("cannot find user group: {}", group);
            return null;
        }
        // returning group ID
        return group;
    } 
    
    private String getAction(MetaDataMap metaDataMap) {
        String action = metaDataMap.get(MSMConstants.PROCESS_ARGS, String.class);
        return (action == null)? null : action.toUpperCase();
    }

}
