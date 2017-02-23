
package com.medtronic.com.services.gsa.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Dictionary;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.io.IOUtils;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Modified;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.osgi.framework.Constants;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;
import com.medtronic.com.models.search.GsaFilter;
import com.medtronic.com.models.search.GsaKeyMatches;
import com.medtronic.com.models.search.GsaParameter;
import com.medtronic.com.models.search.GsaPredictive;
import com.medtronic.com.models.search.GsaPredictiveAndSuggestiveResults;
import com.medtronic.com.models.search.GsaResult;
import com.medtronic.com.models.search.GsaSearchResults;
import com.medtronic.com.services.gsa.GsaSearchService;
import com.medtronic.com.services.gsa.constants.ServiceConstants;

/**
 * The Class GsaSearchServiceImpl.
 */
@Component(metatype = true, label = "Medtronic.com -  GSA Search  Service ", immediate = true)
@Service
@Properties({ @Property(name = Constants.SERVICE_DESCRIPTION, value = "Medtronic - GSA Search Service"),
        @Property(name = Constants.SERVICE_VENDOR, value = "Medtronic"),
        @Property(name = Constants.SERVICE_RANKING, intValue = 100) })
public class GsaSearchServiceImpl implements GsaSearchService {

    /** The Constant LOG. */
    private static final Logger LOG = LoggerFactory.getLogger(GsaSearchServiceImpl.class);

    /** The gsa search url. */
    // GSA Urls
    private String gsaSearchUrl;

    /** The gsa predictive url. */
    private String gsaPredictiveUrl;

    /** The gsa zoom url. */
    private String gsaZoomUrl;

    /** The gsa preview url. */
    private String gsaPreviewUrl;

    /** The Constant GSA_CONNECT_SERVICE_URL_DEFAULT. */
    // Defaults for OSGi Configured Variables
    private static final String GSA_CONNECT_SERVICE_URL_DEFAULT = ServiceConstants.GSA_URL_HOST;

    /** The Constant READ_TIMEOUT_DEFAULT. */
    private static final int READ_TIMEOUT_DEFAULT = 7000;

    /** The Constant CONNECTION_TIMEOUT_DEFAULT. */
    private static final int CONNECTION_TIMEOUT_DEFAULT = 7000;

    /** The gsa host url. */
    // Variables the OSGi Configurations are stored in
    private String gsaHostUrl;

    /** The connection timeout. */
    private int connectionTimeout;

    /** The read timeout. */
    private int readTimeout;

    /** The Constant GSA_CONNECT_SERVICE_URL. */
    // OSGi Properties and their defaults
    @Property(label = "Gsa Host URL", value = GSA_CONNECT_SERVICE_URL_DEFAULT, description = "URL to get GSA Host connect details.")
    public static final String GSA_CONNECT_SERVICE_URL = "gsaHostUrl";

    /** The Constant CONNECTION_TIMEOUT. */
    @Property(label = "Connection Timeout", intValue = CONNECTION_TIMEOUT_DEFAULT, description = "Amount of time (in ms) until firing a Connection Timout on GSA Search Proxy Server.")
    public static final String CONNECTION_TIMEOUT = "connectionTimeout";

    /** The Constant READ_TIMEOUT. */
    @Property(label = "Read Timeout", intValue = READ_TIMEOUT_DEFAULT, description = "Amount of time (in ms) until firing a Read Timeout on GSA Search Proxy Server.")
    public static final String READ_TIMEOUT = "readTimeout";

    /*
     * (non-Javadoc)
     * @see com.medtronic.com.services.gsa.GsaSearchService#convertXmlToGsaSearchResults(java.lang.String)
     */
    @Override
    public GsaSearchResults convertXmlToGsaSearchResults(final String xmlString) throws JsonParseException,
                                                                                JsonMappingException, IOException {
        final XmlMapper xmlMapper = new XmlMapper();
        xmlMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        final GsaSearchResults results = xmlMapper.readValue(xmlString, GsaSearchResults.class);
        results.setQuery(results.getQuery().replaceAll("\\+", " "));
        checkForWildCard(results);
        if (results.getResults() != null && Integer.parseInt(results.getResults().getTotalResults()) > 1000) {
            results.getResults().setTotalResults("1000");
        }
        if (results.getResults() != null) {
            for (GsaResult gsaResult : results.getResults().getGsaResult()) {
                addFileType(gsaResult);
                gsaResult.setFormattedUrl(formatUrl(gsaResult.getUrl().substring(ServiceConstants.SEVEN),
                        results.getQuery()));
                if (gsaResult.getMetaDescription() != null
                        && !gsaResult.getMetaDescription().getDescription().isEmpty()) {
                    gsaResult.setDescription(gsaResult.getMetaDescription().getDescription());
                }
            }
        }
        if (results.getKeyMatches() != null) {
            for (GsaKeyMatches keyMatch : results.getKeyMatches()) {
                keyMatch.setFormattedUrl(formatUrl(keyMatch.getUrl().substring(ServiceConstants.SEVEN),
                        results.getQuery()));
            }
        }

        return results;
    }

    /**
     * Check for wild card.
     *
     * @param results
     *            the results
     */
    private void checkForWildCard(final GsaSearchResults results) {
        final GsaParameter dummyParam = new GsaParameter();
        dummyParam.setName("q");
        GsaParameter queryParam = null;
        for (int i = 0; i < results.getParams().size(); i++) {
            if (results.getParams().get(i).getName().equals("q")) {
                queryParam = results.getParams().get(i);
            }
        }
        if (queryParam != null && ("wildcard:" + queryParam.getValue()).equals(results.getQuery())) {
            results.setQuery(queryParam.getValue());
        }
    }

    /*
     * (non-Javadoc)
     * @see com.medtronic.com.services.gsa.GsaSearchService#getPredictiveSuggestiveSearches(java.lang.String,
     * java.lang.String, java.lang.String, java.lang.String)
     */
    @Override
    public GsaPredictiveAndSuggestiveResults getPredictiveSuggestiveSearches(final String query,
                                                                             final String language,
                                                                             final String site,
                                                                             final String client) throws IOException {
        final String urlPredictive = buildPredictiveUrl(query, site, client);
        LOG.info("GSA Predictive URL: " + urlPredictive);
        final URLConnection predictiveConn = createConnection(urlPredictive);
        GsaPredictive gsaPredictive = null;

        try (InputStream predictiveInputStream = predictiveConn.getInputStream()) {
            final BufferedReader streamReader = new BufferedReader(new InputStreamReader(predictiveInputStream,
                    ServiceConstants.CHARACTER_ENCODING_UTF_8));

            gsaPredictive = new ObjectMapper().readValue(streamReader, GsaPredictive.class);
        }

        GsaSearchResults results = null;

        if (gsaPredictive != null && !gsaPredictive.getResults().isEmpty()) {
            final String searchQuery = gsaPredictive.getResults().get(0).getName();
            results = this.search(searchQuery, 1, ServiceConstants.THREE, language, site, client,
                    ServiceConstants.EMPTY_STRING);
        }

        final GsaPredictiveAndSuggestiveResults totalResults = new GsaPredictiveAndSuggestiveResults();
        totalResults.setGsaPredictive(gsaPredictive);
        totalResults.setGsaResults(results);

        return totalResults;
    }

    /*
     * (non-Javadoc)
     * @see com.medtronic.com.services.gsa.GsaSearchService#getPreviewImage(java.lang.String)
     */
    @Override
    public URLConnection getPreviewImage(final String session) throws IOException {
        final String urlString = buildPreviewUrl(session);
        return createConnection(urlString);
    }

    /*
     * (non-Javadoc)
     * @see com.medtronic.com.services.gsa.GsaSearchService#getZoomJson(java.lang.String)
     */
    @Override
    public URLConnection getZoomJson(final String queryString) throws IOException {
        final String urlString = buildZoomUrl(queryString);
        return createConnection(urlString);
    }

    /*
     * (non-Javadoc)
     * @see com.medtronic.com.services.gsa.GsaSearchService#search(java.lang.String, int, int, java.lang.String,
     * java.lang.String, java.lang.String)
     */
    @Override
    public GsaSearchResults search(final String query,
                                   final int pageNumber,
                                   final int resultsRequested,
                                   final String language,
                                   final String site,
                                   final String client,
                                   final String filters) throws IOException {

        final String urlString = buildSearchURL(query, pageNumber, resultsRequested, language, site, client, filters);
        final URLConnection conn = createConnection(urlString);
        return writeSearchDataToOutputStream(conn);
    }

    /**
     * Builds the predictive url.
     *
     * @param query
     *            the query
     * @param site
     *            the site
     * @param client
     *            the client
     * @return the string
     * @throws UnsupportedEncodingException
     *             the unsupported encoding exception
     */
    public String buildPredictiveUrl(final String query,
                                     final String site,
                                     final String client) throws UnsupportedEncodingException {
        return MessageFormat.format(gsaPredictiveUrl,
                URLEncoder.encode(query, ServiceConstants.CHARACTER_ENCODING_UTF_8),
                URLEncoder.encode(site, ServiceConstants.CHARACTER_ENCODING_UTF_8),
                URLEncoder.encode(client, ServiceConstants.CHARACTER_ENCODING_UTF_8));
    }

    /**
     * Builds the preview url.
     *
     * @param session
     *            the session
     * @return the string
     */
    public String buildPreviewUrl(final String session) {
        return MessageFormat.format(gsaPreviewUrl, session);
    }

    /**
     * Builds the search url.
     *
     * @param query
     *            the query
     * @param pageNumber
     *            the page number
     * @param resultsRequested
     *            the results requested
     * @param language
     *            the language
     * @param site
     *            the site
     * @param client
     *            the client
     * @param filters
     *            the filters
     * @return the string
     * @throws UnsupportedEncodingException
     *             the unsupported encoding exception
     */
    public String buildSearchURL(final String query,
                                 final int pageNumber,
                                 final int resultsRequested,
                                 final String language,
                                 final String site,
                                 final String client,
                                 final String filters) throws UnsupportedEncodingException {
        final String filterUrl = buildFilterUrl(client, filters);
        return MessageFormat.format(gsaSearchUrl, URLEncoder.encode(query, ServiceConstants.CHARACTER_ENCODING_UTF_8),
                URLEncoder.encode(language, ServiceConstants.CHARACTER_ENCODING_UTF_8),
                URLEncoder.encode(Integer.toString((pageNumber * 10) - 10), ServiceConstants.CHARACTER_ENCODING_UTF_8),
                URLEncoder.encode(Integer.toString(resultsRequested), ServiceConstants.CHARACTER_ENCODING_UTF_8),
                URLEncoder.encode(site, ServiceConstants.CHARACTER_ENCODING_UTF_8),
                URLEncoder.encode(client, ServiceConstants.CHARACTER_ENCODING_UTF_8),
                URLEncoder.encode(filterUrl, ServiceConstants.CHARACTER_ENCODING_UTF_8));
    }

    /**
     * Builds the filter url.
     *
     * @param client
     *            the client
     * @param filters
     *            the filters
     * @return the string
     */
    private String buildFilterUrl(final String client,
                                  final String filters) {
        final StringBuilder filterBuilder = new StringBuilder();
        final List<GsaFilter> gsaFilters = new ArrayList<GsaFilter>();
        if (!filters.isEmpty()) {
            final String[] refactoredFiltersArray = filters.split(",");

            for (int i = 0; i < refactoredFiltersArray.length; i++) {
                if (refactoredFiltersArray[i].indexOf("/") > -1) {
                    final String primaryFilter = refactoredFiltersArray[i].substring(0,
                            refactoredFiltersArray[i].indexOf("/"));
                    final String secondaryFilter = refactoredFiltersArray[i].substring(refactoredFiltersArray[i]
                            .indexOf("/") + 1);
                    if (gsaFilters.isEmpty()) {
                        final GsaFilter newFilter = new GsaFilter();
                        newFilter.setPrimaryFilter(primaryFilter.concat("-" + client));
                        final ArrayList<String> secFilterList = new ArrayList<String>();
                        secFilterList.add(secondaryFilter);
                        newFilter.setSecondaryFilters(secFilterList);
                        gsaFilters.add(newFilter);
                    } else {
                        Boolean primaryExists = false;
                        for (int j = 0; j < gsaFilters.size(); j++) {
                            if (gsaFilters.get(j).getPrimaryFilter().contains(primaryFilter)) {
                                gsaFilters.get(j).getSecondaryFilters().add(secondaryFilter);
                                primaryExists = true;
                            }                          
                        }
                        if (!primaryExists) {
                            final GsaFilter newFilter = new GsaFilter();
                            newFilter.setPrimaryFilter(primaryFilter.concat("-" + client));
                            final ArrayList<String> secFilterList = new ArrayList<String>();
                            secFilterList.add(secondaryFilter);
                            newFilter.setSecondaryFilters(secFilterList);
                            gsaFilters.add(newFilter);
                        }
                    }
                } else {
                    final GsaFilter newFilter = new GsaFilter();
                    newFilter.setPrimaryFilter(refactoredFiltersArray[i].concat("-" + client));
                    newFilter.setSecondaryFilters(new ArrayList<String>());
                    gsaFilters.add(newFilter);
                }
            }

            for (int i = 0; i < gsaFilters.size(); i++) {
                final List<String> secondaryFilters = gsaFilters.get(i).getSecondaryFilters();
                if (!secondaryFilters.isEmpty()) {
                    filterBuilder.append("(");
                    for (int j = 0; j < secondaryFilters.size(); j++) {
                        filterBuilder.append("gsaentity_");
                        filterBuilder.append(gsaFilters.get(i).getPrimaryFilter());
                        filterBuilder.append(":");
                        filterBuilder.append(secondaryFilters.get(j));
                        if (j != secondaryFilters.size() - 1) {
                            filterBuilder.append("|");
                        }
                    }
                    if (i != gsaFilters.size() - 1) {
                        filterBuilder.append(").");
                    } else {
                        filterBuilder.append(")");
                    }
                } else {
                    filterBuilder.append("(gsaentity_");
                    filterBuilder.append(gsaFilters.get(i).getPrimaryFilter());
                    if (i != gsaFilters.size() - 1) {
                        filterBuilder.append(").");
                    } else {
                        filterBuilder.append(")");
                    }
                }
            }
        } else {
            filterBuilder.append("");
        }
        return filterBuilder.toString();
    }

    /**
     * Builds the zoom url.
     *
     * @param queryString
     *            the query string
     * @return the string
     */
    public String buildZoomUrl(final String queryString) {
        return MessageFormat.format(gsaZoomUrl, queryString);
    }

    /**
     * Adds the file type.
     *
     * @param gsaResult
     *            the gsa result
     */
    private void addFileType(final GsaResult gsaResult) {
        if (gsaResult.getFileType() != null) {
            gsaResult.setFileType(gsaResult.getFileType().substring(ServiceConstants.TWELVE).toUpperCase());
        }
    }

    /**
     * Creates the connection.
     *
     * @param urlStr
     *            the url str
     * @return the URL connection
     * @throws IOException
     *             Signals that an I/O exception has occurred.
     */
    private URLConnection createConnection(final String urlStr) throws IOException {
        final URL url = new URL(urlStr.trim());
        final URLConnection conn = url.openConnection();

        try {
            conn.setRequestProperty("Accept-Charset", ServiceConstants.CHARACTER_ENCODING_UTF_8);
            conn.setConnectTimeout(connectionTimeout);
            conn.setReadTimeout(readTimeout);
        } catch (Exception e) {
            LOG.info("URL Conn: " + e);
        }

        return conn;
    }

    /**
     * Format url.
     *
     * @param url
     *            the url
     * @param query
     *            the query
     * @return the string
     */
    private String formatUrl(final String url,
                             final String query) {
        final String first = url.substring(0, url.indexOf("com/") + 4);
        if (url.length() <= ServiceConstants.URL_LIMIT) {
            return url.substring(url.indexOf(first));
        } else {
            final String last = url.substring(url.lastIndexOf("/"));
            final int pathLimit = ServiceConstants.URL_LIMIT - (first.length() + last.length() + ServiceConstants.FOUR);
            if (pathLimit <= 0) {
                return url.substring(0, ServiceConstants.URL_LIMIT).concat(ServiceConstants.ELLIPSIS);
            } else {
                final String subUrl = url.substring(first.length(), url.length() - (last.length()));
                final String choppedPath = truncateChopPath(pathLimit, subUrl, query);
                if (choppedPath.length() == subUrl.length()) {
                    return subUrl + last;
                } else {
                    return first + choppedPath + last;
                }
            }
        }
    }

    /**
     * Shrink substring.
     *
     * @param subUrl
     *            the sub url
     * @param splitString
     *            the split string
     * @param pathLimit
     *            the path limit
     * @param query
     *            the query
     * @return the string
     */
    private String shrinkSubstring(final String subUrl,
                                   final String[] splitString,
                                   final int pathLimit,
                                   final String query) {
        final ArrayList<String> substringArray = new ArrayList<String>(Arrays.asList(splitString));
        Boolean isTooLong = true;
        String newsubUrl = subUrl;
        for (Iterator<String> itr = substringArray.iterator(); itr.hasNext();) {
            String urlTemp = itr.next();
            if (!urlTemp.contains(query) && isTooLong) {
                if (newsubUrl.indexOf(urlTemp) > 1
                        && newsubUrl.substring(0, newsubUrl.indexOf(urlTemp) - ServiceConstants.THREE).equals(".")
                        && itr.hasNext()) {
                    urlTemp = urlTemp.concat("/");
                    newsubUrl = newsubUrl.replace(urlTemp, ServiceConstants.EMPTY_STRING);
                } else {
                    newsubUrl = newsubUrl.replace(urlTemp, ServiceConstants.ELLIPSIS);
                }
                if (newsubUrl.length() < pathLimit) {
                    isTooLong = false;
                }
                itr.remove();
            }
        }
        if (newsubUrl.length() > pathLimit) {
            newsubUrl = shrinkUrlEvenMore(pathLimit, query, substringArray, newsubUrl);
        }
        return newsubUrl;
    }

    /**
     * Shrink url even more.
     *
     * @param pathLimit
     *            the path limit
     * @param query
     *            the query
     * @param substringArray
     *            the substring array
     * @param newsubUrl
     *            the newsub url
     * @return the string
     */
    private String shrinkUrlEvenMore(final int pathLimit,
                                     final String query,
                                     final ArrayList<String> substringArray,
                                     final String newsubUrl) {
        Boolean isTooLong;
        isTooLong = true;
        String newNewSubUrl = newsubUrl;
        final Iterator<String> itr = substringArray.iterator();
        while (itr.hasNext() && isTooLong) {
            if (isTooLong) {
                final String urlTemp = itr.next();
                final String subTemp = urlTemp.substring(0, urlTemp.indexOf(query));
                if (subTemp.isEmpty() && !query.equals(urlTemp)) {
                    final String toBeRemoved = urlTemp.substring(query.length(), urlTemp.length());
                    newNewSubUrl = newNewSubUrl.replaceFirst(toBeRemoved, ServiceConstants.ELLIPSIS);
                } else if (!subTemp.isEmpty() && (subTemp + query).equals(urlTemp)) {
                    newNewSubUrl = newNewSubUrl.replaceFirst(subTemp, ServiceConstants.ELLIPSIS);
                } else if (!newNewSubUrl.isEmpty() && !urlTemp.equals(query)) {
                    newNewSubUrl = newsubUrl.replaceFirst(subTemp, ServiceConstants.ELLIPSIS);
                    final String last = urlTemp.substring(urlTemp.indexOf(query) + query.length());
                    newNewSubUrl = newNewSubUrl.replaceFirst(last, ServiceConstants.ELLIPSIS);
                }
                if (newNewSubUrl.length() < pathLimit) {
                    isTooLong = false;
                }
            }
        }
        return newsubUrl;
    }

    /**
     * Truncate chop path.
     *
     * @param pathLimit
     *            the path limit
     * @param subUrl
     *            the sub url
     * @param query
     *            the query
     * @return the string
     */
    private String truncateChopPath(final int pathLimit,
                                    final String subUrl,
                                    final String query) {
        final String[] splitString = subUrl.split("/");
        final String newSubUrl = shrinkSubstring(subUrl, splitString, pathLimit, query);
        return newSubUrl;
    }

    /**
     * Write search data to output stream.
     *
     * @param conn
     *            the conn
     * @return the gsa search results
     * @throws UnsupportedEncodingException
     *             the unsupported encoding exception
     * @throws IOException
     *             Signals that an I/O exception has occurred.
     * @throws JsonParseException
     *             the json parse exception
     * @throws JsonMappingException
     *             the json mapping exception
     */
    private GsaSearchResults writeSearchDataToOutputStream(final URLConnection conn)
                                                                                    throws UnsupportedEncodingException,
                                                                                    IOException, JsonParseException,
                                                                                    JsonMappingException {
        try (InputStream inputStream = conn.getInputStream()) {
            final String xml = IOUtils.toString(inputStream, ServiceConstants.CHARACTER_ENCODING_UTF_8);
            return convertXmlToGsaSearchResults(xml);
        }
    }

    /**
     * Sets the properties.
     *
     * @param context
     *            the new properties
     */
    private void setProperties(final ComponentContext context) {
        @SuppressWarnings("rawtypes")
        final Dictionary properties = context.getProperties();
        gsaHostUrl = PropertiesUtil.toString(properties.get(GSA_CONNECT_SERVICE_URL), GSA_CONNECT_SERVICE_URL_DEFAULT);
        readTimeout = PropertiesUtil.toInteger(properties.get(READ_TIMEOUT), READ_TIMEOUT_DEFAULT);
        connectionTimeout = PropertiesUtil.toInteger(properties.get(CONNECTION_TIMEOUT), CONNECTION_TIMEOUT_DEFAULT);
    }

    /**
     * Activate.
     *
     * @param context
     *            the context
     */
    @Activate
    protected void activate(final ComponentContext context) {
        LOG.debug("GSA Search Service Activated");
        setProperties(context);
        buildSearchUrlTemplates();
    }

    /**
     * Builds the search url templates.
     */
    private void buildSearchUrlTemplates() {
        gsaZoomUrl = gsaHostUrl + "{0}";
        gsaPreviewUrl = gsaHostUrl + "{0}";
        gsaPredictiveUrl = gsaHostUrl + ServiceConstants.SUGGEST + ServiceConstants.GSA_PREDICTIVE_URL
                + ServiceConstants.URL_PARAMETER_QUERY + "{0}&" + ServiceConstants.URL_PARAMETER_SITE + "{1}&"
                + ServiceConstants.URL_PARAMETER_CLIENT + "{2}";
        gsaSearchUrl = gsaHostUrl + ServiceConstants.SEARCH + ServiceConstants.GSA_SEARCH_URL
                + ServiceConstants.URL_PARAMETER_QUERY + "{0}&" + ServiceConstants.URL_PARAMETER_LANGUAGE + "{1}&"
                + ServiceConstants.URL_PARAMETER_PAGE_NUMBER + "{2}&" + ServiceConstants.URL_PARAMETER_RESULTS_REQUSTED
                + "{3}&" + ServiceConstants.URL_PARAMETER_SITE + "{4}&" + ServiceConstants.URL_PARAMETER_CLIENT
                + "{5}&" + ServiceConstants.URL_PARAMETER_FILTERS + "{6}";
    }

    /**
     * Modified.
     *
     * @param context
     *            the context
     */
    @Modified
    protected void modified(final ComponentContext context) {
        LOG.debug("GSA Search Service Activated");
        setProperties(context);
    }
}
