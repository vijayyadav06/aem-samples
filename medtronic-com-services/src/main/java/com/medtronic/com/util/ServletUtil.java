package com.medtronic.com.util;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * The Class ServletUtil.
 */
public final class ServletUtil {
    
    private ServletUtil(){
        
    }
    
    private static final Logger LOG = LoggerFactory.getLogger(ServletUtil.class);
    
    /**
     * Gets the parameter.
     *
     * @param request the request
     * @param paramName the param name
     * @return the parameter
     */
    public static String getParameter(final HttpServletRequest request, final String paramName) {
        final String param = request.getParameter(paramName);
        
        if (param != null) {
            try {
                return new String(param.getBytes("ISO-8859-1"), "UTF-8");
            } catch (UnsupportedEncodingException e) {
                LOG.error("An error occured when decoding request parameter: {}", paramName, e);
            }
        }
        return null;
    }
}
