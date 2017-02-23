<%@ page import="com.adobe.granite.ui.components.ds.DataSource" %>
<%@ page import="com.adobe.granite.ui.components.ds.EmptyDataSource" %>
<%@ page import="com.adobe.granite.ui.components.ds.SimpleDataSource" %>
<%@ page import="com.adobe.granite.ui.components.ds.ValueMapResource" %>
<%@ page import="com.day.cq.contentsync.handler.util.RequestResponseFactory" %>
<%@ page import="org.apache.sling.api.resource.Resource" %>
<%@ page import="org.apache.sling.api.resource.ResourceMetadata" %>
<%@ page import="org.apache.sling.api.resource.ValueMap" %>
<%@ page import="org.apache.sling.api.wrappers.ValueMapDecorator" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="java.util.List" %>
<%@ page import="com.day.cq.wcm.api.WCMMode" %>
<%@ page import="java.io.ByteArrayOutputStream" %>
<%@ page import="org.apache.sling.engine.SlingRequestProcessor" %>
<%@ page import="java.util.regex.Pattern" %>
<%@ page import="java.util.regex.Matcher" %>
<%@page session="false"%><%
%><%@taglib prefix="sling" uri="http://sling.apache.org/taglibs/sling/1.0" %><%
%><sling:defineObjects/><%
    // set fallback
    request.setAttribute(DataSource.class.getName(), EmptyDataSource.instance());

    // The GraniteUI Widget should define the datasource beneath it using the nodeName "datasource"
    Resource dsResource = resource.getChild("datasource");

    // Configuration data can be passed into this Datasource impl by way of the datasource node.
    ValueMap dsProperties = dsResource.adaptTo(ValueMap.class);

    String url = dsProperties.get("url", String.class);

    RequestResponseFactory rrf = sling.getService(RequestResponseFactory.class);
    SlingRequestProcessor srp = sling.getService(SlingRequestProcessor.class);
    HttpServletRequest req = rrf.createRequest("GET", url);
    WCMMode.DISABLED.toRequest(req);

    /* Setup response */
    ByteArrayOutputStream output = new ByteArrayOutputStream();
    HttpServletResponse resp = rrf.createResponse(output);

        /* Process request through Sling */
    srp.processRequest(req, resp, resourceResolver);
    String json = output.toString();

    String regex = "\\{.*name:[ ]?'[^']*'.*\\}";
    Pattern p = Pattern.compile(regex);
    Matcher m = p.matcher(json);

    List<Resource> fakeResourceList = new ArrayList<Resource>();
    ValueMap vm = null;
    while (m.find()) {
        String group = m.group();
        group = group.replaceAll("[\\{\\}]", "");
        String[] fields = group.split(",");
        String name = null;
        String value = null;
        for (String field : fields) {
            if (field.contains("name")) {
                name = field.replaceAll("name:[ ]?", "").replaceAll("'","");
            }
            if (field.contains("value")) {
                value = field.replaceAll("value:[ ]?", "").replaceAll("'","");
            }
            if (name != null && value != null) {
                vm = new ValueMapDecorator(new HashMap<String, Object>());
                vm.put("value",value);
                vm.put("text",name);
                fakeResourceList.add(new ValueMapResource(resourceResolver, new ResourceMetadata(), "nt:unstructured", vm));
                break;
            }
        }
    }

//Create a DataSource that is used to populate the drop-down control
    DataSource ds = new SimpleDataSource(fakeResourceList.iterator());
    request.setAttribute(DataSource.class.getName(), ds);
%>