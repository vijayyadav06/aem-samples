import javax.jcr.query.Query
// where should we look?
queryRoot = "/content/medtronic-com"
// Component ResourceType, in crx/de, value of sling:resourceType
resourceType = "medtronic-com/components/content/responsive-table"
// Which property are you looking for (refer to crx/de)
resourceProperty = "showSort"
// What resource values ( % for any )
resourceValue = "true"
// Do you want to include results that do not have the above property
includeNulls = true
// What should the value be changed to
newResourceValue="false"
// Save or Dry Run
saveChanges = false

/*
DO NOT MODIFY BELOW THIS LINE.
 */

query = "SELECT * FROM [nt:unstructured] AS s WHERE ISDESCENDANTNODE([${queryRoot}]) AND s.[sling:resourceType] LIKE '${resourceType}' AND (s.[${resourceProperty}] LIKE '${resourceValue}'"
if( includeNulls ){
    query += " OR s.[${resourceProperty}] IS NULL"
}
query += ")"


def resourcePaths = resourceResolver.findResources(query, Query.JCR_SQL2).collect { resource ->
    resource.path
} as Set

resourcePaths.each { resourcePath ->
    if( newResourceValue != null && saveChanges){
        def valueMap = resourceResolver.getResource(resourcePath).adaptTo(ModifiableValueMap.class)
        valueMap.put(resourceProperty,newResourceValue)
    }
}

if( saveChanges ){
    resourceResolver.commit()
}else{
    resourceResolver.revert()
}

println "=============================================================================================================================="
if( resourcePaths.size() > 0 ){
    println "\t\tUnder ${queryRoot} we ${saveChanges ? 'modified':'found'} the following pages with '${resourceProperty}' set to '${resourceValue}' ${saveChanges ? 'and updated them to'+newResourceValue:''} (${resourcePaths.size()})"
}else {
    println "\t\tUnder ${queryRoot} there were no pages with '${resourceProperty}' set to '${resourceValue}'"
}
println "=============================================================================================================================="
resourcePaths.each { path ->
    println resourceResolver.adaptTo(PageManager.class).getContainingPage(path).path+".html"
}

return