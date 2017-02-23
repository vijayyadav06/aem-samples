rootPath = '/content/medtronic-com'

getNonPages(getResource(rootPath), []).each {
    def primaryType = it.getChild("jcr:primaryType")?.adaptTo(String)
    println "${primaryType}: ${it.path}"
}

def getNonPages(resource, nonPages) {
    resource.children.findAll { child ->
        def primaryType = child.getChild("jcr:primaryType")?.adaptTo(String)
        // skip nodes with types cq:PageContent, rep:ACL
        // skip nodes with name jcr:content
        primaryType != "cq:PageContent" &
            primaryType != "rep:ACL" &&
            child.name != "jcr:content"
    }.each{ child ->
        def primaryType = child.getChild("jcr:primaryType")?.adaptTo(String)
        
        if (primaryType != "cq:Page") {
            nonPages << child
        }
        
        getNonPages(child, nonPages)
    }
    
    nonPages
}

null