
package com.medtronic.com.services.gsa.impl;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.junit.Ignore;
import org.junit.Test;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.medtronic.com.models.search.GsaSearchResults;
import com.medtronic.com.services.gsa.GsaSearchService;

public class GsaSearchServiceImplTest {

    private GsaSearchService gsaSearchServiceImpl = new GsaSearchServiceImpl();

    @Test
    @Ignore
    public void testConvertXmlToJson() throws JsonParseException, JsonMappingException, IOException {
        File xmlFile = new File("src/test/java/com/medtronic/com/services/gsa/impl/SampleXml.xml");
        String xmlString = FileUtils.readFileToString(xmlFile);
        GsaSearchResults results = gsaSearchServiceImpl.convertXmlToGsaSearchResults(xmlString);
        System.out.println(results);
    }
}
