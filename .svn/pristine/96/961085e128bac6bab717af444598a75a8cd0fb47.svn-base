package com.medtronic.com.util;

import com.adobe.cq.sightly.WCMUse;

import java.util.List;
import java.util.Map;

import com.adobe.acs.commons.widgets.MultiFieldPanelFunctions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by ryanmccullough on 2015-12-16.
 *
 * Class to access an ACS (Composite) multifield property from a data-sly-use context
 */
public class ACSMultiFieldUseUtil extends WCMUse {
    private static final Logger log = LoggerFactory.getLogger(ACSMultiFieldUseUtil.class);

    String property;
    @Override
    public void activate() throws Exception{
        property = get("property",String.class);
    }

    @SuppressWarnings("unused")
    public List<Map<String,String>> getMultifieldValues(){
        log.debug("Getting Multifield Property [{}] from Resource Path: [{}]", property,getResource().getPath());
        return MultiFieldPanelFunctions.getMultiFieldPanelValues(getResource(), property);
    }
}
