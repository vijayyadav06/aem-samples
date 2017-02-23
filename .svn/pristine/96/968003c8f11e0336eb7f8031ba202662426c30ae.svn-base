
package com.medtronic.com.models.search;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

/**
 * The Class GsaKeyMatches.
 */
public class GsaKeyMatches {

    /** The url. */
    @JacksonXmlProperty(localName = "GL")
    private String url;

    /** The title. */
    @JacksonXmlProperty(localName = "GD")
    private String title;

    /** The formatted url. */
    private String formattedUrl;

    /**
     * Gets the formatted url.
     *
     * @return the formatted url
     */
    public String getFormattedUrl() {
        return formattedUrl;
    }

    /**
     * Sets the formatted url.
     *
     * @param formattedUrl the new formatted url
     */
    public void setFormattedUrl(final String formattedUrl) {
        this.formattedUrl = formattedUrl;
    }

    /**
     * Gets the title.
     *
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * Sets the title.
     *
     * @param title the new title
     */
    public void setTitle(final String title) {
        this.title = title;
    }

    /**
     * Gets the url.
     *
     * @return the url
     */
    public String getUrl() {
        return url;
    }

    /**
     * Sets the url.
     *
     * @param url the new url
     */
    public void setUrl(final String url) {
        this.url = url;
    }
    
    /** Adds all fields into one string.
     * @return String of all the variables
     * */
    public String toString() {
        return "url: " + getUrl() + " title: " + title + " formattedUrl: " + getFormattedUrl();
    }
}
