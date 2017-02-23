
package com.medtronic.com.app;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;

/**
 * This is Title text component Java.
 * 
 * @author laura.lao
 */
public class TitleText extends WCMUse {

    private static final Logger LOG = LoggerFactory.getLogger(ProductDetail.class);
    private static final String PROP_TITLE = "title";
    private static final String PROP_TEXT = "text";
    private String[] groupJson = null;

    @Override
    public void activate() throws Exception {
        groupJson = getProperties().get("groups", new String[] {});
    }

    /**
     * This function get groupingList.
     * 
     * @return groupingList
     */
    public List<TitleTextObject> getGroups() {
        List<TitleTextObject> groups = new ArrayList<TitleTextObject>();
        for (int i = 0; i < groupJson.length; i++) {
            TitleTextObject group = parseGroup(groupJson[i]);
            groups.add(group);
        }
        return groups;
    }

    /**
     * Get a titleText component JOSNObject.
     * 
     * @param grouping
     *            (String)
     * @return TitleTextObject(JOSNObject)
     */
    private TitleTextObject parseGroup(String groupJson) {
        TitleTextObject group = null;
        try {
            JSONObject jsonObject = new JSONObject(groupJson);
            String title = jsonObject.getString(PROP_TITLE);
            String text = jsonObject.getString(PROP_TEXT);
            group = new TitleTextObject(title, text);
        } catch (JSONException e) {
            LOG.error("Could not parse group", e);
        }
        return group;
    }
}
