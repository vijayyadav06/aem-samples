
package com.medtronic.com.msm.workflow;

import java.sql.Timestamp;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Value;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;

import org.apache.commons.lang3.StringUtils;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.framework.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.acs.commons.email.EmailService;
import com.adobe.granite.workflow.WorkflowException;
import com.adobe.granite.workflow.WorkflowSession;
import com.adobe.granite.workflow.exec.HistoryItem;
import com.adobe.granite.workflow.exec.WorkItem;
import com.adobe.granite.workflow.exec.WorkflowData;
import com.adobe.granite.workflow.exec.WorkflowProcess;
import com.adobe.granite.workflow.metadata.MetaDataMap;
import com.adobe.granite.workflow.model.WorkflowNode;
import com.day.cq.commons.Externalizer;
import com.medtronic.com.msm.service.MSMUserService;
import com.medtronic.com.util.MSMConstants;

@Component
@Service
@Properties({
        @Property(name = Constants.SERVICE_DESCRIPTION, value = "Process that will send an email to initiator that workflow has been rejected and reason for it"),
        @Property(name = Constants.SERVICE_VENDOR, value = "Medtronic"),
        @Property(name = "process.label", value = "Medtronic Generic Email Workflow Process") })
public class GenericEmailProcess implements WorkflowProcess {

    private static Logger log = LoggerFactory.getLogger(GenericEmailProcess.class);

    private static final String E_TEMPLATE_PROP_FROM = "from";
    private static final String E_TEMPLATE_PROP_SUBJECT = "subject";
    private static final String E_TEMPLATE_PROP_TIMESTAMP = "timestamp";
    private static final String E_TEMPLATE_PROP_STEPNAME = "stepname";
    private static final String E_TEMPLATE_PROP_USERNAME = "username";
    private static final String E_TEMPLATE_PROP_USERID = "userid";
    private static final String E_TEMPLATE_PROP_WORKFLOW_TITLE = "workflowtitle";
    private static final String E_TEMPLATE_PROP_HOST = "host";
    private static final String E_TEMPLATE_PROP_PAYLOAD = "payload";
    private static final String E_TEMPLATE_PROP_COMMENT = "comment";
    private static final String AUTHORIZABLE_PROP_EMAIL = "./profile/email";
    private static final String AUTHORIZABLE_PROP_FIRSTNAME = "./profile/givenName";
    private static final String AUTHORIZABLE_PROP_LASTNAME = "./profile/familyName";
    private static final String EMAIL_TEMPLATE = "/etc/notification/email/medtronic/genericEmailTemplate.txt";
    private static final String PROP_SEPERATOR = ",";
    private static final String VALUE_SEPERATOR = ":";
    private static final Map<String, String> EMAIL_PARAMS = new HashMap<String, String>();

    @Reference
    EmailService emailService;

    @Reference
    MSMUserService msmUserService;

    @Override
    public void execute(WorkItem workItem,
                        WorkflowSession workflowsession,
                        MetaDataMap metaDataMap) throws WorkflowException {
        // get initiator
        String initiatorId = workItem.getWorkflow().getInitiator();

        // get initiator authorizable object, null if does not exist (might have been deleted after initiating the
        // workflow)
        Authorizable initiator = msmUserService.getAuthorizable(initiatorId);
        if (initiator == null) {
            log.error("initiator of workflow: " + workItem.getWorkflow().toString() + "does not exisit anymore");
            return;
        }
        // get initiator email
        String initiatorEmail = getEmail(initiator);
        if (initiatorEmail == null) {
            log.error("initiator of workflow: " + workItem.getWorkflow().toString()
                    + "does not have a valid email adress");
            return;
        }

        ResourceResolver msmResourceResolver = null;
        try {
            msmResourceResolver = msmUserService.getResourceResolver();
            final WorkflowData workflowData = workItem.getWorkflowData();
            if (workflowData == null) {
                log.error("Error getting workflowData");
                return;
            }

            final String payload = workflowData.getPayload().toString();

            // We get the "from" email and the "subject", and the previous "stepname"
            Map<String, String> emailParams = getEmailParams(metaDataMap);
            // then we get the rest of email params
            emailParams.put(E_TEMPLATE_PROP_PAYLOAD, payload);
            Timestamp timestamp = new Timestamp(System.currentTimeMillis());
            emailParams.put(E_TEMPLATE_PROP_TIMESTAMP, timestamp.toString());
            emailParams.put(E_TEMPLATE_PROP_USERID, initiatorId);
            emailParams.put(E_TEMPLATE_PROP_USERNAME, getName(initiator));
            emailParams.put(E_TEMPLATE_PROP_WORKFLOW_TITLE, workItem.getWorkflow().getWorkflowModel().getTitle());

            Externalizer externalizer = msmResourceResolver.adaptTo(Externalizer.class);
            String host = externalizer.authorLink(msmResourceResolver, "");
            //removing the extra "/"
            host = StringUtils.substringBeforeLast(host, "/");
            emailParams.put(E_TEMPLATE_PROP_HOST, host);

            emailParams.put(E_TEMPLATE_PROP_COMMENT,
                    getPreviousStepComment(workflowsession, workItem));
           
            // TODO - In case msmserviceuser is the initiator, who should get5 the notificaton of workflow rejection?
            
            emailService.sendEmail(EMAIL_TEMPLATE, emailParams, initiatorEmail);

        } finally {
            if(msmResourceResolver != null){
                msmResourceResolver.close();
            }
        }
    }

    private boolean isValidEmailAddress(String email) {
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
     * 
     * @param auth
     * @return
     */
    private String getEmail(Authorizable auth) {
        if (auth == null) {
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

    private String getName(Authorizable auth) {
        if (auth == null) {
            return null;
        }

        String name = null;
        try {
            // TODO - find the constant for this
            if (auth.hasProperty(AUTHORIZABLE_PROP_LASTNAME)) {
                Value[] values = auth.getProperty(AUTHORIZABLE_PROP_LASTNAME);
                for (Value val : values) {
                    if (val != null) {
                        name = val.toString();
                        break;
                    }
                }
            }
            if (auth.hasProperty(AUTHORIZABLE_PROP_FIRSTNAME)) {
                Value[] values = auth.getProperty(AUTHORIZABLE_PROP_FIRSTNAME);
                for (Value val : values) {
                    if (val != null) {
                        name = (name == null) ? val.toString() : val.toString() + name;
                        break;
                    }
                }
            }
            return name;

        } catch (RepositoryException e) {
            log.error("error gettinjg property from authorizable", e);
            return null;
        }
    }

    private Map<String, String> getEmailParams(MetaDataMap metaDataMap) {
        String args = metaDataMap.get(MSMConstants.PROCESS_ARGS, String.class);
        if (args == null) {
            return null;
        }
        Map<String, String> emailParams = new HashMap<String, String>();
        String[] props = args.split(PROP_SEPERATOR);
        for (String prop : props) {
            String key = StringUtils.substringBefore(prop, VALUE_SEPERATOR);
            String value = StringUtils.substringAfter(prop, VALUE_SEPERATOR);
            emailParams.put(key, value);
        }
        return emailParams;
    }

    private String getPreviousStepComment(WorkflowSession workflowsession,
                                          WorkItem workItem) {

        String previousComment = "";
        try {
            List<HistoryItem> historyList = workflowsession.getHistory(workItem.getWorkflow());
            for (int i = historyList.size() - 1; i >= 0; i--) {
                HistoryItem previous = historyList.get(i);
                String type = previous.getWorkItem().getNode().getType();
                if (type != null && (type.equals(WorkflowNode.TYPE_PARTICIPANT)
                        || type.equals(WorkflowNode.TYPE_DYNAMIC_PARTICIPANT))) {
                    String previousAssignee= previous.getWorkItem().getCurrentAssignee();
                    previousAssignee = (previousAssignee==null)? "" : previousAssignee + ": ";
                    previousComment = previous.getWorkItem().getMetaDataMap().get(MSMConstants.WORKFLOW_COMMENT, String.class);
                    previousComment = (previousComment == null)? "" : previousAssignee + previousComment; 
                    break;
                }
            }
            return previousComment;

        } catch (WorkflowException e) {
            log.error("exception getting history",e);
        }
        return null;
    }
}
