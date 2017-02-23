import javax.jcr.query.Query

save = false

resourceType = 'medtronic-com/components/content/title-text'
rootPath = '/content/medtronic-com'
query = "select * from [nt:base] as s where isDescendantNode([${rootPath}]) and [sling:resourceType] = '${resourceType}'"

def resources = resourceResolver.findResources(query, Query.JCR_SQL2).collect { resource ->
    resource.path
} as Set

resources = resources as List

def problemComponents = resources.findAll { resourcePath ->
    def resource = resourceResolver.getResource(resourcePath)
    def properties = resource.adaptTo(ModifiableValueMap)
    def groups = properties.get("groups", new String[0]).toList()
    
    groups.inject(false) { broken, nextGroup ->
        broken || (nextGroup && !nextGroup.endsWith('"}'))
    }
}

println "=========================================================================================================================="

println "${problemComponents.size()} problem components\n"

def problemPages = problemComponents.inject(new LinkedHashMap()) { collector, nextResource ->
    def pagePath = pageManager.getContainingPage(nextResource).path
    def components = collector[pagePath] ?: []
    
    components << nextResource
    collector[pagePath] = components
    collector
}

println "${problemPages.size()} problem pages\n"

problemPages.each { pagePath, componentPaths ->
    println pagePath
    componentPaths.each { componentPath ->
        println "\tDeleted: ${componentPath}"
        resourceResolver.delete(getResource(componentPath))
    }
}

if (save) {
    resourceResolver.commit()
} else {
    resourceResolver.revert()
}

null