package com.medtronic.com.msm.service;

import org.apache.jackrabbit.api.security.user.Authorizable;
import org.apache.sling.api.resource.ResourceResolver;

import com.adobe.granite.workflow.WorkflowSession;

import javax.jcr.Session;

public interface MSMUserService {
	
	/**
	 * Get ResourceResolver for the default system user.
	 * @return
	 */
	public ResourceResolver getResourceResolver();
	
	/**
	 * Will invoke {@link #getResourceResolver()} then adapt the resulted 
	 * ResourceResolver to {@link  com.adobe.granite.workflow.WorkflowSession} and return it.
	 * @return jcr session {@link com.adobe.granite.workflow.WorkflowSession} resulting from
	 * adapting ResourceResolver
	 */
	public WorkflowSession getWorkflowSession();
	
	/**
	 * Will invoke {@link #getResourceResolver()} then adapt the resulted 
	 * ResourceResolver to {@link  javax.jcr.Session} and return it.
	 * @return jcr session {@link javax.jcr.Session} resulting from adapting ResourceResolver
	 */
	public Session getJcrSession();
	
	
	/**
	 * Will invoke {@link #getResourceResolver()} then adapt it to the type c
	 * @param c The type or class you want the ResourceResolver adapted to.
	 * @return c resulting from adapting ResourceResolver.
	 */
	public <C> C getSession(Class<C> c);
	
	
	//terminate workflow if this returns null
	public Authorizable getAuthorizable(String groupId);
}
