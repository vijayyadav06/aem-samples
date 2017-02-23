package com.medtronic.com.msm.translation.config;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;

/**
 * Created by anton on 2/16/2016.
 */
public class LanguageMap {

    @JacksonXmlProperty(localName = "cq5Language")
    private String language;

    @JacksonXmlProperty(localName = "cq5RefPath")
    private String refPath;

    @JacksonXmlProperty
    private String ctcLanguage;

    @JacksonXmlProperty(localName = "languageType")
    private String languageType;

    @JacksonXmlProperty(localName = "sortOrder")
    private String sortOrder;

    @JacksonXmlProperty(localName = "isReadOnly")
    private Boolean isReadOnly;

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getRefPath() {
        return refPath;
    }

    public void setRefPath(String refPath) {
        this.refPath = refPath;
    }

    public String getCtcLanguage() {
        return ctcLanguage;
    }

    public void setCtcLanguage(String ctcLanguage) {
        this.ctcLanguage = ctcLanguage;
    }

    public String getLanguageType() {
        return languageType;
    }

    public void setLanguageType(String languageType) {
        this.languageType = languageType;
    }

    public String getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(String sortOrder) {
        this.sortOrder = sortOrder;
    }

    public Boolean getReadOnly() {
        return isReadOnly;
    }

    public void setReadOnly(Boolean readOnly) {
        isReadOnly = readOnly;
    }
}
