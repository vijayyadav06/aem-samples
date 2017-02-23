import javax.jcr.query.Query
import org.apache.sling.commons.json.*
import org.apache.commons.lang3.*
import java.util.regex.*

saveChanges = false

rootPath = '/content/medtronic-com'
query = "select * from [nt:base] as s where isDescendantNode([${rootPath}]) and (name(s) = 'iparsys_fake_par')"

def resourcePaths = resourceResolver.findResources(query, Query.JCR_SQL2).findAll { resource ->
    // ignore true site roots (eg: /content/medtronic-com/us-en)
    pageManager.getContainingPage(resource).depth > 3
}.collect { resource ->
    resource.path
} as Set

def headerAndFooterResources = resourcePaths.collect { resourcePath ->
    resourceResolver.getResource(resourcePath)
}

def resourcesWithAnnotations = headerAndFooterResources.findAll { resource ->
    resource.getChild('cq:annotations')
}.collect { resource ->
    [
        'page': pageManager.getContainingPage(resource),
        // parent.parent == jcr:content
        // children.findAll {}[0].children[0] is the first component found that is on the page (may or may not be physicall the first component on the page)
        'newAnnotationParent': resource.parent.parent.children.findAll { c -> c.name != 'header-par' && c.name != 'footer-par' && c.children.size() > 0}[0].children[0],
        'resource': resource
    ]
}
def resourcesWithAnnotationsThatCanBeMoved = resourcesWithAnnotations.findAll { info ->
    info.newAnnotationParent
}

def resourcesWithAnnotationsThatCantBeMoved = resourcesWithAnnotations.findAll { info ->
    !info.newAnnotationParent
}

if (resourcesWithAnnotationsThatCantBeMoved) {
    println "Annotations not moved (no target location):"
    resourcesWithAnnotationsThatCantBeMoved.each { info ->
        if (!info.newAnnotationParent) {
            printAnnotationInfo(info)
            
            info.resource.getChild("cq:annotations").children.eachWithIndex { annotation, index ->
                printAnnotationDetail(annotation, index)
            }
        }
    }
    
    println ""
    println "=========="
}
println "Annotations moved:"

resourcesWithAnnotationsThatCanBeMoved.each { info ->
    printAnnotationInfo(info)
    
    def newCqAnnotationNode = info.newAnnotationParent.getChild("cq:annotations")
    
    if (!newCqAnnotationNode) {
        newCqAnnotationNode = resourceResolver.create(info.newAnnotationParent, "cq:annotations", ["jcr:primaryType":"nt:unstructured"])
    }
    
    info.resource.getChild("cq:annotations").children.collect { oldAnnotation ->
        resourceResolver.create(newCqAnnotationNode, oldAnnotation.name, oldAnnotation.adaptTo(ValueMap))
    }.eachWithIndex { annotation, index ->
        printAnnotationDetail(annotation, index)
    }
}

println ""
println "=========="
println "Deleted annotation resources:"

resourcesWithAnnotations.each { info ->
    println "${info.resource.parent.path}"
    resourceResolver.delete(info.resource.parent)
}

if (saveChanges) {
    resourceResolver.commit()
} else {
    resourceResolver.revert()
}

resourcesWithAnnotations.size()

def printAnnotationInfo(info) {
    def pagePath = info.page.path
    def resourcePath = info.resource.path[pagePath.length()..-1]
    def newAnnotationParentPath = info.newAnnotationParent.path[pagePath.length()..-1]
    
    println "${pagePath}"
    println "\t${resourcePath}"
    println "\t${newAnnotationParentPath}"
}

def printAnnotationDetail(annotation, index) {
    def color = annotation.getChild("color")?.adaptTo(String)
    def text = annotation.getChild("text")?.adaptTo(String)
    def x = annotation.getChild('x')?.adaptTo(String)
    def y = annotation.getChild('y')?.adaptTo(String)
    println "\tAnnotation ${index + 1}"
    println "\t\t${color}"
    println "\t\t\"${text}\""
    println "\t\t(${x}, ${y})"
}