
package com.medtronic.com.models.search;

import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

/**
 * The Class GsaSearchResults.
 */
public class GsaSearchResults {

    /** The time. */
    @JacksonXmlProperty(localName = "TM")
    private String time;

    /** The query. */
    @JacksonXmlProperty(localName = "Q")
    private String query;

    /** The params. */
    @JacksonXmlProperty(localName = "PARAM")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<GsaParameter> params;

    /** The results. */
    @JacksonXmlProperty(localName = "RES")
    @JacksonXmlElementWrapper(useWrapping = false)
    private GsaResults results;

    /** The key matches. */
    @JacksonXmlProperty(localName = "GM")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<GsaKeyMatches> keyMatches;

    /** The search instead value. */
    @JacksonXmlProperty(localName = "Synonyms")
    @JacksonXmlElementWrapper(useWrapping = false)
    private GsaSynonyms searchInsteadValue;

    /** The preview data. */
    @JacksonXmlProperty(localName = "PREVIEWS")
    private String previewData;

    /**
     * Gets the time.
     *
     * @return the time
     */
    public String getTime() {
        return time;
    }

    /**
     * Sets the time.
     *
     * @param time the new time
     */
    public void setTime(final String time) {
        this.time = time;
    }

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
     * Gets the params.
     *
     * @return the params
     */
    public List<GsaParameter> getParams() {
        return params;
    }

    /**
     * Sets the params.
     *
     * @param params the new params
     */
    public void setParams(final List<GsaParameter> params) {
        this.params = params;
    }

    /**
     * Gets the results.
     *
     * @return the results
     */
    public GsaResults getResults() {
        return results;
    }

    /**
     * Sets the results.
     *
     * @param results the new results
     */
    public void setResults(final GsaResults results) {
        this.results = results;
    }

    /**
     * Gets the key matches.
     *
     * @return the key matches
     */
    public List<GsaKeyMatches> getKeyMatches() {
        return keyMatches;
    }

    /**
     * Sets the key matches.
     *
     * @param keyMatches the new key matches
     */
    public void setKeyMatches(final List<GsaKeyMatches> keyMatches) {
        this.keyMatches = keyMatches;
    }

    /**
     * Gets the search instead value.
     *
     * @return the search instead value
     */
    public GsaSynonyms getSearchInsteadValue() {
        return searchInsteadValue;
    }

    /**
     * Sets the search instead value.
     *
     * @param searchInsteadValue the new search instead value
     */
    public void setSearchInsteadValue(final GsaSynonyms searchInsteadValue) {
        this.searchInsteadValue = searchInsteadValue;
    }

    /**
     * Gets the preview data.
     *
     * @return the preview data
     */
    public String getPreviewData() {
        return previewData;
    }

    /**
     * Sets the preview data.
     *
     * @param previewData the new preview data
     */
    public void setPreviewData(final String previewData) {
        this.previewData = previewData;
    }

    /** Adds all fields into one string.
     * @return String of all the variables
     * */
    public String toString() {
        return "time: " + time + " query: " + query + " params: " + params + " results: " + results + " keyMatches: "
                + keyMatches + " searchInsteadFor: " + searchInsteadValue + " previewdata: " + previewData;
    }
}
