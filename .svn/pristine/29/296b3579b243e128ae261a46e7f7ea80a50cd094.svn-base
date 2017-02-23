import javax.jcr.query.Query
import java.util.regex.*
/**
 * Execute this script with caution.  It will find a property in a given resource type, and replace all occurances of the
 * provided regular expression (findRegex) with the provided replacement (replaceString).
 *
 * saveChanges: Whether to save changes to JCR
 * resourceType: which resources (components) to run this on
 * rootPath: Where to start the search within the JCR (be as specific as possible)
 * findRegex: What text to find (can be string or regular expression)
 * replaceString: What text to replace the matching values with.
 *
 * Do a trial run using saveChanges=false, and take a backup package prior to running.
 *
 **/
saveChanges = false

resourceType = 'medtronic-com/components/content/migration-content'
propertyName = 'html'
rootPath = '/content/medtronic-com'
findRegex = "<div class=['\"]flowplayer['\"]>"
replaceString = "<div class='videoplayer'>"

/**
 *  Do Not Modify past this point
 * */
query = "select * from [nt:base] as s where isDescendantNode([${rootPath}]) and [sling:resourceType] = '${resourceType}' and [${propertyName}] is not null"

def resources = resourceResolver.findResources(query, Query.JCR_SQL2).collect { resource ->
    resource.path
} as Set

modifiedResources = [:]

def resourceNodes = resources.collect { resourcePath ->
    def resource = resourceResolver.getResource(resourcePath)
    def properties = resource.adaptTo(ModifiableValueMap)
    def propertyValue = properties.get(propertyName, String.class)
    Matcher propFind = Pattern.compile(findRegex).matcher(propertyValue)
    if( propFind.find() ){
        def numMatches = 1
        while (propFind.find()){
            numMatches++
        }
        properties.put(propertyName, propFind.replaceAll(replaceString))
        modifiedResources << ["${resource.path}":numMatches]
    }
}
println "=========================================================================="
if( saveChanges ){
    println "Replaced '${findRegex}' with '${replaceString}' in property '${propertyName}' on ${modifiedResources.size()} nodes (of a possible ${resources.size()})"
}else{
    println "Found '${findRegex}' in '${propertyName}' property on ${modifiedResources.size()} nodes (of a possible ${resources.size()})"
}
println "=========================================================================="


modifiedResources.each { pagePath ->
    println "${pagePath.key} --> Replaced: ${pagePath.value} times."
}

if( saveChanges ){
    resourceResolver.commit()
} else {
    resourceResolver.revert()
}