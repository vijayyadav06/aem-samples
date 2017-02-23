
package com.medtronic.com.services;

import org.apache.felix.scr.annotations.*;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.osgi.framework.Constants;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.UnknownHostException;
import java.util.Dictionary;

/**
 * Created by ryanmccullough on 2016-01-10. This service will query a Medtronic Proxy Server for social media feed data
 * It returns a JsonArray of the accounts recent posts based on the passed in account name and type.
 */
@Component(metatype = true, label = "Medtronic.com -  Social Media  Service ", immediate = true)
@Properties({ @Property(name = Constants.SERVICE_DESCRIPTION, value = "Medtronic - Social Media Service"),
        @Property(name = Constants.SERVICE_VENDOR, value = "Medtronic"),
        @Property(name = Constants.SERVICE_RANKING, intValue = 100) })
@Service(SocialMediaService.class)
public class SocialMediaService {

    private static final Logger LOG = LoggerFactory.getLogger(SocialMediaService.class);

    // Defaults for OSGi Configured Variables
    private static final String SOCIAL_CONNECT_SERVICE_URL_DEFAULT = "http://www.medtronic.com/wsq/socialMedia?";
    private static final int READ_TIMEOUT_DEFAULT = 7000;
    private static final int CONNECTION_TIMEOUT_DEFAULT = 7000;

    // Variables the OSGi Configurations are stored in
    private static String socialMediaUrl;
    private static int connectionTimeout;
    private static int readTimeout;

    // OSGi Properties and their defaults
    @Property(label = "Social Media URL", value = SOCIAL_CONNECT_SERVICE_URL_DEFAULT, description = "URL to get Social connect details")
    public static final String SOCIAL_CONNECT_SERVICE_URL = "socialMediaUrl";

    @Property(label = "Connection Timeout", intValue = CONNECTION_TIMEOUT_DEFAULT, description = "Amount of time (in ms) until firing a Connection Timout on Social Media Proxy Server.")
    public static final String CONNECTION_TIMEOUT = "connectionTimeout";

    @Property(label = "Read Timeout", intValue = READ_TIMEOUT_DEFAULT, description = "Amount of time (in ms) until firing a Read Timeout on Social Media Proxy Server.")
    public static final String READ_TIMEOUT = "readTimeout";

    public static JsonNode getPostsJson(String accountName,
                                        String accountType) {
        LOG.debug("Getting social feed for account: {}", accountName);
        accountName = accountName.replaceAll("\\s+", "");
        LOG.debug("accountName: {}" + accountName);

        // forming service URL for each independent account
        String serviceEndpoint = socialMediaUrl + "type=" + accountType + "&account=" + accountName;
        LOG.debug("ServiceEndPoint:::::" + serviceEndpoint);

        // face book service call for each account
        String responseAsString = getMediaFeed(serviceEndpoint);
        LOG.debug("{} JSONResponse: {}", accountType, responseAsString);

        return getJSONFromResponseString(responseAsString);

    }

    private static JsonNode getJSONFromResponseString(String jsonResponse) {
        JsonNode rootNode = null;
        if (null != jsonResponse && !jsonResponse.isEmpty()) {
            try {
                ObjectMapper objectMapper = new ObjectMapper();
                rootNode = objectMapper.readTree(jsonResponse);
            } catch (IOException ioe) {
                LOG.error("IOException getting social media feeds:", ioe);
            }
        }
        return rootNode;
    }

    /**
     * This method invokes the service
     * 
     * @param serviceUrl
     * @return String
     */
    private static String getMediaFeed(String serviceUrl) {
        java.net.URL url = null;
        HttpURLConnection conn = null;
        InputStream is = null;
        StringBuffer response = new StringBuffer();
        BufferedReader in = null;
        try {

            url = new java.net.URL(serviceUrl);

            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Accept", "application/json");
            conn.setRequestProperty("charset", "utf-8");
            conn.setConnectTimeout(connectionTimeout);
            conn.setReadTimeout(readTimeout);
            is = conn.getInputStream();
            int responseCode = conn.getResponseCode();
            LOG.info("Response Code: {}", responseCode);

            in = new BufferedReader(new InputStreamReader(is, "utf-8"));
            if (null != in) {
                String inputLine;
                while ((inputLine = in.readLine()) != null) {
                    response.append(inputLine);
                }
                in.close();
            }
        } catch (UnknownHostException uhe) {
            String connTimeOutResponse = "{" + "\"error\":" + "\"Medtronic Inc. is experiencing downtime\"" + "}";
            LOG.error("Error while getting the details from service : {}", uhe);
            return connTimeOutResponse;

        } catch (IOException ioe) {

            String connTimeOutResponse = "{" + "\"error\":" + "\"Medtronic Inc. is experiencing downtime\"" + "}";
            LOG.error("Error while getting the details from service url: {}", ioe);
            return connTimeOutResponse;
        } finally {
            try {
                if (null != in) {
                    in.close();
                }
            } catch (IOException e) {
                LOG.info("Issue closing connection for social media.");
            }
            if (null != conn) {
                conn.disconnect();
            }
        }
        return response.toString();
    }

    private void setProperties(ComponentContext context) {
        Dictionary properties = context.getProperties();
        socialMediaUrl = PropertiesUtil.toString(properties.get(SOCIAL_CONNECT_SERVICE_URL),
                SOCIAL_CONNECT_SERVICE_URL_DEFAULT);
        readTimeout = PropertiesUtil.toInteger(properties.get(READ_TIMEOUT), READ_TIMEOUT_DEFAULT);
        connectionTimeout = PropertiesUtil.toInteger(properties.get(CONNECTION_TIMEOUT), CONNECTION_TIMEOUT_DEFAULT);
    }

    @Activate
    protected void activate(ComponentContext context) {
        if (LOG.isDebugEnabled()) {
            LOG.debug("Social Media Service Activated");
        }
        setProperties(context);
    }

    @Modified
    protected void modified(ComponentContext context) {
        if (LOG.isDebugEnabled()) {
            LOG.debug("Social Media Service Modified");
        }
        setProperties(context);
    }
}
