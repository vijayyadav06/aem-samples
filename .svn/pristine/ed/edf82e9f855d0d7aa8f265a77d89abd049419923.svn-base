import javax.jcr.query.Query

queryRoot = "/content/medtronic-com"
// Component ResourceType, in crx/de, value of sling:resourceType
resourceType = "medtronic-com/components/content/product-detail"
// Which property are you looking for (refer to crx/de)
resourceProperty = "iswGraphic"
// What resource values ( * for any )
resourceValue = "none"

query = "SELECT * FROM [nt:unstructured] AS s WHERE ISDESCENDANTNODE([${queryRoot}]) and s.[sling:resourceType] LIKE '${resourceType}' AND s.[${resourceProperty}] LIKE '${resourceValue}'"


def resourcePaths = resourceResolver.findResources(query, Query.JCR_SQL2).collect { resource ->
    resourceResolver.adaptTo(PageManager.class).getContainingPage(resource).path
} as Set

println "=============================================================================================================================="
if( resourcePaths.size() > 0 ){
    println "\t\tUnder ${queryRoot} we found the following pages with '${resourceProperty}' set to '${resourceValue}' (${resourcePaths.size()})"
}else {
    println "\t\tUnder ${queryRoot} there were no pages with '${resourceProperty}' set to '${resourceValue}'"
}
println "=============================================================================================================================="
resourcePaths.each { path ->
    println "${path}.html"
}

return