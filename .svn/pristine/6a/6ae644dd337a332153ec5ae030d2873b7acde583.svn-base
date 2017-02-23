package com.medtronic.com.msm.service.impl;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Session;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.granite.workflow.WorkflowSession;
import com.medtronic.com.msm.service.MSMUserService;

@Component(
        label = "MSM Service for Medtronic",
        description = "Service to provide previlaged system user access",
        metatype = false,
        immediate = false)
@Service
public class MSMUserServiceImpl implements MSMUserService {

	/** Default log. */
	protected final Logger log = LoggerFactory.getLogger(this.getClass());
	
	private final static String MSM_SUBSERVICE_NAME = "MSMSubservice";
	
	private static Map<String, Object> ARGS = null;
  
	// Instance initialization block:
    // Runs before the constructor each time you instantiate an object
	// initializing ARGS map with the subservice
	{
    	try{
	        HashMap<String,Object> tmpMap = new HashMap<String,Object>();
	        tmpMap.put(ResourceResolverFactory.SUBSERVICE,MSM_SUBSERVICE_NAME);
	        ARGS = Collections.unmodifiableMap(tmpMap);
    	}catch(Exception e){
    		// if we get here, then something really bad happend
    		log.error("could not initialize subservice ARGS map",e);
    	}
    }
	
	@Reference
	private ResourceResolverFactory resolverFactory;
	
	@Override
	public ResourceResolver getResourceResolver() {
		
		ResourceResolver resolver = null;
		try {
			// gets a resource resolver with the subservice's user privileges
			// the subservice is defined in the AEM configuration for
			// "Apache Sling Service User Mapper Service", there we map the
			// com.medtronic.com.medtronic-com-services to the default system
			// user we already created.
			resolver = resolverFactory.getServiceResourceResolver(ARGS);
		}catch(LoginException e){
			log.error("Could not get the ResourceResolver from ResolverFactory",e);
			//if exception, resolver will be null
			return resolver;
		}
		//success!
		return resolver;
	}

	
	@Override
	public <C> C getSession(Class<C> c){
		ResourceResolver resolver = getResourceResolver();
		try {
			return resolver.adaptTo(c);
		} catch (Exception e) { // no idea why it would throw an exception, but just to be safe
			log.error("Could not adapt RecourceResolver to "+c.getName(),e);
		}
		// if we get here, return null
		return null;
		
	}
	
	@Override
	public WorkflowSession getWorkflowSession() {
		WorkflowSession session = null;
		ResourceResolver resolver = getResourceResolver();
		try {
			session = resolver.adaptTo(WorkflowSession.class);
		} catch (Exception e) { // no idea why it would throw an exception, but just to be safe
			log.error("Could not adapt RecourceResolver to "+WorkflowSession.class.getName(),e);
			return session;
		}
		return session;
	}

	@Override
	public Session getJcrSession() {
		Session session = null; // jcr session
		ResourceResolver resolver = getResourceResolver();
		try {
			session = resolver.adaptTo(Session.class);
		} catch (Exception e) { // again, no idea why it would throw an exception, but just to be safe
			log.error("Could not adapt RecourceResolver to "+Session.class.getName(),e);
			//if exception, session will be null
			return session;
		}
		return session;
	}

    @Override
    public Authorizable getAuthorizable(String groupId) {
        ResourceResolver msmResourceResolver= null;
        UserManager userManager = null;
        try {
            msmResourceResolver = getResourceResolver();
            userManager = getResourceResolver().adaptTo(UserManager.class);
            Authorizable auth = null;
            try {
                auth = userManager.getAuthorizable(groupId);
            } catch (RepositoryException e) {
                log.error("Error getting authorizable, returning null {}",e);
                return null;
            }
            return auth;
        } finally{
            if(msmResourceResolver != null){
                msmResourceResolver.close();
            }
            
        }
       
    }
	
	
	
	

}
