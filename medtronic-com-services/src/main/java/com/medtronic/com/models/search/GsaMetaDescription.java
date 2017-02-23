
package com.medtronic.com.models.search;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

/**
 * The Class GsaMetaDescription.
 */
public class GsaMetaDescription {

    /** The name. */
    @JacksonXmlProperty(localName = "N", isAttribute = true)
    private String name;

    /** The description. */
    @JacksonXmlProperty(localName = "V", isAttribute = true)
    private String description;

    /**
     * Gets the description.
     *
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets the description.
     *
     * @param description the new description
     */
    public void setDescription(final String description) {
        this.description = description;
    }
    
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
    
    /** Adds all fields into one string.
     * @return String of all the variables
     * */
    public String toString() {
        return "name: " + name + " description: " + getDescription();
    }
}
