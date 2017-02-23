
package com.medtronic.com.msm.workflow;

import org.apache.commons.lang3.StringUtils;
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

import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.msm.api.LiveRelationship;
import com.medtronic.com.msm.service.MSMService;
import com.medtronic.com.msm.service.MSMUserService;
import com.medtronic.com.util.MSMConstants;

@Component
@Service
@Properties({
        @Property(name = Constants.SERVICE_DESCRIPTION, value = "Process that will update the comment for next process"),
        @Property(name = Constants.SERVICE_VENDOR, value = "Medtronic"),
        @Property(name = "process.label", value = "Medtronic Update Comment Workflow Process") })
public class UpdateComment implements WorkflowProcess {
    
    private static final String ARG_COMMENT_SOURCE_PATH = "SOURCE_PATH";
    private static final String ARG_COMMENT_TRANSLATED_URL = "TRANSLATED_URL";
    private static final String PAGE_MOVE_COMMENT = "The translated page name is: ";
    private final Logger log = LoggerFactory.getLogger(UpdateComment.class);
    @Reference
    MSMUserService msmUserService;
    
    @Reference
    MSMService msmService;
    
    @Override
    public void execute(WorkItem workItem,
                        WorkflowSession workflowSession,
                        MetaDataMap metaDataMap) throws WorkflowException {
        
        String action = getAction(metaDataMap);
        ResourceResolver msmResourceResolver = msmUserService.getResourceResolver();
        if(action.equals(ARG_COMMENT_SOURCE_PATH)){
            MetaDataMap wfMetaDataMap = (workItem.getWorkflow() == null) ? null : workItem.getWorkflow().getMetaDataMap();
            if(wfMetaDataMap != null){
            	String source = null;
            	if(wfMetaDataMap.containsKey(MSMConstants.META_DATA_SOURCE_PATH)){
            		source =  wfMetaDataMap.get(MSMConstants.META_DATA_SOURCE_PATH, String.class);
            	}
            	WorkflowData workflowData = workItem.getWorkflowData();
                String target = workflowData.getPayload().toString();
                if(source == null){
                	source = getSourcePagePath(target);
                }
                target = StringUtils.removeStart(target, "/content/medtronic-com/");
                source = (source==null)? null : StringUtils.removeStart(source, "/content/medtronic-com/");
                if(source != null){
                	addComment(workItem, source+" "+'\u2192'+" "+target);
                }
                // we really should't get here unless payload (target) is not a 'target' of a relationship
                else{
                	addComment(workItem, "target: "+target);
                }
                
            }
        }
        else if(action.equals(ARG_COMMENT_TRANSLATED_URL)){
            String translatedPageName = getTranslatedPageName(workItem);
            if(translatedPageName==null){
                log.error("Could not get translated page name");
                return;
            }
            addComment(workItem,PAGE_MOVE_COMMENT + translatedPageName);
        }
    }
    
    private String getAction(MetaDataMap metaDataMap) {
        String tempAction = metaDataMap.get(MSMConstants.PROCESS_ARGS, String.class);
        return (tempAction == null)? null : tempAction.toUpperCase();
    }
    private void addComment(WorkItem workItem, String comment){
        workItem.getMetaDataMap().put(MSMConstants.WORKFLOW_COMMENT, comment);
    }
    
    /**
     * will get the translated page name property on the payload page
     * @param workItem current process workItem
     * @return the translated page name property on the payload page
     */
    private String getTranslatedPageName(WorkItem workItem){
        WorkflowData workflowData = workItem.getWorkflowData();
        String payload = workflowData.getPayload().toString();
        String translatedPageName = "";
        ResourceResolver msmResourceResolver = null;
        try{
            msmResourceResolver = msmUserService.getResourceResolver();
            if(msmResourceResolver==null){
                log.error("Resource Resolver is null in MSMServiceImpl.getTranslatedPageName()");
                return null;
            }
            Resource pageResource = msmResourceResolver.getResource(payload);
            if(pageResource==null){
                log.error("Could not get page resource in MSMServiceImpl.getTranslatedPageName()");
                return null;
            }
            Page payloadPage = pageResource.adaptTo(Page.class);
            if(payloadPage==null){
                log.error("Resource Resolver is null in MSMServiceImpl.getTranslatedPageName()");
                return null;
            }
            translatedPageName = msmService.getTranslatedPageName(payloadPage);
            return translatedPageName;
        }finally{
            if(msmResourceResolver != null){
                msmResourceResolver.close();
            }
        } 
    }
    private String getSourcePagePath(String targetPath){
    	ResourceResolver msmResourceResolver = null;
        try{
            msmResourceResolver = msmUserService.getResourceResolver();
            if(msmResourceResolver==null){
                log.error("Resource Resolver is null in MSMServiceImpl.getSourcePagePath()");
                return null;
            }
            LiveRelationship lr = msmService.getLiveRelationship(null, targetPath, msmResourceResolver);
            if(lr != null){
            	return lr.getSourcePath();
            }
            else{
            	return null;
            }
        }finally{
            if(msmResourceResolver != null){
                msmResourceResolver.close();
            }
        } 
    }
}
