
package com.medtronic.com.util;

import com.adobe.cq.sightly.WCMUse;
import com.adobe.granite.i18n.LocaleUtil;
import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.commons.jcr.JcrConstants;
import com.day.cq.wcm.api.Page;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.Locale;
import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.ArrayList;

/**
 * Created by ryanmccullough on 2016-01-19. Utility class to get a content pages language using the jcr:language
 * property(inherited) or passed in country and language codes.
 */
public class LanguageUseUtil extends WCMUse {

    private static final Logger LOG = LoggerFactory.getLogger(LanguageUseUtil.class);
    private static final String COUNTRY_INPUT = "country";
    private static final String LANGUAGE_INPUT = "language";

    private static final String COUNTRY_SELECT_PROPERTY = "countries";
    private static final String COUNTRY_SELECT_LANGUAGE = "_DNT_languageName";
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

    String country;
    String language;
    String isoCode;
    Page page;
    ResourceResolver resourceResolver;

    /**
     * Initialize page, resourceResolver, isoCode fields.
     * 
     * @param page
     *            - page
     * @return LanguageUseUtil
     */
    public static LanguageUseUtil getInstance(final Page page) {
        final LanguageUseUtil instance = new LanguageUseUtil();
        instance.page = page;
        instance.resourceResolver = page.adaptTo(ResourceResolver.class);
        instance.isoCode = getInheritedLanguageCode(page);

        return instance;
    }

    @Override
    public void activate() throws Exception {
        // country and language are optional.
        // By default this class will use the jcr:language node (inherited).
        // if language and country are initialized they will take priority in determining the locale.
        country = get(COUNTRY_INPUT, String.class);
        language = get(LANGUAGE_INPUT, String.class);

        if (StringUtils.isEmpty(country) || StringUtils.isEmpty(language)) {
            // no need to initialize this item unless the other inputs are not set.
            isoCode = getInheritedLanguageCode(getCurrentPage());
        }
    }

    @Override
    public Page getCurrentPage() {
        if (page != null) {
            return page;
        }

        return super.getCurrentPage();
    }

    @Override
    public ResourceResolver getResourceResolver() {
        if (resourceResolver != null) {
            return resourceResolver;
        }

        return super.getResourceResolver();
    }

    /**
     * Gets page locale.
     * 
     * @return Locale
     */
    public Locale getPageLanguage() {
        Locale locale = null;
        if (StringUtils.isNotEmpty(language) && StringUtils.isNotEmpty(country)) {
            LOG.debug("Language and Country defined. Using {}_{} to determine locale.", language, country);

            locale = getLanguage(language, country);
        } else if (StringUtils.isNotEmpty(isoCode)) {
            LOG.debug("No language or country initialized.  Using page's {} code instead: {}",
                    JcrConstants.JCR_LANGUAGE, isoCode);
            locale = getLanguage(isoCode);
        }
        // if it's still null here, return the getCurrentPage() implementation.
        if (locale == null) {
            LOG.debug("Locale initialization failed.  Using OOTB getLanguage instead.");
            locale = getCurrentPage().getLanguage(false);
        }
        return locale;
    }

    /**
     * getLanguageSelectList This method obtains the authored list of languages for the selected country
     * 
     * @return List
     */
    public List<Map<String, Object>> getLanguageSelectList() {
        List<Map<String, Object>> languages = new ArrayList<Map<String, Object>>();
        final List<Map<String, Object>> results = this.getCountrySelectList();
        //get the selected country from the country select list
        String selectedCountry = ((Locale)getSelectedValue().get(COUNTRY_SELECT_LOCALE)).getCountry();
        for (Map<String, Object> result : results) {
            String curCountry = ((Locale)result.get(COUNTRY_SELECT_LOCALE)).getCountry();
            if (selectedCountry.equals(curCountry) ) {
                languages.add(result);
            }
        }
        return languages;
    }

    /**
     * getCountrySelectList This method obtains the authored list of countries from the application root, and returns
     * that list information along with the Locale, Display Country, and Display Language Return format is a Map with
     * the following entries(keys): url locale country language.
     * 
     * @return List
     */
    public List<Map<String, Object>> getCountrySelectList() {
        final List<Map<String, Object>> results = new ArrayList<>();
        // get the multifield values from the application root
        final List<Map<String, String>> countrySelect = MedtronicComUtil.getInheritedMultiFieldPanelValues(
                getCurrentPage().getContentResource(), COUNTRY_SELECT_PROPERTY);
        final Map<String, Integer> countryCounter = getCountryCounterMap(countrySelect);
        // variable to track if the "selected" item of the country selector has been picked.
        Boolean hasSelection = false;
        // for each of the application root items, find the jcr language and retrive the country/language values.
        for (int i = 0; i < countrySelect.size(); i++) {

            final Map<String, Object> langItem = new HashMap<>();
            // converting a map<string,string> to map<string,object>
            langItem.putAll(countrySelect.get(i));
            // get the selected language to compare with JCR (name)
            final String selectedLanguage = (String) langItem.get(COUNTRY_SELECT_LANGUAGE);
            // get the selected url
            String selectedUrl = (String) langItem.get(COUNTRY_SELECT_URL);
            if (StringUtils.isNotEmpty(selectedUrl)) {
                selectedUrl = LinkUtil.getPathfieldURL(selectedUrl);
            }

            if (selectedLanguage != null) {
                final Locale locale = getLanguage(selectedLanguage);
                final ValueMap jcrLanguage = getJCRLanguage(selectedLanguage);
                if (jcrLanguage != null) {
                    String displayCountry = jcrLanguage.get(DATASOURCE_COUNTRY, String.class);
                    if (StringUtils.isEmpty(displayCountry) || "*".equals(displayCountry)) {
                        displayCountry = locale.getDisplayCountry();
                    }
                    String displayLanguage = jcrLanguage.get(DATASOURCE_LANGUAGE, String.class);
                    if (StringUtils.isEmpty(displayLanguage) || "*".equals(displayLanguage)) {
                        displayLanguage = locale.getDisplayLanguage();
                    }
                    // set the first matching URL to be selected.
                    if (!hasSelection && locale.equals(getPageLanguage())) {
                        langItem.put(COUNTRY_SELECT_STATE, true);
                        hasSelection = true;
                    } else {
                        langItem.put(COUNTRY_SELECT_STATE, false);
                    }
                    langItem.put(COUNTRY_SELECT_LOCALE, locale);
                    langItem.put(DATASOURCE_COUNTRY, displayCountry);
                    langItem.put(DATASOURCE_LANGUAGE, displayLanguage);
                    langItem.put(COUNTRY_SELECT_URL, selectedUrl);
                    langItem.put(COUNTRY_NUM_LANGUAGES, countryCounter.get(locale.getCountry()));
                    results.add(langItem);
                }
            }
        }
        return results;
    }

    /**
     * Gets default option value for L2 or L3 pages.
     * 
     * @return default option value
     */
    public Map<String, Object> getSelectedValue() {
        List<Map<String, Object>> selectList = getCountrySelectList();
        Map<String, Object> selectedItem = null;
        for (Map<String, Object> item : selectList) {
            if (((Boolean) item.get(COUNTRY_SELECT_STATE)) == true) {
                selectedItem = item;
                break;
            }
        }
        if (selectedItem == null && selectList.size() > 0) {
            selectedItem = selectList.get(0);
        } else if( selectedItem == null ) {
            selectedItem = new HashMap<>();
            Locale locale = LocaleUtil.parseLocale(DEFAULT_LOCALE);
            selectedItem.put(COUNTRY_SELECT_LOCALE, locale);
            selectedItem.put(DATASOURCE_COUNTRY, locale.getDisplayCountry());
            selectedItem.put(DATASOURCE_LANGUAGE, locale.getDisplayLanguage());
            selectedItem.put(COUNTRY_SELECT_URL, "/us-en.html");
            selectedItem.put(COUNTRY_NUM_LANGUAGES, 0);
        }
        return selectedItem;
    }

    private Map<String, Integer> getCountryCounterMap(List<Map<String, String>> countrySelectSource) {
        Map<String, Integer> countryCounter = new HashMap<String, Integer>();
        for (int i = 0; i < countrySelectSource.size(); i++) {
            Map<String, String> localeItem = countrySelectSource.get(i);
            if( localeItem.get(COUNTRY_SELECT_LANGUAGE) != null) {
                Locale jcrLanguage = getLanguage(localeItem.get(COUNTRY_SELECT_LANGUAGE));
                if (jcrLanguage != null) {
                    String country = jcrLanguage.getCountry();
                    if (StringUtils.isNotEmpty(country)) {
                        if (countryCounter.containsKey(country)) {
                            countryCounter.put(country, countryCounter.get(country) + 1);
                        } else {
                            countryCounter.put(country, 1);
                        }
                    }
                }
            }
        }
        return countryCounter;
    }

    /**
     * Gets default language value for L2 or L3 pages.
     * 
     * @return default language value
     */
    public String getDefaultLanguage() {
        String defaultLanguage = EMPTY_STRING;
        Map<String, Object> selectedItem = getSelectedValue();
        if (selectedItem != null) {
            defaultLanguage = (String) selectedItem.get(DATASOURCE_LANGUAGE);
        }
        return defaultLanguage;
    }

    /**
     * Gets a locale from language and country. This method normalizes the language value to lowercase and the country
     * value to uppercase.
     * 
     * @param language
     *            - language name
     * @param country
     *            - country name
     * @return locale
     */
    public static Locale getLanguage(final String language,
                                     final String country) {
        return new Locale(language, country);
    }

    /**
     * Parses the given iso code to create its corresponding Locale.
     * 
     * @param isoCode
     *            - iso code
     * @return locale
     */
    public static Locale getLanguage(final String isoCode) {
        return LocaleUtil.parseLocale(isoCode);
    }

    /**
     * Gets page's Locale.
     * 
     * @param page
     *            - page
     * @return locale
     */
    public static Locale getPageLanguage(final Page page) {
        return getLanguage(getInheritedLanguageCode(page));
    }

    /**
     * Gets language code from parent page's properties.
     * 
     * @param page
     *            - page
     * @return language code
     */
    private static String getInheritedLanguageCode(final Page page) {
        final InheritanceValueMap inheritanceValueMap = new HierarchyNodeInheritanceValueMap(page.getContentResource());
        return inheritanceValueMap.getInherited(JcrConstants.JCR_LANGUAGE, String.class);
    }

    /**
     * Gets properties according to given language name.
     * 
     * @param language
     *            language name
     * @return ValueMap
     */
    private ValueMap getJCRLanguage(final String language) {
        final Resource langRoot = getResourceResolver().getResource(LANGUAGE_DATASOURCE_ROOT);
        ValueMap resultLang = null;
        if (langRoot != null && langRoot.hasChildren()) {
            final Resource langResource = langRoot.getChild(language);
            if (langResource != null) {
                resultLang = langResource.getValueMap();
            }
        }
        return resultLang;
    }
}
