/*package com.medtronic.com.services;

import static org.mockito.Mockito.when;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.UnknownHostException;
import java.util.Dictionary;
import java.util.Hashtable;

import org.codehaus.jackson.JsonNode;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.osgi.service.component.ComponentContext;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.medtronic.com.constants.SocialMediaConstants;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ URL.class, SocialMediaService.class })
public class SocialMediaServiceTest {

    private SocialMediaService socialMediaService;
    private static final String SOCIAL_CONNECT_SERVICE_URL_DEFAULT = "http://www.medtronic.com/wsq/socialMedia?";
    private static final int READ_TIMEOUT_DEFAULT = 7000;
    private static final int CONNECTION_TIMEOUT_DEFAULT = 7000;
    
    @Mock
    ComponentContext context;
    
    @Before
    public void setUp() throws Exception {       
        socialMediaService = new SocialMediaService();
        
        MockitoAnnotations.initMocks(this);
        Dictionary properties = new Hashtable();
        properties.put(socialMediaService.SOCIAL_CONNECT_SERVICE_URL, SOCIAL_CONNECT_SERVICE_URL_DEFAULT);
        properties.put(socialMediaService.READ_TIMEOUT, READ_TIMEOUT_DEFAULT);
        properties.put(socialMediaService.CONNECTION_TIMEOUT, CONNECTION_TIMEOUT_DEFAULT);
        
        when(context.getProperties()).thenReturn(properties);
        socialMediaService.activate(context);
    }
    
    
    @Test
    public void getPostsJsonTest() throws Exception {
        //input
        String accountName = "testAccount";
        String accountType = SocialMediaConstants.ACCOUNT_TYPE_FACEBOOK;
        String serviceEndpoint = SOCIAL_CONNECT_SERVICE_URL_DEFAULT + "type=" + accountType + "&account=" + accountName;
        String sampleResponce = "{" + "\"success\":" + "\"sample response\"" + "}";
        
        // mock objects
        URL url = PowerMockito.mock(URL.class);
        InputStream is = PowerMockito.mock(InputStream.class);
        InputStreamReader inr = PowerMockito.mock(InputStreamReader.class);
        BufferedReader in = PowerMockito.mock(BufferedReader.class);
        HttpURLConnection conn = PowerMockito.mock(HttpURLConnection.class);
        
        //behaviour
        PowerMockito.whenNew(URL.class).withArguments(Mockito.eq(serviceEndpoint)).thenReturn(url);
        PowerMockito.when(url.openConnection()).thenReturn(conn);
        PowerMockito.when(conn.getInputStream()).thenReturn(is);
        PowerMockito.when(conn.getResponseCode()).thenReturn(200);
        PowerMockito.whenNew(InputStreamReader.class).withArguments(is,"utf-8").thenReturn(inr);
        PowerMockito.whenNew(BufferedReader.class).withArguments(inr).thenReturn(in);
        PowerMockito.when(in.readLine()).thenReturn(sampleResponce).thenReturn(null);
        
        //stimulus
        JsonNode jsonNode = socialMediaService.getPostsJson(accountName, accountType);
        
        //verify
        PowerMockito.verifyNew(URL.class).withArguments(Mockito.eq(serviceEndpoint));
        PowerMockito.verifyNew(InputStreamReader.class).withArguments(is,"utf-8");
        PowerMockito.verifyNew(BufferedReader.class).withArguments(inr);        
        
        //assert
        Assert.assertNotNull(jsonNode);
        Assert.assertEquals("sample response", jsonNode.get("success").getTextValue());
        
    }
    
    @Test
    public void getPostsJsonTest_NullInputStream() throws Exception {
        //input
        String accountName = "testAccount";
        String accountType = SocialMediaConstants.ACCOUNT_TYPE_FACEBOOK;
        String serviceEndpoint = SOCIAL_CONNECT_SERVICE_URL_DEFAULT + "type=" + accountType + "&account=" + accountName;        
        
        //mock objects
        URL url = PowerMockito.mock(URL.class);        
        InputStream is = PowerMockito.mock(InputStream.class);
        InputStreamReader inr = PowerMockito.mock(InputStreamReader.class);
        HttpURLConnection conn = PowerMockito.mock(HttpURLConnection.class);
        
        BufferedReader in = null;
        
        //behaviour
        PowerMockito.whenNew(URL.class).withArguments(Mockito.eq(serviceEndpoint)).thenReturn(url);
        PowerMockito.when(url.openConnection()).thenReturn(conn);
        PowerMockito.when(conn.getInputStream()).thenReturn(is);
        PowerMockito.when(conn.getResponseCode()).thenReturn(200);
        PowerMockito.whenNew(InputStreamReader.class).withArguments(is,"utf-8").thenReturn(inr);
        PowerMockito.whenNew(BufferedReader.class).withArguments(inr).thenReturn(in);
        
        //stimulus
        JsonNode jsonNode = socialMediaService.getPostsJson(accountName, accountType);
        
        //verify
        PowerMockito.verifyNew(URL.class).withArguments(Mockito.eq(serviceEndpoint));
        PowerMockito.verifyNew(InputStreamReader.class).withArguments(is,"utf-8");
        PowerMockito.verifyNew(BufferedReader.class).withArguments(inr);        
        
        //assert
        Assert.assertNull(jsonNode);
        
    }
    
    @Test
    public void getPostsJsonTest_UnknownHostException() throws Exception {
        //input
        String accountName = "testAccount";
        String accountType = SocialMediaConstants.ACCOUNT_TYPE_FACEBOOK;
        String serviceEndpoint = SOCIAL_CONNECT_SERVICE_URL_DEFAULT + "type=" + accountType + "&account=" + accountName;
       
        // mock objects
        URL url = PowerMockito.mock(URL.class);
        
        //behaviour
        PowerMockito.whenNew(URL.class).withArguments(Mockito.eq(serviceEndpoint)).thenReturn(url);
        PowerMockito.doThrow(new UnknownHostException()).when(url).openConnection();
        
        //stimulus
        JsonNode jsonNode = socialMediaService.getPostsJson(accountName, accountType);
        
        //verify
        PowerMockito.verifyNew(URL.class).withArguments(Mockito.eq(serviceEndpoint));
        
        //assert
        Assert.assertNotNull(jsonNode);
        Assert.assertEquals("Medtronic Inc. is experiencing downtime", jsonNode.get("error").getTextValue());
        
    }
    
    @Test
    public void getPostsJsonTest_IOException() throws Exception {
        //input
        String accountName = "testAccount";
        String accountType = SocialMediaConstants.ACCOUNT_TYPE_FACEBOOK;
        String serviceEndpoint = SOCIAL_CONNECT_SERVICE_URL_DEFAULT + "type=" + accountType + "&account=" + accountName;
       
        // mock objects
        URL url = PowerMockito.mock(URL.class);
        
        //behaviour
        PowerMockito.whenNew(URL.class).withArguments(Mockito.eq(serviceEndpoint)).thenReturn(url);
        PowerMockito.doThrow(new IOException()).when(url).openConnection();
        
        //stimulus
        JsonNode jsonNode = socialMediaService.getPostsJson(accountName, accountType);
        
        //verify
        PowerMockito.verifyNew(URL.class).withArguments(Mockito.eq(serviceEndpoint));
        
        //assert
        Assert.assertNotNull(jsonNode);
        Assert.assertEquals("Medtronic Inc. is experiencing downtime", jsonNode.get("error").getTextValue());
        
    }

}
*/