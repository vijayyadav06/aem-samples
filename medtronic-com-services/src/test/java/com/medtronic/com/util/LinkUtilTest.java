/*
package com.medtronic.com.util;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.adobe.cq.sightly.WCMUse;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ LinkUtil.class, WCMUse.class })
public class LinkUtilTest {

    private String pathHttp = "www.google.com";
    private String expectedPathHttp = "http://www.google.com";
    private String internalPath = "/content/medtronic-com/en-us/base-page1";
    private String expectedInternalPath = "/content/medtronic-com/en-us/base-page1.html";

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getInternalPathfieldURL() {

        // stimulus
        String modifiedURL = LinkUtil.getPathfieldURL(internalPath);

        // assert
        Assert.assertEquals(expectedInternalPath, modifiedURL);

    }
    
    @Test
    public void getHttpPathfieldURL() {

        // stimulus
        String modifiedURL = LinkUtil.getPathfieldURL(pathHttp);

        // assert
        Assert.assertEquals(expectedPathHttp, modifiedURL);

    }

}
*/