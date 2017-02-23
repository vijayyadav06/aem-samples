
package com.medtronic.com.app;

import java.util.List;

/**
 * A representation of a single section of an accordion component.
 */
public class AccordionSection {

    private final String title;
    private final String anchor;
    private final String columns;
    private final List<String> path;

    /**
     * Creates an anchor with the given attributes.
     * 
     * @param title the title of the section
     * @param anchor the anchor of the section
     * @param columns the columns selection
     * @param path the list of paths for the columns
     */
    public AccordionSection(final String title, final String anchor, final String columns, final List<String> path) {
        this.title = title;
        this.anchor = anchor;
        this.columns = columns;
        this.path = path;
    }

    /**
     * Returns the list of paths for this section's columns.
     * @return the list of paths
     */
    public List<String> getPath() {
        return path;
    }

    /**
     * Returns the title of this section.
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * Returns the anchor for this section.
     * @return the anchor
     */
    public String getAnchor() {
        return anchor;
    }

    /**
     * Returns the columns of the section.
     * @return the columns
     */
    public String getColumns() {
        return columns;
    }
}
