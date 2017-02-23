package com.medtronic.com.app;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.apache.commons.lang.ArrayUtils;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;
import com.medtronic.com.util.LinkUtil;

/**
 * This is a Footer Java file that should be used for converting data.
 * 
 * @author sunny.sima
 *
 */
public class Footer extends WCMUse {
    private static final Logger LOG = LoggerFactory.getLogger(Footer.class);
    private ValueMap properties;
    
    private static final String LINK_COLUMNS1 = "linkColumns1";
    private static final String LINK_COLUMNS2 = "linkColumns2";
    private static final String LINK_COLUMNS3 = "linkColumns3";
    private static final String LINK_COLUMNS4 = "linkColumns4";
    private static final String SOCIAL_CHANNELS = "socialChannels";
    private static final String FOOTER_LINKS = "footerLinks";
    private static final String COPYRIGHT = "copyright";
    private static final String LINK_TEXT = "linkText";
    private static final String SOCIAL_LINK_TEXT = "_DNT_linkText";
    private static final String LINK_URL = "linkURL";
    private static final String FONT_WEIGHT = "_DNT_fontWeight";
    private static final String NEW_TAB = "_DNT_newTab";
    private static final String PARAM = "[]";
    private static final String BLANK_SPACE = " ";

    @Override
    public void activate() throws Exception {
        properties = getProperties();
    }
    
    /**
     * Get Link Column1 List.
     * @return link column1 list
     */
    public List<FooterLinkObject> getLinkColumns1(){
        final String[] column1Json = properties.get(LINK_COLUMNS1, ArrayUtils.EMPTY_STRING_ARRAY);
        final List<FooterLinkObject> linkColumns = parseData(column1Json, true);
        return linkColumns;
    }
    
    /**
     * Get Link Column2 List.
     * @return link column2 list
     */
    public List<FooterLinkObject> getLinkColumns2(){
        final String[] column2Json = properties.get(LINK_COLUMNS2, ArrayUtils.EMPTY_STRING_ARRAY);
        final List<FooterLinkObject> linkColumns = parseData(column2Json, true);
        return linkColumns;
    }
    
    /**
     * Get Link Column3 List.
     * @return link column3 list
     */
    public List<FooterLinkObject> getLinkColumns3(){
        final String[] column3Json = properties.get(LINK_COLUMNS3, ArrayUtils.EMPTY_STRING_ARRAY);
        final List<FooterLinkObject> linkColumns = parseData(column3Json, true);
        return linkColumns;
    }
    
    /**
     * Get Link Column4 List.
     * @return link column4 list
     */
    public List<FooterLinkObject> getLinkColumns4(){
        final String[] column4Json = properties.get(LINK_COLUMNS4, ArrayUtils.EMPTY_STRING_ARRAY);
        final List<FooterLinkObject> linkColumns = parseData(column4Json, true);
        return linkColumns;
    }
    
    /**
     * Get Social Channel List.
     * @return social channel list
     */
    public List<FooterLinkObject> getSocialChannels(){
        final String[] channelsJson = properties.get(SOCIAL_CHANNELS, ArrayUtils.EMPTY_STRING_ARRAY);
        final List<FooterLinkObject> socialChannels = parseSocialData(channelsJson, false);
        return socialChannels;
    }
    
    /**
     * Get Footer Link List.
     * @return footer link list
     */
    public List<FooterLinkObject> getFooterLinks(){
        final String[] linksJson = properties.get(FOOTER_LINKS, ArrayUtils.EMPTY_STRING_ARRAY);
        final List<FooterLinkObject> footerLinks = parseData(linksJson, false);
        return footerLinks;
    }

    /**
     * Get Copyright.
     * @return copyright
     */
    public String getCopyright(){
        final String copyright = properties.get(COPYRIGHT, String.class);
        final Calendar calendar = Calendar.getInstance();
        final int year = calendar.get(Calendar.YEAR);
        final StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append(year);
        stringBuffer.append(BLANK_SPACE);
        stringBuffer.append(copyright);
        return stringBuffer.toString();
    }
    
    /**
     * Convert data.
     * @param dataJson
     * @param hasFontWeight
     * @return formatted data
     */
    private List<FooterLinkObject> parseData(final String[] dataJson, final boolean hasFontWeight){
        final List<FooterLinkObject> footerLinks = new ArrayList<FooterLinkObject>();
        for(String data : dataJson){
            try {
                final JSONObject jsonObject = new JSONObject(data);
                final String text = jsonObject.getString(LINK_TEXT);
                final String url = LinkUtil.getPathfieldURL(jsonObject.getString(LINK_URL));
                final String param = jsonObject.getString(NEW_TAB);
                boolean newTab = true;
                if (PARAM.equals(param)) {
                    newTab = false;
                }
                if(hasFontWeight){
                    final String fontWeight = jsonObject.getString(FONT_WEIGHT);
                    footerLinks.add(new FooterLinkObject(text, url, newTab, fontWeight));
                }else{
                    footerLinks.add(new FooterLinkObject(text, url, newTab));
                }
            } catch (JSONException e) {
                LOG.error("Get json error", e);
            }
        }
        return footerLinks;
    }
    
    /**
     * Convert Social Media data.
     * @param dataJson
     * @param hasFontWeight
     * @return formatted data
     */
    private List<FooterLinkObject> parseSocialData(final String[] dataJson, final boolean hasFontWeight){
        final List<FooterLinkObject> footerLinks = new ArrayList<FooterLinkObject>();
        for(String data : dataJson){
            try {
                final JSONObject jsonObject = new JSONObject(data);
                final String text = jsonObject.getString(SOCIAL_LINK_TEXT);
                final String url = LinkUtil.getPathfieldURL(jsonObject.getString(LINK_URL));
                final String param = jsonObject.getString(NEW_TAB);
                boolean newTab = true;
                if (PARAM.equals(param)) {
                    newTab = false;
                }
                if(hasFontWeight){
                    final String fontWeight = jsonObject.getString(FONT_WEIGHT);
                    footerLinks.add(new FooterLinkObject(text, url, newTab, fontWeight));
                }else{
                    footerLinks.add(new FooterLinkObject(text, url, newTab));
                }
            } catch (JSONException e) {
                LOG.error("Get json error", e);
            }
        }
        return footerLinks;
    }
}
