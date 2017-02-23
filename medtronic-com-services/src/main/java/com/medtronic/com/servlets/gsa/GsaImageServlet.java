
package com.medtronic.com.servlets.gsa;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLConnection;

import javax.servlet.ServletException;

import org.apache.commons.io.IOUtils;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;

import com.medtronic.com.services.gsa.GsaSearchService;

/**
 * The Class GsaImageServlet.
 */
@SlingServlet(paths = "/bin/medtronic-com/gsaImageServlet", methods = "GET")
public class GsaImageServlet extends SlingSafeMethodsServlet {

    private static final long serialVersionUID = -6824667821949192437L;

    @Reference
    private GsaSearchService gsaSearchService;

    @Override
    protected void doGet(final SlingHttpServletRequest request,
                         final SlingHttpServletResponse response) throws ServletException, IOException {
        final String session = request.getQueryString();
        final URLConnection conn = gsaSearchService.getPreviewImage(session);
        final InputStream inputStream = conn.getInputStream(); 
        final OutputStream outputStream = response.getOutputStream();
        response.setContentType("image/png;charset=ISO-8859-1");
        response.setDateHeader("Expires", conn.getExpiration());
        response.setDateHeader("Last-Modified", conn.getLastModified());
        response.setHeader("Connection", "close");
        IOUtils.copy(inputStream, outputStream);
    }
}
