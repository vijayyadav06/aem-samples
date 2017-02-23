/*
package com.medtronic.com.app;

import java.io.IOException;
import java.util.List;

import org.apache.commons.lang.ArrayUtils;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.adobe.cq.sightly.WCMUse;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ Footer.class, WCMUse.class, FooterLinkObject.class })
public class FooterTest {

    private Footer footer;

    @Mock
    private ValueMap properties;

    private JSONObject footerJSONData1 = new JSONObject();
    private JSONObject footerJSONData2 = new JSONObject();

    private static final String LINK_COLUMNS1 = "linkColumns1";
    private static final String LINK_COLUMNS2 = "linkColumns2";
    private static final String LINK_COLUMNS3 = "linkColumns3";
    private static final String LINK_COLUMNS4 = "linkColumns4";
    private static final String SOCIAL_CHANNELS = "socialChannels";
    private static final String FOOTER_LINKS = "footerLinks";
    private static final String COPYRIGHT = "copyright";

    private static final String LINK_TEXT = "linkText";
    private static final String LINK_URL = "linkURL";
    private static final String LINK_FONT_WEIGHT = "fontWeight";
    private static final String LINK_NEW_TAB = "newTab";

    private final String TEXT = "Link CTA";
    private final String URL = "/content/medtronic-com/en-us/base-page1";
    private final String NEW_TAB = "true";
    private final String BOLD = "bold";
    private final String ITALIC = "italic";
    private final String MEDTRONIC = "Medtronic";

    @Before
    public void setUp() throws Exception {
        footer = Mockito.spy(new Footer());

        footerJSONData1.put(LINK_TEXT, TEXT);
        footerJSONData1.put(LINK_URL, URL);
        footerJSONData1.put(LINK_NEW_TAB, NEW_TAB);
        footerJSONData1.put(LINK_FONT_WEIGHT, BOLD);

        footerJSONData2.put(LINK_TEXT, TEXT);
        footerJSONData2.put(LINK_URL, URL);
        footerJSONData2.put(LINK_NEW_TAB, NEW_TAB);
        footerJSONData2.put(LINK_FONT_WEIGHT, ITALIC);

        PowerMockito.doReturn(properties).when(footer).getProperties();
        footer.activate();
    }

    @Test
    public void getLinkColumns1() throws IOException, JSONException {

        String[] jsonData = { footerJSONData1.toString(), footerJSONData2.toString() };

        // behavior
        Mockito.when(properties.get(LINK_COLUMNS1, ArrayUtils.EMPTY_STRING_ARRAY)).thenReturn(jsonData);

        // stimulus
        List<FooterLinkObject> footerLinks = footer.getLinkColumns1();

        // assert
        Assert.assertNotNull(footerLinks);
        Assert.assertEquals(jsonData.length, footerLinks.size());

        Mockito.verify(properties).get(LINK_COLUMNS1, ArrayUtils.EMPTY_STRING_ARRAY);
    }

    @Test
    public void getLinkColumns2() throws IOException, JSONException {

        String[] jsonData = { footerJSONData1.toString(), footerJSONData2.toString() };

        // behavior
        Mockito.when(properties.get(LINK_COLUMNS2, ArrayUtils.EMPTY_STRING_ARRAY)).thenReturn(jsonData);

        // stimulus
        List<FooterLinkObject> footerLinks = footer.getLinkColumns2();

        // assert
        Assert.assertNotNull(footerLinks);
        Assert.assertEquals(jsonData.length, footerLinks.size());

        Mockito.verify(properties).get(LINK_COLUMNS2, ArrayUtils.EMPTY_STRING_ARRAY);
    }

    @Test
    public void getLinkColumns3() throws IOException, JSONException {

        String[] jsonData = { footerJSONData1.toString(), footerJSONData2.toString() };

        // behavior
        Mockito.when(properties.get(LINK_COLUMNS3, ArrayUtils.EMPTY_STRING_ARRAY)).thenReturn(jsonData);

        // stimulus
        List<FooterLinkObject> footerLinks = footer.getLinkColumns3();

        // assert
        Assert.assertNotNull(footerLinks);
        Assert.assertEquals(jsonData.length, footerLinks.size());

        Mockito.verify(properties).get(LINK_COLUMNS3, ArrayUtils.EMPTY_STRING_ARRAY);
    }

    @Test
    public void getLinkColumns4() throws IOException, JSONException {

        String[] jsonData = { footerJSONData1.toString(), footerJSONData2.toString() };

        // behavior
        Mockito.when(properties.get(LINK_COLUMNS4, ArrayUtils.EMPTY_STRING_ARRAY)).thenReturn(jsonData);

        // stimulus
        List<FooterLinkObject> footerLinks = footer.getLinkColumns4();

        // assert
        Assert.assertNotNull(footerLinks);
        Assert.assertEquals(jsonData.length, footerLinks.size());

        Mockito.verify(properties).get(LINK_COLUMNS4, ArrayUtils.EMPTY_STRING_ARRAY);
    }

    @Test
    public void getSocialChannels() throws IOException, JSONException {

        String[] jsonData = { footerJSONData1.toString(), footerJSONData2.toString() };

        // behavior
        Mockito.when(properties.get(SOCIAL_CHANNELS, ArrayUtils.EMPTY_STRING_ARRAY)).thenReturn(jsonData);

        // stimulus
        List<FooterLinkObject> footerLinks = footer.getSocialChannels();

        // assert
        Assert.assertNotNull(footerLinks);
        Assert.assertEquals(jsonData.length, footerLinks.size());

        Mockito.verify(properties).get(SOCIAL_CHANNELS, ArrayUtils.EMPTY_STRING_ARRAY);
    }

    @Test
    public void getFooterLinks() throws IOException, JSONException {

        String[] jsonData = { footerJSONData1.toString(), footerJSONData2.toString() };

        // behavior
        Mockito.when(properties.get(FOOTER_LINKS, ArrayUtils.EMPTY_STRING_ARRAY)).thenReturn(jsonData);

        // stimulus
        List<FooterLinkObject> footerLinks = footer.getFooterLinks();

        // assert
        Assert.assertNotNull(footerLinks);
        Assert.assertEquals(jsonData.length, footerLinks.size());

        Mockito.verify(properties).get(FOOTER_LINKS, ArrayUtils.EMPTY_STRING_ARRAY);
    }

    @Test
    public void getCopyright() throws IOException, JSONException {

        // behavior
        Mockito.when(properties.get(properties.get(COPYRIGHT, String.class))).thenReturn(MEDTRONIC);

        // stimulus
        String copyright = footer.getCopyright();

        // assert
        Assert.assertNotSame(MEDTRONIC, copyright);

        Mockito.verify(properties, Mockito.times(2)).get(COPYRIGHT, String.class);
    }

    @Test(expected = JSONException.class)
    public void testExceptionHandling() throws IOException, JSONException {

        footerJSONData1.remove(LINK_FONT_WEIGHT);

        String[] dataJson = { footerJSONData1.toString() };

        for (String data : dataJson) {
            final JSONObject jsonObject = new JSONObject(data);
            Mockito.when(jsonObject.getString(LINK_FONT_WEIGHT)).thenThrow(JSONException.class);
            Mockito.doThrow(JSONException.class);
        }
        Mockito.verify(JSONException.class);

    }
}
*/