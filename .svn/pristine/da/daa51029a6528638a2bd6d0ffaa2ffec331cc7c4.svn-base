package com.medtronic.com.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by rmccullough on 2015-09-10.
 */
public final class MedtronicComUtil {
    private static final Logger LOG = LoggerFactory.getLogger(MedtronicComUtil.class);

    /**
     * Converts json string to list<Map<String, String>>.
     * 
     * @param resource - resource
     * @param name - property name
     * @return List
     */
    public static List<Map<String, String>> getInheritedMultiFieldPanelValues(final Resource resource, final String name) {
        final InheritanceValueMap map = new HierarchyNodeInheritanceValueMap(resource);
        final ArrayList<Map<String, String>> results = new ArrayList<Map<String, String>>();
        final String[] values = map.getInherited(name,new String[0]);
        if(values.length > 0) {
            final int length = values.length;

            for(int i = 0; i < length; ++i) {
                final String value = values[i];
                try {
                    final JSONObject jsonValues = new JSONObject(value);
                    final Map<String, String> columnMap = new HashMap<String, String>();
                    final Iterator<String> iter = jsonValues.keys();

                    while(iter.hasNext()) {
                        final String propKey = (String)iter.next();
                        final String propValue = jsonValues.getString(propKey);
                        columnMap.put(propKey, propValue);
                    }

                    results.add(columnMap);
                } catch (JSONException var14) {
                    LOG.error(String.format("Unable to parse JSON in %s property of %s", new Object[]{name, resource.getPath()}), var14);
                }
            }
        }

        return results;
    }

    private MedtronicComUtil(){
        
    }
}
