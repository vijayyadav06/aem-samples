
package com.medtronic.com.app;

import java.util.ArrayList;
import java.util.List;

import com.adobe.acs.commons.widgets.MultiFieldPanelFunctions;
import com.medtronic.com.util.LinkUtil;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONArray;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;

/**
 * This is a ManualRelatedLinks Java file that should be used for converting data to specific format.
 *
 * @author sunny.sima
 *
 */
public class ManualRelatedLinks extends WCMUse {

    private List sectionLinks;
    private String componentHeading;
    private String sectionHeading;

    private static final String COMPONENT_HEADING = "componentHeading";
    private static final String SECTION_HEADING = "sectionHeading";
    private static final String SECTION_LINKS = "sectionLinks";

    @Override
    public void activate() throws Exception {
        ValueMap properties = getProperties();
        if( properties.containsKey(SECTION_LINKS)) {
            sectionLinks = MultiFieldPanelFunctions.getMultiFieldPanelValues(getResource(), SECTION_LINKS);
        }
        componentHeading = properties.get(COMPONENT_HEADING,"");
        sectionHeading = properties.get(SECTION_HEADING,"");
    }

    /**
     * convert sections string to object list.
     *
     * @return - converted list
     */
    public List getSectionLinks() {
        return sectionLinks;
    }

    public String getComponentHeading(){
        return componentHeading;
    }

    public String getSectionHeading(){
        return sectionHeading;
    }

}
