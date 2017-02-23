/*package com.medtronic.com.util;

import java.util.List;
import java.util.Map;

import org.apache.sling.api.resource.Resource;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;

@RunWith(PowerMockRunner.class)
@PrepareForTest({MedtronicComUtil.class})
public class MedtronicComUtilTest {    
    
    @Mock
    Resource resource;

    @Mock
    HierarchyNodeInheritanceValueMap map;
      
    @Test
    public void getInheritedMultiFieldPanelValuesTest() throws Exception {
        //input
        String name = "multifieldPropName";
        String jsonString1 = "{ \"fname\": \"firstName1\", \"lname\":\"lastName1\"}";
        String jsonString2 = "{ \"fname\": \"firstName2\", \"lname\":\"lastName2\"}";
        String[] multifieldPropValue = new String[]{jsonString1,jsonString2}; 
        map = PowerMockito.mock(HierarchyNodeInheritanceValueMap.class);
        resource = PowerMockito.mock(Resource.class);
      
        //behavior
        PowerMockito.whenNew(HierarchyNodeInheritanceValueMap.class).withArguments(resource).thenReturn(map);
        PowerMockito.when(map.getInherited(name,new String[0])).thenReturn(multifieldPropValue);
        
        //stimulus
        List<Map<String, String>> results = MedtronicComUtil.getInheritedMultiFieldPanelValues(resource, name);
        
        //verify
        PowerMockito.verifyNew(HierarchyNodeInheritanceValueMap.class).withArguments(Mockito.any(Resource.class));
        Mockito.verify(map).getInherited(name,new String[0]);
        
        //assert
        Assert.assertNotNull(results);
        Assert.assertEquals(2, results.size());
        Assert.assertEquals("firstName1", results.get(0).get("fname"));
        Assert.assertEquals("lastName1", results.get(0).get("lname"));
        Assert.assertEquals("firstName2", results.get(1).get("fname"));
        Assert.assertEquals("lastName2", results.get(1).get("lname"));
    }

}
*/