import javax.jcr.query.Query
import java.util.regex.*

saveChanges = false

resourceType = 'medtronic-com/components/content/migration-content'
propertyName = 'html'
rootPath = '/content/medtronic-com'
findRegex = "<div\\s+class=['\"](flow|video)player['\"]\\s*>\\s+<video>\\s*<source\\s+src=\\s*['\"]([^'\"?]+)([?][^'\"]+)?['\"]\\s*type=\\s*['\"]([^'\"]+)['\"]\\s*>\\s*</video>\\s*</div>"
replaceString = "<div class='videoplayer' data-video-url='%1' data-video-type='%2'></div>"
query = "select * from [nt:base] as s where isDescendantNode([${rootPath}]) and [sling:resourceType] = '${resourceType}' and [${propertyName}] is not null"

def resources = resourceResolver.findResources(query, Query.JCR_SQL2).collect { resource ->
    resource.path
} as Set

modifiedResources = [:]

def resourceNodes = resources.collect { resourcePath ->
    resourceResolver.getResource(resourcePath)
}.collect { resource ->
    def properties = resource.adaptTo(ModifiableValueMap)
    def propertyValue = properties.get(propertyName, String.class)
    propertyValue = propertyValue.toString()
    Matcher propFind = Pattern.compile(findRegex).matcher(propertyValue)
    def numMatches = 0;
    def updatedValue = new StringBuffer();
    while( propFind.find() ){
        numMatches ++
        def replacementWithSubs = replaceString.replaceAll('%1',propFind.group(2)).replaceAll('%2',propFind.group(4))
        propFind.appendReplacement(updatedValue, replacementWithSubs)
    }
    if( numMatches > 0){
        propFind.appendTail(updatedValue)
        properties.put(propertyName, updatedValue.toString())
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

// change from revert() to commit() to save the changes
if( saveChanges ){
    resourceResolver.commit()
} else {
    resourceResolver.revert()
}