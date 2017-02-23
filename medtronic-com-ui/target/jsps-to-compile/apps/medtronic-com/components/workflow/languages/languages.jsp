<%@ page import="com.adobe.granite.ui.components.ds.DataSource" %>
<%@ page import="com.adobe.granite.ui.components.ds.EmptyDataSource" %>
<%@ page import="com.adobe.granite.ui.components.ds.SimpleDataSource" %>
<%@ page import="com.adobe.granite.ui.components.ds.ValueMapResource" %>
<%@ page import="com.medtronic.com.msm.service.MSMService" %>
<%@ page import="com.medtronic.com.msm.translation.config.LanguageMap" %>
<%@ page import="com.medtronic.com.msm.translation.config.LanguageMapping" %>
<%@ page import="org.apache.sling.api.resource.Resource" %>
<%@ page import="org.apache.sling.api.resource.ResourceMetadata" %>
<%@ page import="org.apache.sling.api.resource.ValueMap" %>
<%@ page import="org.apache.sling.api.wrappers.ValueMapDecorator" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.List" %>
<%@page session="false"%><%
%><%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %><%
%><sling:defineObjects/><%
    // set fallback
    request.setAttribute(DataSource.class.getName(), EmptyDataSource.instance());

    MSMService msmService = sling.getService(MSMService.class);

    LanguageMapping languageMapping = msmService.getLanguageMapping();

    List<Resource> fakeResourceList = new ArrayList<Resource>();
    ValueMap vm = null;
    for (LanguageMap map : languageMapping.getLanguageMapList()) {
        vm = new ValueMapDecorator(new HashMap<String, Object>());
        vm.put("value",map.getLanguage());
        vm.put("text",map.getLanguage());
        fakeResourceList.add(new ValueMapResource(resourceResolver, new ResourceMetadata(), "nt:unstructured", vm));
    }

//Create a DataSource that is used to populate the drop-down control
    DataSource ds = new SimpleDataSource(fakeResourceList.iterator());
    request.setAttribute(DataSource.class.getName(), ds);
%>