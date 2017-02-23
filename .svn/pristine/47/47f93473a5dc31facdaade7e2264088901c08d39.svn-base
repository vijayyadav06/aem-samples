package com.medtronic.com.services.impl;

import java.util.Dictionary;

import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Modified;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.osgi.framework.Constants;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.medtronic.com.services.FlowplayerConfigService;

@Component(metatype = true, label = "Medtronic.com -  Flowplayer Config Service ", immediate = true)
@Service
@Properties({ @Property(name = Constants.SERVICE_DESCRIPTION, value = "Medtronic - Flowplayer Config Service"),
        @Property(name = Constants.SERVICE_VENDOR, value = "Medtronic"),
        @Property(name = Constants.SERVICE_RANKING, intValue = 100) })
public class FlowplayerConfigServiceImpl implements FlowplayerConfigService {
    
    /** The Constant LOG. */
    private static final Logger LOG = LoggerFactory.getLogger(FlowplayerConfigServiceImpl.class);
    
    private static final String FLOWPLAYER_KEY_DEFAULT = "";
    
    private static final String FLOWPLAYER_ANALYTICS_KEY_DEFAULT = "";

    private String flowplayerKey;

    private String flowplayerAnalyticsKey;
    
    @Property(label = "Flowplayer Config Key", value = FLOWPLAYER_KEY_DEFAULT, description = "Flowplayer config key.")
    public static final String FLOWPLAYER_KEY = "flowplayerKey";

    @Property(label = "Flowplayer Config Anaylytics Key", value = FLOWPLAYER_ANALYTICS_KEY_DEFAULT, description = "Flowplayer analytics key.")
    public static final String FLOWPLAYER_ANALYTICS_KEY = "flowplayerAnalyticsKey";

    @Override
    public String getFlowplayerKey() {
        return flowplayerKey;
    }

    @Override
    public String getFlowplayerAnalyticsKey() {
        return flowplayerAnalyticsKey;
    }
    
    /**
     * Sets the properties.
     *
     * @param context
     *            the new properties
     */
    private void setProperties(final ComponentContext context) {
        @SuppressWarnings("rawtypes")
        final Dictionary properties = context.getProperties();
        flowplayerKey = PropertiesUtil.toString(properties.get(FLOWPLAYER_KEY), FLOWPLAYER_KEY_DEFAULT);
        flowplayerAnalyticsKey = PropertiesUtil.toString(properties.get(FLOWPLAYER_ANALYTICS_KEY), FLOWPLAYER_ANALYTICS_KEY_DEFAULT);
    }

    /**
     * Activate.
     *
     * @param context
     *            the context
     */
    @Activate
    protected void activate(final ComponentContext context) {
        LOG.debug("Flowplayer Service Activated");
        setProperties(context);
    }
    
    /**
     * Modified.
     *
     * @param context
     *            the context
     */
    @Modified
    protected void modified(final ComponentContext context) {
        LOG.debug("Flowplayer Service Activated");
        setProperties(context);
    }
}