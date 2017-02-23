/*
package com.medtronic.com.util;

import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.junit.Assert;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.adobe.cq.sightly.WCMUse;
import com.adobe.granite.i18n.LocaleUtil;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;

@RunWith(PowerMockRunner.class)
@PrepareForTest({ URL.class, LanguageUseUtil.class, LocaleUtil.class,MedtronicComUtil.class, LinkUtil.class })
public class LanguageUseUtilTest {

    private LanguageUseUtil languageUseUtil;

    private static final String COUNTRY_INPUT = "country";
    private static final String LANGUAGE_INPUT = "language";
    private static final String COUNTRY_SELECT_PROPERTY = "countries";
    private static final String COUNTRY_SELECT_LANGUAGE = "languageName";
    private static final String COUNTRY_NUM_LANGUAGES = "numLanguages";
    private static final String COUNTRY_SELECT_URL = "url";
    private static final String COUNTRY_SELECT_LOCALE = "locale";
    private static final String COUNTRY_SELECT_STATE = "selected";
    // the datasource_country and language are the values found under LANGUAGE_DATASOURCE_ROOT of the given locale
    private static final String DATASOURCE_COUNTRY = "country";
    private static final String DATASOURCE_LANGUAGE = "language";
    private static final String LANGUAGE_DATASOURCE_ROOT = "/etc/designs/medtronic-com/languages";
    private static final String DEFAULT_LOCALE = "en_US";
    private static final String EMPTY_STRING = "";

    @Mock
    Page page;
    @Mock
    ResourceResolver resourceResolver;
    @Mock
    Resource pageResource;
    @Mock
    Resource langRoot;
    @Mock
    Resource langResource;
    @Mock
    ValueMap jcrLanguage;
    @Mock
    HierarchyNodeInheritanceValueMap inheritanceValueMap;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        PowerMockito.mockStatic(LocaleUtil.class);
        PowerMockito.mockStatic(MedtronicComUtil.class);
        PowerMockito.mockStatic(LinkUtil.class);
        // behavior
        Mockito.when(page.adaptTo(ResourceResolver.class)).thenReturn(resourceResolver);
        Mockito.when(page.getContentResource()).thenReturn(pageResource);
        PowerMockito.whenNew(HierarchyNodeInheritanceValueMap.class).withArguments(pageResource)
                .thenReturn(inheritanceValueMap);
        Mockito.when(inheritanceValueMap.getInherited(JcrConstants.JCR_LANGUAGE, String.class)).thenReturn("en_us");
        languageUseUtil = LanguageUseUtil.getInstance(page);
    }

    @Test
    public void getInstanceTest() throws Exception {
        // verify
        Mockito.verify(page).adaptTo(ResourceResolver.class);
        Mockito.verify(page).getContentResource();
        PowerMockito.verifyNew(HierarchyNodeInheritanceValueMap.class).withArguments(pageResource);
        Mockito.verify(inheritanceValueMap).getInherited(JcrConstants.JCR_LANGUAGE, String.class);
    }

    @Test
    public void activateTest() throws Exception {
        // input
        String country = "UnitedStates";
        String language = "English";
        LanguageUseUtil spyLanguageUseUtil = Mockito.spy(languageUseUtil);
        // behavior
        Mockito.doReturn(country).when((WCMUse) spyLanguageUseUtil).get(COUNTRY_INPUT, String.class);
        Mockito.doReturn(language).when((WCMUse) spyLanguageUseUtil).get(LANGUAGE_INPUT, String.class);
        // stimulus
        spyLanguageUseUtil.activate();
        // verify
        Mockito.verify((WCMUse) spyLanguageUseUtil).get(COUNTRY_INPUT, String.class);
        Mockito.verify((WCMUse) spyLanguageUseUtil).get(LANGUAGE_INPUT, String.class);
    }

    @Test
    public void activateTest_EmptyInput() throws Exception {
        // input
        String country = "";
        String language = "";
        LanguageUseUtil spyLanguageUseUtil = Mockito.spy(languageUseUtil);
        // behavior
        Mockito.doReturn(country).when((WCMUse) spyLanguageUseUtil).get(COUNTRY_INPUT, String.class);
        Mockito.doReturn(language).when((WCMUse) spyLanguageUseUtil).get(LANGUAGE_INPUT, String.class);
        // stimulus
        spyLanguageUseUtil.activate();
        // verify
        PowerMockito.verifyNew(HierarchyNodeInheritanceValueMap.class, Mockito.times(2)).withArguments(pageResource);
        Mockito.verify(inheritanceValueMap, Mockito.times(2)).getInherited(JcrConstants.JCR_LANGUAGE, String.class);
    }

    @Test(expected = Exception.class)
    public void activateTest_Exception() throws Exception {
        // input
        LanguageUseUtil spyLanguageUseUtil = Mockito.spy(languageUseUtil);
        // behavior
        Mockito.doThrow(Exception.class).when((WCMUse) spyLanguageUseUtil).get(COUNTRY_INPUT, String.class);
        // stimulus
        spyLanguageUseUtil.activate();
    }

    @Test
    public void getPageLanguageTest() throws Exception {
        // input
        String country = "UnitedStates";
        String language = "English";
        LanguageUseUtil spyLanguageUseUtil = Mockito.spy(languageUseUtil);
        // behavior
        Mockito.doReturn(country).when((WCMUse) spyLanguageUseUtil).get(COUNTRY_INPUT, String.class);
        Mockito.doReturn(language).when((WCMUse) spyLanguageUseUtil).get(LANGUAGE_INPUT, String.class);
        spyLanguageUseUtil.activate();
        // stimulus
        Locale locale = spyLanguageUseUtil.getPageLanguage();
        // Assert
        Assert.assertEquals("UNITEDSTATES", locale.getCountry());
        Assert.assertEquals("english", locale.getLanguage());
    }

    @Test
    public void getPageLanguageTest_IsoCode() throws Exception {
        // input
        String country = "";
        String language = "";
        LanguageUseUtil spyLanguageUseUtil = Mockito.spy(languageUseUtil);
        // behavior
        Mockito.doReturn(country).when((WCMUse) spyLanguageUseUtil).get(COUNTRY_INPUT, String.class);
        Mockito.doReturn(language).when((WCMUse) spyLanguageUseUtil).get(LANGUAGE_INPUT, String.class);
        Mockito.when(LocaleUtil.parseLocale(Mockito.eq("en_us"))).thenReturn(Locale.US);
        spyLanguageUseUtil.activate();
        // stimulus
        Locale locale = spyLanguageUseUtil.getPageLanguage();
        // Assert
        Assert.assertEquals("US", locale.getCountry());
        Assert.assertEquals("en", locale.getLanguage());
    }

    @Test
    public void getPageLanguageTest_currentPageLocale() throws Exception {
        // input
        String country = "";
        String language = "";
        LanguageUseUtil spyLanguageUseUtil = Mockito.spy(languageUseUtil);
        // behavior
        Mockito.doReturn(country).when((WCMUse) spyLanguageUseUtil).get(COUNTRY_INPUT, String.class);
        Mockito.doReturn(language).when((WCMUse) spyLanguageUseUtil).get(LANGUAGE_INPUT, String.class);
        Mockito.when(LocaleUtil.parseLocale(Mockito.eq("en_us"))).thenReturn(null);
        Mockito.when(page.getLanguage(false)).thenReturn(Locale.FRENCH);
        spyLanguageUseUtil.activate();
        // stimulus
        Locale locale = spyLanguageUseUtil.getPageLanguage();
        // verify
        Mockito.verify(page).getLanguage(false);
        // Assert
        Assert.assertEquals("fr", locale.getLanguage());
    }

    @Test
    public void getCountrySelectListTest() throws Exception {
        //input
        String country = "UnitedStates";
        String language = "English";
        LanguageUseUtil spyLanguageUseUtil = Mockito.spy(languageUseUtil);
        
        List<Map<String, String>> countrySelect = new ArrayList<Map<String,String>>();
        Map<String, String> country1 = new HashMap<String, String>();
        country1.put(COUNTRY_SELECT_LANGUAGE, "en_US");
        country1.put(COUNTRY_SELECT_URL, "http://medtronic.com/en/home");
        countrySelect.add(country1);
                
        //behavior
        Mockito.when(MedtronicComUtil.getInheritedMultiFieldPanelValues(pageResource, COUNTRY_SELECT_PROPERTY)).thenReturn(countrySelect);
        Mockito.when(resourceResolver.getResource(LANGUAGE_DATASOURCE_ROOT)).thenReturn(langRoot);
        Mockito.when(langRoot.hasChildren()).thenReturn(Boolean.TRUE);
        Mockito.when(langRoot.getChild("en_US")).thenReturn(langResource);
        Mockito.when(langResource.getValueMap()).thenReturn(jcrLanguage);
        Mockito.when(jcrLanguage.get(DATASOURCE_COUNTRY, String.class)).thenReturn("UnitedStates");
        Mockito.when(LinkUtil.getPathfieldURL(Mockito.eq("http://medtronic.com/en/home"))).thenReturn("http://medtronic.com/en/home.html");
        Mockito.when(LocaleUtil.parseLocale(Mockito.eq("en_US"))).thenReturn(Locale.US);
        Mockito.when(jcrLanguage.get(DATASOURCE_LANGUAGE, String.class)).thenReturn("English");
        Mockito.doReturn(country).when((WCMUse) spyLanguageUseUtil).get(COUNTRY_INPUT, String.class);
        Mockito.doReturn(language).when((WCMUse) spyLanguageUseUtil).get(LANGUAGE_INPUT, String.class);
        spyLanguageUseUtil.activate();
        
        //stimulus
        List<Map<String, Object>> results = spyLanguageUseUtil.getCountrySelectList();
        
        //verify
        Mockito.verify(resourceResolver, Mockito.atLeast(1)).getResource(LANGUAGE_DATASOURCE_ROOT);
        Mockito.verify(langRoot, Mockito.atLeast(1)).hasChildren();
        Mockito.verify(langRoot, Mockito.atLeast(1)).getChild(Mockito.anyString());
        Mockito.verify(langResource, Mockito.atLeast(1)).getValueMap();
        Mockito.verify(jcrLanguage, Mockito.atLeast(1)).get(DATASOURCE_COUNTRY, String.class);
        Mockito.verify(jcrLanguage, Mockito.atLeast(1)).get(DATASOURCE_LANGUAGE, String.class);
        
        //Assert
        Assert.assertEquals(1, results.size());
        Assert.assertEquals("UnitedStates", results.get(0).get(DATASOURCE_COUNTRY));
        Assert.assertEquals("English", results.get(0).get(DATASOURCE_LANGUAGE));
        
    }
    
    @Test
    public void getLanguageSelectListTest() throws Exception{
      //input
        String country = "UnitedStates";
        String language = "English";
        LanguageUseUtil spyLanguageUseUtil = Mockito.spy(languageUseUtil);
        
        List<Map<String, String>> countrySelect = new ArrayList<Map<String,String>>();
        Map<String, String> country1 = new HashMap<String, String>();
        country1.put(COUNTRY_SELECT_LANGUAGE, "en_us");
        country1.put(COUNTRY_SELECT_URL, "http://medtronic.com/en/home");
        countrySelect.add(country1);
                
        //behavior
        Mockito.when(MedtronicComUtil.getInheritedMultiFieldPanelValues(pageResource, COUNTRY_SELECT_PROPERTY)).thenReturn(countrySelect);
        Mockito.when(resourceResolver.getResource(LANGUAGE_DATASOURCE_ROOT)).thenReturn(langRoot);
        Mockito.when(langRoot.hasChildren()).thenReturn(Boolean.TRUE);
        Mockito.when(langRoot.getChild("en_us")).thenReturn(langResource);
        Mockito.when(langResource.getValueMap()).thenReturn(jcrLanguage);
        Mockito.when(jcrLanguage.get(DATASOURCE_COUNTRY, String.class)).thenReturn("UnitedStates");
        Mockito.when(LinkUtil.getPathfieldURL(Mockito.eq("http://medtronic.com/en/home"))).thenReturn("http://medtronic.com/en/home.html");
        Mockito.when(LocaleUtil.parseLocale(Mockito.eq("en_us"))).thenReturn(Locale.US);
        Mockito.when(jcrLanguage.get(DATASOURCE_LANGUAGE, String.class)).thenReturn("English");
        Mockito.doReturn(country).when((WCMUse) spyLanguageUseUtil).get(COUNTRY_INPUT, String.class);
        Mockito.doReturn(language).when((WCMUse) spyLanguageUseUtil).get(LANGUAGE_INPUT, String.class);
        spyLanguageUseUtil.activate();
        
        //stimulus
        List<Map<String, Object>> languages = spyLanguageUseUtil.getLanguageSelectList();
        
        //Assert
        Assert.assertEquals(1, languages.size());
        Assert.assertEquals("UnitedStates", languages.get(0).get(DATASOURCE_COUNTRY));
        Assert.assertEquals("English", languages.get(0).get(DATASOURCE_LANGUAGE));        
        
    }
}
*/