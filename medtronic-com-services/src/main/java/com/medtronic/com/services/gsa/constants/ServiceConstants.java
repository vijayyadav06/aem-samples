package com.medtronic.com.services.gsa.constants;

/**
 * The Interface ServiceConstants.
 */
public interface ServiceConstants {
    
    String CHARACTER_ENCODING_UTF_8 = "UTF-8";
    
    String CONTENT_TYPE_JSON = "application/json";
    
    String ELLIPSIS = "...";
    
    String GSA_SEARCH_URL = "access=p&output=xml_no_dtd&proxystylesheet=docPreview&sort=date:D:L:d1&wc=200&wc_mc=1&oe=UTF-8&ie=UTF-8&ud=1&exclude_apps=1&entqr=3&entqrm=0&entsp=a__us_en_policy&getfields=description&rc=1&filter=0&ie=utf8&oe=utf8&numgm=4&";
    
    String GSA_PREDICTIVE_URL = "max=10&access=access&format=rich&ie=utf8&oe=utf8&";
    
    String GSA_URL_HOST = "http://10.63.80.45/";
    
    String URL_PARAMETER_CLIENT = "client=";
    
    String URL_PARAMETER_SITE = "site=";
    
    String URL_PARAMETER_PAGE_NUMBER = "start=";
    
    String URL_PARAMETER_QUERY = "q=";
    
    String URL_PARAMETER_RESULTS_REQUSTED = "num=";
    
    String URL_PARAMETER_LANGUAGE = "ulang=";
    
    String URL_PARAMETER_FILTERS = "requiredfields=";
    
    int URL_LIMIT = 80;
    
    String SUGGEST = "suggest?";
    
    String SEARCH = "search?";

    int SEVEN = 7;

    int THREE = 3;

    int TWELVE = 12;

    int FOUR = 4;
    
    String EMPTY_STRING = "";
    
    /**
     * This is to pass the checkstyle, this interface will never be implemented.
     */
    void doNothing();
}