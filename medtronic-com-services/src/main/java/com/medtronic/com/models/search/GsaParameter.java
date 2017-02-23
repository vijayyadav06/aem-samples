
package com.medtronic.com.models.search;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

/**
 * The Class GsaParameter.
 */
public class GsaParameter {

    /** The name. */
    @JacksonXmlProperty(isAttribute = true)
    private String name;

    /** The value. */
    @JacksonXmlProperty(isAttribute = true)
    private String value;

    /** The original value. */
    @JacksonXmlProperty(localName = "original_value", isAttribute = true)
    private String originalValue;
    
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
     * Gets the value.
     *
     * @return the value
     */
    public String getValue() {
        return value;
    }

    /**
     * Sets the value.
     *
     * @param value the new value
     */
    public void setValue(final String value) {
        this.value = value;
    }

    /**
     * Gets the original value.
     *
     * @return the original value
     */
    public String getOriginalValue() {
        return originalValue;
    }

    /**
     * Sets the original value.
     *
     * @param originalValue the new original value
     */
    public void setOriginalValue(final String originalValue) {
        this.originalValue = originalValue;
    }

    /** Adds all fields into one string.
     * @return String of all the variables
     * */
    public String toString() {
        return "name: " + name + " value: " + value + " original value: " + originalValue;
    }
}
