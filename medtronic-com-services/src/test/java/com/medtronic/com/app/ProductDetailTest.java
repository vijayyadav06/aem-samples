/*
package com.medtronic.com.app;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.adobe.acs.commons.widgets.MultiFieldPanelFunctions;
import com.adobe.cq.commerce.common.ValueMapDecorator;
import com.adobe.cq.sightly.WCMUse;
import com.day.cq.wcm.api.Page;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ ProductDetail.class, WCMUse.class, ProductDetailListItem.class })
public class ProductDetailTest {

    public static final String IMAGE_PROPERTY = "image";
    public static final String IMAGE_PATH_PROPERTY = "path";
    public static final String IMAGE_ALTTEXT_PROPERTY = "altText";
    public static final String ISWURL_PROPERTY = "iswURL";
    public static final String PRODUCT_NAME_PROPERTY = "productName";
    public static final String PRODUCT_SUBTITLE_PROPERTY = "productSubTitle";
    public static final String MODEL_SKU_PROPERTY = "modelSku";
    public static final String NUMBER_PROPERTY = "number";
    public static final String ISW_GRAPHIC_PROPERTY = "iswGraphic";
    public static final String ISW_TEXT_PROPERTY = "iswText";
    public static final String NEWTAB_PROPERTY = "newtab";
    public static final String TITLE_PROPERTY = "title";
    public static final String OVERVIEW_TEXT_PROPERTY = "overviewText";
    private static final String AUDIENCE_TYPE_PROPERTY = "pageAudience";

    private final String actualUrl = "/content/medtronic-com/en-us/med-base-page1";
    private final String pageAudience = "patients";

    private ProductDetail productDetail;

    @Mock
    private ValueMap pageProperties;

    @Mock
    private ValueMap properties;

    @Mock
    private Resource resource;

    @Mock
    private Resource contentResource;

    @Mock
    private Page page;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        productDetail = Mockito.spy(new ProductDetail());

        PowerMockito.doReturn(properties).when(productDetail).getProperties();
        PowerMockito.doReturn(resource).when(productDetail).getResource();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put(IMAGE_PROPERTY, new String[] { "{\"text1\":\"text2\"}", "{\"text3\":\"text4\"}" });
        ValueMap vm = new ValueMapDecorator(map);
        Mockito.when(resource.adaptTo(ValueMap.class)).thenReturn(vm);

    }

    @Test
    public void activate() throws Exception {
        List<Map<String, String>> image = MultiFieldPanelFunctions.getMultiFieldPanelValues(resource, IMAGE_PROPERTY);
        Assert.assertEquals(2, image.size());
        Assert.assertEquals(true, image.get(0).containsKey("text1"));
        Assert.assertEquals("text2", image.get(0).get("text1"));
        Assert.assertEquals(true, image.get(1).containsKey("text3"));
        Assert.assertEquals("text4", image.get(1).get("text3"));
        productDetail.activate();
    }

    @Test
    public void testActivateKeyWhichDoesntExist() {
        List<Map<String, String>> actual = MultiFieldPanelFunctions.getMultiFieldPanelValues(resource, "non-existing");
        Assert.assertEquals(0, actual.size());
    }

    @Test
    public void isIswUrl() {
        Mockito.when(properties.get(ISWURL_PROPERTY, String.class)).thenReturn(actualUrl);
        String expectedUrl = actualUrl + ".html";

        String url = productDetail.getIswURL();

        Assert.assertNotSame(url, "/content/medtronic-com/en-us/med-base-page1");
        Assert.assertEquals(url, expectedUrl);
    }

    @Test(expected = NullPointerException.class)
    public void getAudienceType() {
        PowerMockito.doReturn(pageProperties).when(productDetail).getPageProperties();
        PowerMockito.doReturn(page).when(productDetail).getCurrentPage();
        PowerMockito.doReturn(contentResource).when(page).getContentResource();
        Mockito.when(pageProperties.get(AUDIENCE_TYPE_PROPERTY, String.class)).thenReturn(pageAudience);

        String audienceType = productDetail.getAudienceType();

        Assert.assertNotNull(audienceType);

        Mockito.verify(productDetail).getPageProperties();
        Mockito.verify(productDetail).getCurrentPage();
        Mockito.verify(page).getContentResource();
    }

    @Test
    public void getProductName() {
        String productNameExpected = "PEAK PlasmaBlade Device";
        Mockito.when(properties.get(PRODUCT_NAME_PROPERTY, String.class)).thenReturn(productNameExpected);

        String productNameActual = productDetail.getProductName();

        Assert.assertEquals(productNameExpected, productNameActual);

        Mockito.verify(properties).get(PRODUCT_NAME_PROPERTY, String.class);
    }

    @Test
    public void getProductSubTitle() {
        String productSubTitleExpected = "Optional sub-headline.";
        Mockito.when(properties.get(PRODUCT_SUBTITLE_PROPERTY, String.class)).thenReturn(productSubTitleExpected);

        String productSubTitleActual = productDetail.getProductSubTitle();

        Assert.assertEquals(productSubTitleExpected, productSubTitleActual);

        Mockito.verify(properties).get(PRODUCT_SUBTITLE_PROPERTY, String.class);
    }

    @Test
    public void getModelSku() {
        String modelSkuExpected = "5432109876";
        Mockito.when(properties.get(MODEL_SKU_PROPERTY, String.class)).thenReturn(modelSkuExpected);

        String modelSkuActual = productDetail.getModelSku();

        Assert.assertEquals(modelSkuExpected, modelSkuActual);

        Mockito.verify(properties).get(MODEL_SKU_PROPERTY, String.class);
    }

    @Test
    public void getNumber() {
        String numberExpected = "4";
        Mockito.when(properties.get(NUMBER_PROPERTY, String.class)).thenReturn(numberExpected);

        String numberActual = productDetail.getNumber();

        Assert.assertEquals(numberExpected, numberActual);

        Mockito.verify(properties).get(NUMBER_PROPERTY, String.class);
    }

    @Test
    public void getIswGraphic() {
        String iswGraphicExpected = "alternateText";
        Mockito.when(properties.get(ISW_GRAPHIC_PROPERTY, String.class)).thenReturn(iswGraphicExpected);

        String iswGraphicActual = productDetail.getIswGraphic();

        Assert.assertEquals(iswGraphicExpected, iswGraphicActual);

        Mockito.verify(properties).get(ISW_GRAPHIC_PROPERTY, String.class);
    }

    @Test
    public void getIswText() {
        String iswGraphicExpected = "Important Safety Information";
        Mockito.when(properties.get(ISW_TEXT_PROPERTY, String.class)).thenReturn(iswGraphicExpected);

        String iswGraphicActual = productDetail.getIswText();

        Assert.assertEquals(iswGraphicExpected, iswGraphicActual);

        Mockito.verify(properties).get(ISW_TEXT_PROPERTY, String.class);
    }

    @Test
    public void getNewtab() {
        String iswGraphicExpected = "true";
        Mockito.when(properties.get(NEWTAB_PROPERTY, String.class)).thenReturn(iswGraphicExpected);

        String iswGraphicActual = productDetail.getNewtab();

        Assert.assertEquals(iswGraphicExpected, iswGraphicActual);

        Mockito.verify(properties).get(NEWTAB_PROPERTY, String.class);
    }

    @Test
    public void getTitle() {
        String iswGraphicExpected = "Product Overview";
        Mockito.when(properties.get(TITLE_PROPERTY, String.class)).thenReturn(iswGraphicExpected);

        String iswGraphicActual = productDetail.getTitle();

        Assert.assertEquals(iswGraphicExpected, iswGraphicActual);

        Mockito.verify(properties).get(TITLE_PROPERTY, String.class);
    }

    @Test
    public void getOverviewText() {
        String iswGraphicExpected = "Overview Text";
        Mockito.when(properties.get(OVERVIEW_TEXT_PROPERTY, String.class)).thenReturn(iswGraphicExpected);

        String iswGraphicActual = productDetail.getOverviewText();

        Assert.assertEquals(iswGraphicExpected, iswGraphicActual);

        Mockito.verify(properties).get(OVERVIEW_TEXT_PROPERTY, String.class);
    }
}
*/