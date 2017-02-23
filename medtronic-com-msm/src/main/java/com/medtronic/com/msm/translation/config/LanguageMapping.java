package com.medtronic.com.msm.translation.config;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

import java.util.List;

/**
 * Created by anton on 2/16/2016.
 */
@JacksonXmlRootElement(localName = "com.medtronic.com.msm.translation.config.LanguageMapping")
public class LanguageMapping {
    @JacksonXmlProperty
    private List<LanguageMap> languageMaps;

    public List<LanguageMap> getLanguageMapList() {
        return this.languageMaps;
    }

    public String getLanguageName(String locale) {
        String languageName = null;
        if (locale == null) {
            return null;
        }

        for (LanguageMap map : languageMaps) {
            if (locale.equals(map.getRefPath())) {
                languageName = map.getLanguage();
                break;
            }
        }

        return languageName;
    }
}
