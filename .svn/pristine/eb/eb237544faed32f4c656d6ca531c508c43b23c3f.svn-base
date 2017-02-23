
package com.medtronic.com.app;

import java.util.ArrayList;
import java.util.List;

import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;

/**
 * This is Similar Content java used for Similar Content Component.
 * 
 * @author fredy.xue
 */
public class SimilarContent extends WCMUse {

    /** The Constant LOG. */
    private static final Logger LOG = LoggerFactory.getLogger(SimilarContent.class);

    private String[] similarContentJson;

    @Override
    public void activate() throws Exception {
        similarContentJson = getProperties().get("imageText", new String[] {});
    }

    /**
     * Generates a list of {@link SimilarContentObject} from the multifield json stored in the imageText property.
     * 
     * @return the parsed list of similar content
     */
    public List<SimilarContentObject> getSimilarList() {
        final List<SimilarContentObject> similarList = new ArrayList<SimilarContentObject>();

        for (String json : similarContentJson) {
            try {
                final JSONObject jsonObject = new JSONObject(json);
                final String image = jsonObject.getString("image");
                final String text = jsonObject.getString("text");
                final String name = jsonObject.getString("name");
                final StringBuilder link = new StringBuilder(jsonObject.getString("link"));
                if (link.toString().startsWith("/content")) {
                    final int index = link.lastIndexOf(".");
                    if (index < 0) {
                        link.append(".html");
                    }
                } else if (!link.toString().equalsIgnoreCase("")
                        && !(link.toString().startsWith("http://") || link.toString().startsWith("https://"))) {
                    link.insert(0, "http://");
                }
                similarList.add(new SimilarContentObject(image, text, name, link.toString()));
            } catch (JSONException e) {
                LOG.error("Problem parsing JSON", e);
            }
        }
        return similarList;
    }
}
