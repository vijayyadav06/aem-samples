/*package com.medtronic.com.app;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.List;
import java.util.Locale;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;
import org.mockito.verification.VerificationMode;
import org.powermock.api.mockito.PowerMockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;
import com.day.cq.dam.api.Asset;
import com.day.cq.dam.api.Rendition;
import com.day.cq.wcm.api.Page;

@RunWith(MockitoJUnitRunner.class)
public class DownloadTest extends WCMUse{
    
    private Download download = new Download();
    
    private JSONObject downloadJSON1 = new JSONObject();
    private JSONObject downloadJSON2 = new JSONObject();
    
    private String JSON_KEY_TITLE = "title";
    private String JSON_KEY_URL = "url";
    private String JSON_KEY_DESCRIPTION = "description";
    private String JSON_KEY_DATE = "publicationDate";

    private String JSON_VALUE_TITLE = "title";
    private String JSON_VALUE_URL = "/content/dam/Images/Environment Setup.pdf/subassets/page1.pdf";
    private String JSON_VALUE_DESCRIPTION = "Description";
    private String JSON_VALUE_DATE = "12/16/15";
    
    List<DownloadAttachment> attachments;
    
    @Mock
    Download spy_download;

    @Mock
    ResourceResolver resourceResolver;
    
    @Mock
    Resource attachmentResource; 
    
    @Mock
    ValueMap properties;

    @Mock
    Asset asset;
    
    @Mock
    Rendition original;
    
    @Mock
    Page currentPage;
    
    @Before
    public void jsonObject() throws Exception{
        MockitoAnnotations.initMocks(this);
        spy_download = PowerMockito.spy(download);
        
        downloadJSON1.put(JSON_KEY_TITLE, JSON_VALUE_TITLE);
        downloadJSON1.put(JSON_KEY_URL, JSON_VALUE_URL);
        downloadJSON1.put(JSON_KEY_DESCRIPTION, JSON_VALUE_DESCRIPTION);
        downloadJSON1.put(JSON_KEY_DATE, JSON_VALUE_DATE);
        
        downloadJSON2.put(JSON_KEY_TITLE, JSON_VALUE_TITLE);
        downloadJSON2.put(JSON_KEY_URL, JSON_VALUE_URL);
        downloadJSON2.put(JSON_KEY_DESCRIPTION, JSON_VALUE_DESCRIPTION);
        downloadJSON2.put(JSON_KEY_DATE, JSON_VALUE_DATE);
        
    }

    @Override
    @Test
    public void activate() throws Exception {
        String[] stringArray = {downloadJSON1.toString(), downloadJSON2.toString()};
        
        PowerMockito.doReturn(resourceResolver).when(spy_download).getResourceResolver();
        PowerMockito.doReturn(properties).when(spy_download).getProperties();
        Mockito.when(properties.get("downloads", String[].class)).thenReturn(stringArray);
        Mockito.when(resourceResolver.getResource(JSON_VALUE_URL)).thenReturn(attachmentResource);
        Mockito.when(attachmentResource.adaptTo(Asset.class)).thenReturn(asset);
        Mockito.when(asset.getOriginal()).thenReturn(original);
        
        spy_download.activate();
        attachments = spy_download.getAttachments();

        assertNotNull(attachments);
        assertEquals(stringArray.length, attachments.size());
        
        Mockito.verify(spy_download, Mockito.times(2)).getResourceResolver();
        Mockito.verify(spy_download).getProperties();
        Mockito.verify(properties).get("downloads", String[].class);
        Mockito.verify(asset, Mockito.times(2)).getOriginal();
        Mockito.verify(resourceResolver, Mockito.times(2)).getResource(JSON_VALUE_URL);
        Mockito.verify(attachmentResource, Mockito.times(2)).adaptTo(Asset.class);
        
    }

}
*/