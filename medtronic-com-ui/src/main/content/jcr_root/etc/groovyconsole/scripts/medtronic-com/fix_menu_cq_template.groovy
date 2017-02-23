import javax.jcr.query.Query

saveChanges = false

rootPath = '/content/medtronic-com'
menuLandingType = "medtronic-com/components/pages/menu-landing-page"
query = "select * from [nt:base] as s where isDescendantNode([${rootPath}]) and [sling:resourceType] = '${menuLandingType}' and [cq:template] IS NULL";
menuLandingTemplate = "/apps/medtronic-com/templates/menu-landing-page"

def resourcePaths = resourceResolver.findResources(query, Query.JCR_SQL2).collect { resource ->
    resource.path
} as Set

def missingCQTemplatePages = resourcePaths.collect { resourcePath ->
    def resource = resourceResolver.getResource(resourcePath);
    def properties = resource.adaptTo(ModifiableValueMap.class)
    if( !properties.containsKey('cq:template') ){
        properties.put('cq:template',menuLandingTemplate)
        resourcePath
    }
}



println "==================================="
if (saveChanges){
    println "Changed the following ${menuLandingType} pages (${missingCQTemplatePages.size()}) to have the appropriate cq:template"
    resourceResolver.commit()
} else{
    println "The following ${menuLandingType} pages (${missingCQTemplatePages.size()}) have an empty cq:template"
    resourceResolver.revert()
}
println "==================================="

missingCQTemplatePages.each{ templatePath ->
    println templatePath
}
return