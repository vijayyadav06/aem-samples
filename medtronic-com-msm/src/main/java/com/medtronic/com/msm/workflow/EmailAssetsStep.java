
package com.medtronic.com.msm.workflow;

import java.util.HashMap;
import java.util.Map;

import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Value;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.jackrabbit.JcrConstants;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.acs.commons.email.EmailService;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.DamConstants;
import com.day.cq.dam.commons.util.AssetReferenceSearch;
import com.medtronic.com.msm.service.MSMUserService;

@Component
@Service
@Properties({
        @Property(name = Constants.SERVICE_DESCRIPTION, value = "Process that will email a list of assets in payload to workflow intiator"),
        @Property(name = Constants.SERVICE_VENDOR, value = "Medtronic"),
        @Property(name = "process.label", value = "Medtronic Email Assets Workflow Process") })
public class EmailAssetsStep implements WorkflowProcess {

    private final Logger log = LoggerFactory.getLogger(EmailAssetsStep.class);
    private final String AUTHORIZABLE_PROP_EMAIL = "./profile/email";
    private final String EMAIL_TEMPLATE_ASSETS= "/etc/notification/email/medtronic/AssetEmailTemplate.html";
    private final String EMAIL_TEMPLATE_NO_ASSETS =  "/etc/notification/email/medtronic/NoAssetEmailTemplate.html";
    private final String NEW_LINE = "\r\n";

    @Reference
    EmailService emailService;

    @Reference
    MSMUserService msmUserService;

    @Override
    public void execute(WorkItem workItem,
                        WorkflowSession session,
                        MetaDataMap args) throws WorkflowException {

        //get initiator
        String initiatorId = workItem.getWorkflow().getInitiator();
        
        // get initiator authorizable object, null if does not exist (might have been deleted after initiating the workflow)
        Authorizable initiator = msmUserService.getAuthorizable(initiatorId);
        if(initiator == null){
            log.error("initiator of workflow: "+workItem.getWorkflow().toString()+ "does not exisit anymore");
            return;
        }
        // get initiator email
        String initiatorEmail = getEmail(initiator);
        if (initiatorEmail == null){
            log.error("initiator of workflow: "+workItem.getWorkflow().toString()+ "does not have a valid email adress");
            return;
        }
        
        ResourceResolver msmResourceResolver=null;
        try{
            msmResourceResolver = msmUserService.getResourceResolver();
            final WorkflowData workflowData = workItem.getWorkflowData();
            if (workflowData == null) {
                log.error("Error getting workflowData");
                return;
            }

            final String payload = workflowData.getPayload().toString();

            Map<String, Asset> allref = getReferencesInPage(payload, msmResourceResolver);
            Map<String, String> emailParams = new HashMap<String, String>();
            emailParams.put("payload", payload);
            
            // if there are no assets, email initiator
            if(allref == null || allref.isEmpty()){
                emailService.sendEmail(EMAIL_TEMPLATE_NO_ASSETS, emailParams, initiatorEmail);
                return;
            }
            else{
                String assets="";
                for (Map.Entry<String, Asset> entry : allref.entrySet()) {
                    assets=assets + NEW_LINE + entry.getValue().getPath();
                }
                emailParams.put("assets", assets);
                emailService.sendEmail(EMAIL_TEMPLATE_ASSETS, emailParams, initiatorEmail);
            }
        }finally{
            if(msmResourceResolver != null){
                msmResourceResolver.close();
            }
        }
    }

    private Map<String, Asset> getReferencesInPage(final String pagePath,
                                                   ResourceResolver resourceResolver) {
        if(resourceResolver== null){
            log.error("Resource Resolver is null in EmailAssetStep.grtReferences()");
            return null;
        }
        if(pagePath== null){
            log.error("pagePath is null in EmailAssetStep.grtReferences()");
            return null;
        }
        
        log.info("Assets references to be retrieved for page {} ", pagePath);
        Resource resource = resourceResolver.getResource(pagePath + "/" + JcrConstants.JCR_CONTENT);
        if(resource == null){
            return null;
        }
        Node pageNode = resource.adaptTo(Node.class);
        if(pageNode == null){
            return null;
        }
        AssetReferenceSearch referenceSearch = new AssetReferenceSearch(pageNode, DamConstants.MOUNTPOINT_ASSETS,
                resourceResolver);
        Map<String, Asset> ref = referenceSearch.search();
        if (ref.size() > 0) {
            return referenceSearch.search();
        } else{
            return null;
        }
    }

    private  boolean isValidEmailAddress(String email) {
        boolean result = true;
        try {
            InternetAddress emailAddr = new InternetAddress(email);
            emailAddr.validate();
        } catch (AddressException ex) {
            result = false;
        }
        return result;
    }

    /**
     * returns authorizable's email, or null if authorizable is null
     * @param auth
     * @return
     */
    private String getEmail(Authorizable auth) {
        if(auth == null){
            return null;
        }
        
        String email = null;
        try {
            // TODO - find the constant for this
            if (auth.hasProperty(AUTHORIZABLE_PROP_EMAIL)) {
                Value[] values = auth.getProperty(AUTHORIZABLE_PROP_EMAIL);
                for (Value val : values) {
                    if (val != null && isValidEmailAddress(val.toString())) {
                        email = val.toString();
                        break;
                    }
                }
            }
            return email;

        } catch (RepositoryException e) {
            log.error("error gettinjg property from authorizable", e);
            return null;
        }
    }
}
