package com.medtronic.com.models.search;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

/**
 * The Class GsaPredictiveResults.
 */
public class GsaPredictiveResults {
    
    /** The name. */
    @JacksonXmlProperty(localName = "name")
    private String name;

    /** The type. */
    @JacksonXmlProperty(localName = "type")
    private String type;

    /**
     * Gets the name.
     *
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name.
     *
     * @param name the new name
     */
    public void setName(final String name) {
        this.name = name;
    }

    /**
     * Gets the type.
     *
     * @return the type
     */
    public String getType() {
        return type;
    }

    /**
     * Sets the type.
     *
     * @param type the new type
     */
    public void setType(final String type) {
        this.type = type;
    }

    /** Adds all fields into one string.
     * @return String of all the variables
     * */
    public String toString() {
        return "name: " + name + " type: " + type;
    }
}
