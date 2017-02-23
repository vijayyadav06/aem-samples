
package com.medtronic.com.models.search;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

/**
 * The Class GsaUrls.
 */
public class GsaUrls {

    /** The next url. */
    @JacksonXmlProperty(localName = "NU")
    private String nextUrl;

    /** The prev url. */
    @JacksonXmlProperty(localName = "PU")
    private String prevUrl;

    /**
     * Gets the next url.
     *
     * @return the next url
     */
    public String getNextUrl() {
        return nextUrl;
    }

    /**
     * Sets the next url.
     *
     * @param nextUrl the new next url
     */
    public void setNextUrl(final String nextUrl) {
        this.nextUrl = nextUrl;
    }

    /**
     * Gets the prev url.
     *
     * @return the prev url
     */
    public String getPrevUrl() {
        return prevUrl;
    }

    /**
     * Sets the prev url.
     *
     * @param prevUrl the new prev url
     */
    public void setPrevUrl(final String prevUrl) {
        this.prevUrl = prevUrl;
    }

    /** Adds all fields into one string.
     * @return String of all the variables
     * */
    public String toString() {
        return "nextUrl: " + nextUrl + " prevUrl: " + prevUrl;
    }
}
