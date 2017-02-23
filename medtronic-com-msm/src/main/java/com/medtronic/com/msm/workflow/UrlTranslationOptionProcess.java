package com.medtronic.com.msm.workflow;

import java.util.List;

import com.medtronic.com.util.MSMConstants;
import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.wcm.api.Page;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.Route;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.medtronic.com.msm.service.MSMUserService;

@Component
@Service
@Properties({
        @Property(name = Constants.SERVICE_DESCRIPTION, value = "Process that will get the site configuration option for URL translation"),
        @Property(name = Constants.SERVICE_VENDOR, value = "Medtronic"),
        @Property(name = "process.label", value = "Medtronic URL Translation Option Process") })
public class UrlTranslationOptionProcess implements WorkflowProcess {

    private static final int TRANSLATE = 0;
    private static final int DO_NOT_TRANSLATE = 1;
    private static final int USER_CHOOSE = 2;

    private final Logger log = LoggerFactory.getLogger(UrlTranslationOptionProcess.class);
    
    @Reference
    MSMUserService msmUserService; 
    @Override
    public void execute(WorkItem workItem,
                        WorkflowSession workflowSession,
                        MetaDataMap args) throws WorkflowException {
        
        
        List<Route> routes = workflowSession.getRoutes(workItem, true);
        // if there are less than 3 routes, something is wrong
        if(routes.size()<3){
            log.error("The step UrlTranslationOptionProcess is in the wrong place, there needs to be atleast 3 routes under it");
            return;
        }
        WorkflowData workflowData = workItem.getWorkflowData();
        String payload = workflowData.getPayload().toString();
        String rootPageName = StringUtils.substringBetween(payload, MSMConstants.CONTENT_BASE_PATH, "/");
        String rootPagePath = MSMConstants.CONTENT_BASE_PATH + rootPageName;
        ResourceResolver msmResourceResolver=null;
        
        try{
            msmResourceResolver = msmUserService.getResourceResolver();
            Resource rootPageResource = msmResourceResolver.getResource(rootPagePath);
            Page rootPage = rootPageResource.adaptTo(Page.class);
            Resource pageContent = rootPage.getContentResource();
            ValueMap props = pageContent.getValueMap();
            int routeToTake = 0;
            if(props.containsKey(MSMConstants.PROP_TRANSLATE_URL)){
                String translateUrlProp = props.get(MSMConstants.PROP_TRANSLATE_URL, String.class);
                if(translateUrlProp == null || translateUrlProp.equals(MSMConstants.USER_CHOOSE_VALUE)){
                    routeToTake = USER_CHOOSE;
                }
                else{
                    routeToTake = (translateUrlProp.equals(MSMConstants.TRANSLATE_URL_VALUE))? TRANSLATE : DO_NOT_TRANSLATE;
                }
            }
            else{
                routeToTake = USER_CHOOSE;
            }
            
            workflowSession.complete(workItem, routes.get(routeToTake));
        }catch(WorkflowException e){
            log.error("exception in workflow {} {}", workItem.getWorkflow(), e);
        }
        finally{
            if(msmResourceResolver !=null){
                msmResourceResolver.close();
            }
        }
    }

}
