
package com.medtronic.com.app;

/**
 * Multifield object for attachments in download attachment component
 * 
 * @author saraswathy.kalyani
 */
public class DownloadAttachment {

    private String title;
    private String url;
    private boolean newTab;
    private String description;
    private String date;
    private boolean displayDate;
    private String size;
    private String extension;
    private String fileType;

    /**
     * @return the title
     */
    public String getTitle() {
        return title;
    }

    /**
     * @param title
     *            the title to set
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * @return the url
     */
    public String getUrl() {
        return url;
    }

    /**
     * @param url
     *            the url to set
     */
    public void setUrl(String url) {
        this.url = url;
    }

    /**
     * @return the newTab
     */
    public boolean getNewTab() {
        return newTab;
    }

    /**
     * @param newTab
     *            the newTab to set
     */
    public void setNewTab(boolean newTab) {
        this.newTab = newTab;
    }

    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description
     *            the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * @return the date
     */
    public String getDate() {
        return date;
    }

    /**
     * @param date
     *            the date to set
     */
    public void setDate(String date) {
        this.date = date;
    }

    /**
     * @return the displayDate
     */
    public boolean getDisplayDate() {
        return displayDate;
    }

    /**
     * @param displayDate
     *            the displayDate to set
     */
    public void setDisplayDate(boolean displayDate) {
        this.displayDate = displayDate;
    }

    /**
     * @return the size
     */
    public String getSize() {
        return size;
    }

    /**
     * @param size
     *            the size to set
     */
    public void setSize(String size) {
        this.size = size;
    }

    /**
     * @return the extension
     */
    public String getExtension() {
        return extension;
    }

    /**
     * @param extension
     *            the extension to set
     */
    public void setExtension(String extension) {
        this.extension = extension;
    }

    /**
     * @return the fileType
     */
    public String getFileType() {
        return fileType;
    }

    /**
     * @param fileType
     *            the fileType to set
     */
    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

}
