
package com.medtronic.com.app;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;

/**
 * @author sunny.sima
 */
public class AuthorableText extends WCMUse {

    private static final Logger log = LoggerFactory.getLogger(AuthorableText.class);
    private String[] multiText = null;
    private String type = null;
    private String url = null;
    private String btnText = null;
    private List<Content> contents = new ArrayList<Content>();

    @Override
    public void activate() throws Exception {
        type = get("type", String.class);
        if (!"".equals(type) && type != null) {
            if ("headline".equals(type)) {
                multiText = getProperties().get("headline", new String[] {});
                url = getProperties().get("headlineBtnUrl", new String());
                btnText = getProperties().get("headlineBtnText", new String());
            } else if ("inspirational".equals(type)) {
                multiText = getProperties().get("text", new String[] {});
                url = getProperties().get("inspirationalBtnUrl", new String());
                btnText = getProperties().get("inspirationalBtnText", new String());
            }
        }
    }

    public String getPageURL() {
        StringBuffer pageURL = new StringBuffer(url);
        if (pageURL.toString().startsWith("/content")) {
            final int index = pageURL.lastIndexOf(".");
            if (index < 0) {
                pageURL.append(".html");
            }
        } else if (!"".equalsIgnoreCase(pageURL.toString())
                && !(pageURL.toString().startsWith("http://") || pageURL.toString().startsWith("https://"))) {

            if (pageURL.toString().startsWith("/")) {
                pageURL.insert(0, "http:/");
            } else {
                pageURL.insert(0, "http://");
            }
        }
        return pageURL.toString();
    }

    public String getButtonText() {
        if (!"".equals(btnText) && btnText != null) {
            return btnText.toUpperCase();
        } else {
            return "";
        }
    }

    public List<Content> getContents() {
        if (!"".equals(type) && type != null) {
            if (multiText != null && multiText.length != 0) {
                String textName = null;
                String colorName = null;
                String fontName = null;
                if ("headline".equals(type)) {
                    textName = "headingText";
                    colorName = "headlineColor";
                    fontName = "headlineFont";
                } else if ("inspirational".equals(type)) {
                    textName = "inspirationalText";
                    colorName = "inspirationalColor";
                    fontName = "inspirationalFont";
                }
                if (!"".equals(textName) && textName != null && !"".equals(colorName) && colorName != null
                        && !"".equals(fontName) && fontName != null) {
                    addItem(textName, colorName, fontName);
                }
            }
        }
        return contents;
    }

    private void addItem(String textName,
                         String colorName,
                         String fontName) {
        try {
            for (int i = 0; i < multiText.length; i++) {
                JSONObject jsonObject = new JSONObject(multiText[i]);
                String text = jsonObject.getString(textName);
                String color = jsonObject.getString(colorName);
                String font = jsonObject.getString(fontName);
                Content content = new Content(text, color, font);
                contents.add(content);
            }
        } catch (JSONException e) {
            log.error("Get Json Error: " + e.getMessage());
        }
    }
}
