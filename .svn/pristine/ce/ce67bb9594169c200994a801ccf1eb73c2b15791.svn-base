
package com.medtronic.com.servlets.gsa;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URLConnection;

import org.apache.commons.io.IOUtils;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;

import com.medtronic.com.services.gsa.GsaSearchService;
import com.medtronic.com.servlets.gsa.constants.ServletConstants;

/**
 * The Class GsaZoomServlet.
 */
@SlingServlet(paths = "/bin/medtronic-com/gsaZoomServlet", methods = "GET")
public class GsaZoomServlet extends SlingSafeMethodsServlet {

    private static final long serialVersionUID = -6824667821949192437L;

    @Reference
    private GsaSearchService gsaSearchService;

    @Override
    protected void doGet(final SlingHttpServletRequest request,
                         final SlingHttpServletResponse response) throws IOException {
        final String queryString = request.getQueryString().replace("zoom&", "zoom?");
        final URLConnection conn = gsaSearchService.getZoomJson(queryString);
        final InputStream inputStream = conn.getInputStream();
        final Reader reader = new BufferedReader(new InputStreamReader(inputStream, ServletConstants.CHARACTER_ENCODING_UTF_8));
        final String temp = IOUtils.toString(reader).replace("src=\\\"\\/", "src=\\\"\\/bin\\/medtronic-com\\/gsaImageServlet?");
        response.setCharacterEncoding(ServletConstants.CHARACTER_ENCODING_UTF_8);
        response.setContentType(ServletConstants.CONTENT_TYPE_JSON);
        response.getWriter().write(temp);
    }
}
