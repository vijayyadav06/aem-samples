package com.medtronic.com.msm.translation;

import org.apache.commons.lang3.StringUtils;

/**
 * Created by anton on 2/15/2016.
 */
public class TranslationProperties {
    private String jobName;
    private String jobDescription = "";
    private String pagePath;
    private String pageTitle;
    private String sourceLanguage;
    private String targetLanguage;

    public String getJobName() {
        StringBuffer buf = new StringBuffer();

        if (StringUtils.isNotBlank(sourceLanguage) && StringUtils.isNotBlank(targetLanguage)) {
            buf.append("(");
            buf.append(sourceLanguage);
            buf.append(" to ");
            buf.append(targetLanguage);
            buf.append(") ");
        }

        buf.append(pageTitle);
        return buf.toString();
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public String getPagePath() {
        return pagePath;
    }

    public String getPageTitle() {
        return pageTitle;
    }

    public String getSourceLanguage() {
        return sourceLanguage;
    }

    public String getTargetLanguage() {
        return targetLanguage;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public void setPagePath(String pagePath) {
        this.pagePath = pagePath;
    }

    public void setPageTitle(String pageTitle) {
        this.pageTitle = pageTitle;
    }

    public void setSourceLanguage(String sourceLanguage) {
        this.sourceLanguage = sourceLanguage;
    }

    public void setTargetLanguage(String targetLanguage) {
        this.targetLanguage = targetLanguage;
    }
}
