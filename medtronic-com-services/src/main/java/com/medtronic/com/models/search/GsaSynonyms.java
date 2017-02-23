
package com.medtronic.com.models.search;

import java.util.List;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

// TODO: Auto-generated Javadoc
/**
 * The Class GsaSynonyms.
 */
public class GsaSynonyms {

    /** The gsa one synonym. */
    @JacksonXmlProperty(localName = "OneSynonym")
    @JacksonXmlElementWrapper(useWrapping = false)
    private List<GsaSynonym> gsaOneSynonym;

    /**
     * Gets the gsa one synonym.
     *
     * @return the gsa one synonym
     */
    public List<GsaSynonym> getGsaOneSynonym() {
        return gsaOneSynonym;
    }

    /**
     * Sets the gsa one synonym.
     *
     * @param gsaOneSynonym the new gsa one synonym
     */
    public void setGsaOneSynonym(final List<GsaSynonym> gsaOneSynonym) {
        this.gsaOneSynonym = gsaOneSynonym;
    }

    /** Adds all fields into one string.
     * @return String of all the variables
     * */
    public String toString() {
        return "gsaOneSynonym: " + gsaOneSynonym;
    }
}
