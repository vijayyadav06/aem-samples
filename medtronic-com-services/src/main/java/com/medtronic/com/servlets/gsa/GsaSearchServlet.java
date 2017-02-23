
package com.medtronic.com.servlets.gsa;

import java.io.IOException;

import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;

import com.medtronic.com.models.search.GsaSearchResults;
import com.medtronic.com.services.gsa.GsaSearchService;
import com.medtronic.com.servlets.gsa.constants.ServletConstants;
import com.medtronic.com.util.JsonUtil;
import com.medtronic.com.util.ServletUtil;

/**
 * The Class GsaSearchServlet.
 */
@SlingServlet(paths = "/bin/medtronic-com/gsaSearchServlet", methods = "GET")
public class GsaSearchServlet extends SlingSafeMethodsServlet {

    private static final long serialVersionUID = 7900484624415671105L;

    @Reference
    private GsaSearchService gsaSearchService;

    @Override
    protected void doGet(final SlingHttpServletRequest request,
                         final SlingHttpServletResponse response) throws IOException {
        final String query = ServletUtil.getParameter(request, ServletConstants.REQUEST_PARAMETER_QUERY);
        final int pageNumber = Integer.parseInt(ServletUtil.getParameter(request, ServletConstants.REQUEST_PARAMETER_PAGE_NUMBER));
        final int resultsRequested = ServletUtil.getParameter(request, ServletConstants.REQUEST_PARAMETER_RESULT_TYPE).equals("list") ? 10 : ServletConstants.TWENTY;
        final String language = ServletUtil.getParameter(request, ServletConstants.REQUEST_PARAMETER_LANGUAGE);
        final String site = ServletUtil.getParameter(request, ServletConstants.REQUEST_PARAMETER_SITE);
        final String client = ServletUtil.getParameter(request, ServletConstants.REQUEST_PARAMETER_CLIENT);
        final String filters = ServletUtil.getParameter(request, ServletConstants.REQUEST_PARAMETER_FILTERS);
        
        final GsaSearchResults results = gsaSearchService.search(query, pageNumber, resultsRequested, language, site, client, filters);
        
        if (results.getPreviewData() != null) {
            results.setPreviewData(results.getPreviewData().replaceAll("resourceURI\":\"/", "resourceURI\":\"/bin/medtronic-com/gsaZoomServlet?"));
        }
        
        final String json = JsonUtil.mapper.writeValueAsString(results);
        
        response.setCharacterEncoding(ServletConstants.CHARACTER_ENCODING_UTF_8);
        response.setContentType(ServletConstants.CONTENT_TYPE_JSON);
        response.getWriter().write(json);
    }
}
