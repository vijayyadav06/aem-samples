
package com.medtronic.com.msm.workflow;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;

public enum DynamicUserChooser {
    LOCALIZE("AEM-PLC-$locale-CORP-Contributor"),
    QUEUE("AEM-PLC-$locale-CORP-Contributor"),
    TRANSLATION_REVIEW("AEM-PLC-$locale-CORP-Contributor"),
    TRANSLATION_REVISIONS("AEM-PLC-$locale-CORP-Contributor"),
    URL_TRANSLATION_REVIEW("AEM-PLC-$locale-CORP-Contributor"),
    URL_TRANSLATION_REVISIONS("AEM-PLC-$locale-CORP-Contributor"),
    ASSET_TRANSLATION_SELECTION("AEM-PLC-$locale-CORP-Contributor"),
    ASSET_TRANSLATION("AEM-PLC-$locale-CORP-Contributor"),
    LEGAL("AEM-PLC-$locale-CORP-Reviewer");

    private static final String CONTENT_BASE_PATH = "/content/medtronic-com/";

    private final String groupNameTemplate;
    private static final String NON_COUTNRY_GROUP_TEMPLATE_REVIEWER = "AEM-PLC-$locale-Reviewer";
    private static final String NON_COUTNRY_GROUP_TEMPLATE_CONTRIBUTER = "AEM-PLC-$locale-Contributor";
    private static final String CONTRIBUTER_TEMPLATE = "AEM-PLC-$locale-CORP-Contributor";
    private static final String REVIEWER_TEMPLATE = "AEM-PLC-$locale-CORP-Reviewer";
    private static final String COUNTRY_REGEX = "[a-zA-Z]{2}-[a-zA-Z]{2}";

    private DynamicUserChooser(String groupNameTemplate) {
        this.groupNameTemplate = groupNameTemplate;
    }

    /**
     * gets the group name based on the path
     * 
     * @param path
     *            payload path
     * @return group ID
     */
    public String getGroupName(String path) {
        String pLocale = StringUtils.substringBetween(path, CONTENT_BASE_PATH, "/");
        if (pLocale.matches(COUNTRY_REGEX)) {
            pLocale = StringUtils.replace(pLocale, "-", "_");
            String locale = StringUtils.upperCase(pLocale);
            return StringUtils.replace(this.groupNameTemplate, "$locale", locale);
        } else {
            if (this.groupNameTemplate.equalsIgnoreCase(CONTRIBUTER_TEMPLATE)) {
                return StringUtils.replace(NON_COUTNRY_GROUP_TEMPLATE_CONTRIBUTER, "$locale", pLocale);
            } else if (this.groupNameTemplate.equalsIgnoreCase(REVIEWER_TEMPLATE)) {
                return StringUtils.replace(NON_COUTNRY_GROUP_TEMPLATE_REVIEWER, "$locale", pLocale);
            }
        }
        // if we get here, something is not right
        return null;
    }

    public String getGroupName(Resource resource) {
        return getGroupName(resource.getPath());
    }

}
