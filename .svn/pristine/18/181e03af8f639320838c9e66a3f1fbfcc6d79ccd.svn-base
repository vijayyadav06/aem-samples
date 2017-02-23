package com.medtronic.com.app;

import com.adobe.cq.sightly.WCMUse;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * This is Press Release Header java used for Press Release Header Component.
 */
public class PressReleaseHeader extends WCMUse {

    private static final Logger LOG = LoggerFactory.getLogger(PressReleaseHeader.class);

    private String[] secondaryLogosJson;

    @Override
    public void activate() throws Exception {
        secondaryLogosJson = getProperties().get("secondaryLogos", new String[] {});
    }

    /**
     * Generates a list of image/text values from the multifield json stored in the secondaryLogos property.
     * @return the parsed list of logo info
     */
    public List<Map<String, String>> getSecondaryLogoList() {
        final List<Map<String, String>> secondaryLogoList = new ArrayList<>();

        for (String json : secondaryLogosJson) {
            try {
                final JSONObject jsonObject = new JSONObject(json);
                Map<String, String> map = new HashMap<>();
                final String image = jsonObject.getString("image");
                final String text = jsonObject.getString("text");
                map.put("image", image);
                map.put("text", text);
                secondaryLogoList.add(map);
            } catch (JSONException e) {
                LOG.error("Problem parsing JSON", e);
            }
        }
        return secondaryLogoList;
    }
}
