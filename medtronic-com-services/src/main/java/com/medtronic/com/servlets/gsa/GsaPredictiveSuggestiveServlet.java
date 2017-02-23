
package com.medtronic.com.servlets.gsa;

import java.io.IOException;

import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.medtronic.com.models.search.GsaPredictiveAndSuggestiveResults;
import com.medtronic.com.services.gsa.GsaSearchService;
import com.medtronic.com.servlets.gsa.constants.ServletConstants;
import com.medtronic.com.util.JsonUtil;
import com.medtronic.com.util.ServletUtil;

/**
 * The Class GsaPredictiveSuggestiveServlet.
 */
@SlingServlet(paths = "/bin/medtronic-com/gsaPredictiveSuggestiveServlet", methods = "GET")
public class GsaPredictiveSuggestiveServlet extends SlingSafeMethodsServlet {

    private static final long serialVersionUID = 7900484624415671105L;

    private static final Logger LOG = LoggerFactory.getLogger(GsaPredictiveSuggestiveServlet.class);

    @Reference
    private GsaSearchService gsaSearchService;

    @Activate
    protected void activate(final ComponentContext context) {
        LOG.debug("GSA P/S Service Activated: " + context);
    }

    @Override
    protected void doGet(final SlingHttpServletRequest request,
                         final SlingHttpServletResponse response) throws IOException {
        final String query = ServletUtil.getParameter(request, ServletConstants.REQUEST_PARAMETER_QUERY);
        final String language = ServletUtil.getParameter(request, ServletConstants.REQUEST_PARAMETER_LANGUAGE);
        final String site = ServletUtil.getParameter(request, ServletConstants.REQUEST_PARAMETER_SITE);
        final String client = ServletUtil.getParameter(request, ServletConstants.REQUEST_PARAMETER_CLIENT);

        LOG.debug("query: {}, language: {}", query, language);

        final GsaPredictiveAndSuggestiveResults predictiveSuggestiveResult = gsaSearchService.getPredictiveSuggestiveSearches(query, language, site, client);

        response.setCharacterEncoding(ServletConstants.CHARACTER_ENCODING_UTF_8);
        response.setContentType(ServletConstants.CONTENT_TYPE_JSON);

        JsonUtil.mapper.writeValue(response.getOutputStream(), predictiveSuggestiveResult);
    }
}
