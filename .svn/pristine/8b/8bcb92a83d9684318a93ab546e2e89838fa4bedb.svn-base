package com.medtronic.com.util;

/**
 * Created by ryan.mccullough on 2015-11-20.
 */
public class LinkUtil {

    /**
     * getPathfieldURL
     *
     * Takes the value from pathfield and performs logic s.t. it will always be a valid URL.
     *
     * @param path - Input value from pathfield
     * @return pageURL - the modified path
    */
    //TODO: Modify static strings to use constants from com.medtronic.commons.util.CommonsConstants.java
    public static String getPathfieldURL(String path){
        StringBuffer pageURL = new StringBuffer(path);
        if (pageURL.toString().startsWith("/content")) {
            final int index = pageURL.lastIndexOf(".");
            if (index < 0) {
                pageURL.append(".html");
            }
        } else if (!"".equalsIgnoreCase(pageURL.toString())
                    && !(pageURL.toString().startsWith("http://")
                        || pageURL.toString().startsWith("https://"))) {
            if (pageURL.toString().startsWith("/")) {
                pageURL.insert(0, "http:/");
            } else if (!"#".equals(pageURL.toString())) {
                    pageURL.insert(0, "http://");
            }
        }
        return pageURL.toString();
    }

}
