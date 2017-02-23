import javax.jcr.query.Query

queryRoot = "/content/medtronic-com"
queryURL = "/patients/chronic-pain/about/index.htm"

includePageProps = false

query = "SELECT * FROM [nt:unstructured] AS s WHERE ISDESCENDANTNODE([${queryRoot}]) and CONTAINS(s.*,'${queryURL}') AND NAME() NOT LIKE  'jcr:content'"
// Note:  Page Properties are not scanned, just component properties.
// If you would like page properties scanned as well, remove "AND NAME() NOT LIKE  'jcr:content'" from the above query.


def resourcePaths = resourceResolver.findResources(query, Query.JCR_SQL2).collect { resource ->
    resource.path
} as Set

println "=============================================================================================================================="
if( resourcePaths.size() > 0 ){
    println "\t\tThe following resources include a reference to '${queryURL}' (${resourcePaths.size()})"
}else {
    println "\t\tThere are no resources including references to '${queryURL}'"
}
println "=============================================================================================================================="
resourcePaths.each { path ->
    println path
}

return