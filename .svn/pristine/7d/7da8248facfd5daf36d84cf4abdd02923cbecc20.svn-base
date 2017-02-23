
package com.medtronic.com.models.search;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlText;

/**
 * The Class GsaSynonym.
 */
public class GsaSynonym {

    /** The text. */
    @JacksonXmlText
    private String text;

    /** The query. */
    @JacksonXmlProperty(localName = "q", isAttribute = true)
    private String query;

    /**
     * Gets the text.
     *
     * @return the text
     */
    public String getText() {
        return text;
    }

    /**
     * Sets the text.
     *
     * @param text the new text
     */
    public void setText(final String text) {
        this.text = text;
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

    /** Adds all fields into one string.
     * @return String of all the variables
     * */
    public String toString() {
        return "text: " + text + " query: " + query;
    }
}
