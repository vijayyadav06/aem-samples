
package com.medtronic.com.models.search;

import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

/**
 * The Class GsaResults.
 */
public class GsaResults {

    /** The start number. */
    @JacksonXmlProperty(localName = "SN", isAttribute = true)
    private String startNumber;

    /** The end number. */
    @JacksonXmlProperty(localName = "EN", isAttribute = true)
    private String endNumber;

    /** The total results. */
    @JacksonXmlProperty(localName = "M")
    private String totalResults;

    /** The gsa urls. */
    @JacksonXmlProperty(localName = "NB")
    @JacksonXmlElementWrapper(useWrapping = false)
    private GsaUrls gsaUrls;

    /** The gsa result. */
    @JacksonXmlProperty(localName = "R")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<GsaResult> gsaResult;

    /**
     * Gets the start number.
     *
     * @return the start number
     */
    public String getStartNumber() {
        return startNumber;
    }

    /**
     * Sets the start number.
     *
     * @param startNumber the new start number
     */
    public void setStartNumber(final String startNumber) {
        this.startNumber = startNumber;
    }

    /**
     * Gets the end number.
     *
     * @return the end number
     */
    public String getEndNumber() {
        return endNumber;
    }

    /**
     * Sets the end number.
     *
     * @param endNumber the new end number
     */
    public void setEndNumber(final String endNumber) {
        this.endNumber = endNumber;
    }

    /**
     * Gets the total results.
     *
     * @return the total results
     */
    public String getTotalResults() {
        return totalResults;
    }

    /**
     * Sets the total results.
     *
     * @param totalResults the new total results
     */
    public void setTotalResults(final String totalResults) {
        this.totalResults = totalResults;
    }

    /**
     * Gets the gsa urls.
     *
     * @return the gsa urls
     */
    public GsaUrls getGsaUrls() {
        return gsaUrls;
    }

    /**
     * Sets the gsa urls.
     *
     * @param gsaUrls the new gsa urls
     */
    public void setGsaUrls(final GsaUrls gsaUrls) {
        this.gsaUrls = gsaUrls;
    }

    /**
     * Gets the gsa result.
     *
     * @return the gsa result
     */
    public List<GsaResult> getGsaResult() {
        return gsaResult;
    }

    /**
     * Sets the gsa result.
     *
     * @param gsaResult the new gsa result
     */
    public void setGsaResult(final List<GsaResult> gsaResult) {
        this.gsaResult = gsaResult;
    }

    /** Adds all fields into one string.
     * @return String of all the variables
     * */
    public String toString() {
        return "start: " + startNumber + " end: " + endNumber + " total Results: " + totalResults + " gsaUrls: "
                + gsaUrls + " gsaResult: " + gsaResult.toString();
    }
}
