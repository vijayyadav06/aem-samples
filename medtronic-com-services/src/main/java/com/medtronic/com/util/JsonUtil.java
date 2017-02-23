package com.medtronic.com.util;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * The Class JsonUtil.
 */
public final class JsonUtil {
    
    /**
     * Instantiates a new json util.
     */
    private JsonUtil() {
        
    }
    /** The Constant mapper. */
    public static final ObjectMapper mapper = new ObjectMapper();
}
