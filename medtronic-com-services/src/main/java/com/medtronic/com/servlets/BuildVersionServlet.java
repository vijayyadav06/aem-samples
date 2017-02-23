/**
 * This servlet returns the search results for the user entered text by internally invoking SearchResultsHelper to get
 * the results, form the JSON response and return it.
 */

package com.medtronic.com.servlets;

import org.apache.felix.scr.annotations.*;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.framework.Bundle;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;

import java.io.IOException;
import java.io.PrintWriter;
import java.rmi.ServerException;
import java.util.Date;

/**
 * @author spogul
 */
@SlingServlet(paths = BuildVersionServlet.SERVLET_PATH, methods = "POST")
@Properties({ @Property(name = "component.name", value = "Medtronic Build Version Servlet"),
        @Property(name = "sling.auth.requirements", value = "-" + BuildVersionServlet.SERVLET_PATH) })
public class BuildVersionServlet extends SlingAllMethodsServlet {

    /**
     * Variable Declaration
     */
    public static final String SERVLET_PATH = "/bin/medtronic-com/buildVersion";
    private static final Logger log = LoggerFactory.getLogger(BuildVersionServlet.class);
    // Values below will be updated in activate method
    private String buildDate = "unknown";
    private String version = "1.0.0-SNAPSHOT";

    @Override
    protected void doGet(SlingHttpServletRequest request,
                         SlingHttpServletResponse response) throws ServletException, ServerException, IOException {
        this.doPost(request, response);
    }

    @Override
    protected void doPost(SlingHttpServletRequest request,
                          SlingHttpServletResponse response) throws ServerException, IOException {

        response.setContentType("application/javascript");
        PrintWriter out = response.getWriter();
        out.println("serverVersion({\"server\": \"" + request.getParameter("server") + "\", \"version\": \"" + version
                + "\", \"installed\": \"" + buildDate + "\"})");

    }

    @Activate
    void activate(ComponentContext ctx) {
        Bundle bnd = ctx.getUsingBundle();

        buildDate = new Date(bnd.getLastModified()).toString();
        version = bnd.getVersion().toString();
    }

    @Modified
    void modified(ComponentContext ctx) {
        Bundle bnd = ctx.getUsingBundle();

        buildDate = new Date(bnd.getLastModified()).toString();
        version = bnd.getVersion().toString();
    }

}
