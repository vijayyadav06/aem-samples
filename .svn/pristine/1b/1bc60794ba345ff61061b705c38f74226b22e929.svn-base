
package com.medtronic.com.models.search;

import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

/**
 * The Class GsaPredictive.
 */
public class GsaPredictive {

    /** The query. */
    @JacksonXmlProperty(localName = "query")
    private String query;

    /** The results. */
    @JacksonXmlProperty(localName = "results")
    private List<GsaPredictiveResults> results;

    /**
     * Gets the query.
     *
     * @return the query
     */
    public String getQuery() {
        return query;
    }

    /**
     * Sets the query.
     *
     * @param query the new query
     */
    public void setQuery(final String query) {
        this.query = query;
    }

    /**
     * Gets the results.
     *
     * @return the results
     */
    public List<GsaPredictiveResults> getResults() {
        return results;
    }

    /**
     * Sets the results.
     *
     * @param results the new results
     */
    public void setResults(final List<GsaPredictiveResults> results) {
        this.results = results;
    }

    /** Adds all fields into one string.
     * @return String of all the variables
     * */
    public String toString() {
        return "query: " + query + " results: " + results;
    }
}
