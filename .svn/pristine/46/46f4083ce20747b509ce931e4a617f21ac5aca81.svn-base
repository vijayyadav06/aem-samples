
package com.medtronic.com.services.gsa;

import java.io.IOException;
import java.net.URLConnection;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.medtronic.com.models.search.GsaPredictiveAndSuggestiveResults;
import com.medtronic.com.models.search.GsaSearchResults;

/**
 * The Interface GsaSearchService.
 */
public interface GsaSearchService {

    /**
     * Convert gsa search result xml to a GsaSearchResults object.
     *
     * @param xml
     *            the gsa search results xml string
     * @return the GsaSearchResults object
     * @throws JsonParseException
     *             the json parse exception
     * @throws JsonMappingException
     *             the json mapping exception
     * @throws IOException
     *             Signals that an I/O exception has occurred.
     */
    GsaSearchResults convertXmlToGsaSearchResults(String xml) throws JsonParseException, JsonMappingException,
                                                             IOException;

    /**
     * Search for gsa search results.
     *
     * @param query            the queried search term
     * @param pageNumber            the page number of the results
     * @param resultsRequested            the number of results requested
     * @param language            the language of the browser page
     * @param site the site
     * @param client the client
     * @param filters the filters
     * @return the GsaSearchResults object
     * @throws IOException             Signals that an I/O exception has occurred.
     */
    GsaSearchResults search(String query,
                            int pageNumber,
                            int resultsRequested,
                            String language,
                            String site,
                            String client,
                            String filters) throws IOException;

    /**
     * Gets the preview image url connection.
     *
     * @param session
     *            the session query string
     * @return the preview image url connection
     * @throws IOException
     *             Signals that an I/O exception has occurred.
     */
    URLConnection getPreviewImage(String session) throws IOException;

    /**
     * Gets the zoom json url connection.
     *
     * @param queryString
     *            the query string
     * @return the zoom json url connection
     * @throws IOException
     *             Signals that an I/O exception has occurred.
     */
    URLConnection getZoomJson(String queryString) throws IOException;

    /**
     * Gets the predictive and suggestive search results.
     *
     * @param query            the queried search term
     * @param language            the language of the browser
     * @param site the site
     * @param client the client
     * @return the predictive suggestive search object
     * @throws IOException             Signals that an I/O exception has occurred.
     */
    GsaPredictiveAndSuggestiveResults getPredictiveSuggestiveSearches(String query,
                                             String language,
                                             String site,
                                             String client) throws IOException;

}
