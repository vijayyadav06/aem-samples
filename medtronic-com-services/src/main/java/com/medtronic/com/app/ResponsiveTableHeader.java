package com.medtronic.com.app;

import com.adobe.cq.sightly.WCMUse;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by ryanmccullough on 2015-11-26.
 */
public class ResponsiveTableHeader extends WCMUse {
    private static final Logger LOG = LoggerFactory.getLogger(ResponsiveTable.class);

    /* Dialog Properties */
    public static final String PROP_DISABLE_SORT = "disableSort";
    public static final String PROP_TITLE = "title";

    /* Dialog Defaults */
    private static final Boolean DEFAULT_DISABLE_SORT = false;

    private static final int[] priorityMap = new int[]{1,1,2,3,4,5,6,6,6};

    /* Property Values */
    private String title;
    private int priority = -1;
    private Boolean disableSort;

    @Override
    public void activate() {
        ValueMap properties = getProperties();
        disableSort = properties.get(PROP_DISABLE_SORT, DEFAULT_DISABLE_SORT);
        title = properties.get(PROP_TITLE, getWcmMode().isDisabled() ? " ":"Enter Column Header");
        initPriority();
    }

    private void initPriority(){
        //Get priority from node name
        int colNum = ResponsiveTable.getColumnNumberFromName(getResource().getName());
        if( colNum > priorityMap.length) {
            colNum = priorityMap.length;
        }
        priority = priorityMap[colNum - 1];
    }

    public int getPriority(){
        return priority;
    }

    public String getTitle(){
        return title;
    }

    public Boolean getIsSortable(){
        return !disableSort;
    }

    /*
        had to do some funky stuff for it to work as expected in edit mode.
        For edit mode, we use a "div" (and dont unwrap the including th element)
        For non-edit mode, we use "th" (and unwrap the including th element)
     */
    public String getElement() {
        return getWcmMode().isEdit() ? "div":"th";
    }
}
