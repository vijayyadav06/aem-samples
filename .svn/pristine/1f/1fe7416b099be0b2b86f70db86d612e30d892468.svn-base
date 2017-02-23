import javax.jcr.query.Query

saveChanges = false

rootPath = '/content/medtronic-com/us-en'
menuLandingTemplateDefaults = "/apps/medtronic-com/templates/menu-landing-page/jcr:content"
menuLandingTemplate = "/apps/medtronic-com/templates/menu-landing-page"
siteRootType = "medtronic-com/components/pages/site-root-page"
query = "select * from [nt:base] as s where isDescendantNode([${rootPath}]) and [sling:resourceType] = '${siteRootType}'"
propertiesToPreserve = ['jcr:title']
modifiedPages = []

def resourcePaths = resourceResolver.findResources(query, Query.JCR_SQL2).findAll { resource ->
    // ignore true site roots (eg: /content/medtronic-com/us-en)
    pageManager.getContainingPage(resource).depth > 3
}.collect { resource ->
    resource.path
} as Set

def invalidSiteRootPages = resourcePaths.collect { resourcePath ->
    def resource = resourceResolver.getResource(resourcePath)
    if( resource != null){
        def pageResource = resource.getParent()
        if( saveChanges ){
            //get any properties we need from the original jcr:content node
            def properties = copyRequiredProperties(resource)
            //then delete that node
            resourceResolver.delete(resource)
            //need to commit right away so we don't get an "item exists" exception
            resourceResolver.commit()
            //create a new jcr:content based on the template underneath the page
            def newResource = copyTemplateJCRContent(pageResource)
            //restore saved properties
            newProperties = newResource.adaptTo(ModifiableValueMap.class)
            properties.each { item ->
                newProperties.put(item.key, item.value)
            }
            newProperties.put('cq:template', menuLandingTemplate)
        }
        modifiedPages << resourcePath
    }
}

def copyRequiredProperties(resource){
    def resourceProperties = resource.adaptTo(ModifiableValueMap.class)
    def savedProperties = [:]
    propertiesToPreserve.each { propName ->
        if( resourceProperties.containsKey(propName) ){
            savedProperties << ["${propName}":resourceProperties.get(propName)]
        }
    }
    return savedProperties
}

def copyTemplateJCRContent(pageResource){
    def workspace = session.getWorkspace()
    def newJCRContentPath = "${pageResource.path}/jcr:content"
    workspace.copy(menuLandingTemplateDefaults, newJCRContentPath )
    return resourceResolver.getResource(newJCRContentPath)
}

println "================="
if (modifiedPages.size() > 0){
    println saveChanges ? "Modified the following Invalid SiteRoot Pages to Menu Landing Pages (${modifiedPages.size()})": "List of Invalid SiteRoot Pages (${modifiedPages.size()})"
}else{
    println "No pages required any changes.  Good for you"
}
println "================="

modifiedPages.each {
    println it
}

if (saveChanges){
    resourceResolver.commit()
} else{
    resourceResolver.revert()
}
