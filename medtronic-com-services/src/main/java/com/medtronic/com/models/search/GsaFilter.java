
package com.medtronic.com.models.search;

import java.util.List;

/**
 * The Class GsaFilters.
 */
public final class GsaFilter {

    /** The primary filter. */
    private String primaryFilter;
    
    /** The secondary filter. */
    private List<String> secondaryFilters;

    /**
     * Gets the primary filter.
     *
     * @return the primary filter
     */
    public String getPrimaryFilter() {
        return primaryFilter;
    }

    /**
     * Sets the primary filter.
     *
     * @param primaryFilter the new primary filter
     */
    public void setPrimaryFilter(final String primaryFilter) {
        this.primaryFilter = primaryFilter;
    }
    
    /**
     * Gets the secondary filters.
     *
     * @return the secondary filters
     */
    public List<String> getSecondaryFilters() {
        return secondaryFilters;
    }

    /**
     * Sets the secondary filters.
     *
     * @param secondaryFilters the new secondary filters
     */
    public void setSecondaryFilters(final List<String> secondaryFilters) {
        this.secondaryFilters = secondaryFilters;
    }

    public GsaFilter() {
    }
    
    /** Adds all fields into one string.
     * @return String of all the variables
     * */
    public String toString() {
        return "primaryFilter: " + getPrimaryFilter() + " secondaryFilters: " + getSecondaryFilters();
    }
}
