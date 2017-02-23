import javax.jcr.query.Query
import org.apache.sling.commons.json.*
import org.apache.commons.lang3.*

saveChanges = false

resourceType = 'medtronic-com/components/content/manual-related-links'
rootPath = '/content/medtronic-com'
query = "select * from [nt:base] as s where isDescendantNode([${rootPath}]) and [sling:resourceType] = '${resourceType}' and [section] is not null"

def resources = resourceResolver.findResources(query, Query.JCR_SQL2).collect { resource ->
    resource.path
} as Set

resources = resources as List

def modifiedResources = resources.collect { resourcePath ->
    resourceResolver.getResource(resourcePath)
}.collect { resource ->
    def properties = resource.adaptTo(ValueMap)
    def sections = properties.get("section", new String[0]).toList()

    sections.collect { section ->
        ['oldResource': resource, 'content': section]
    }
}.collect { splitSections ->
    def counter = 0
    splitSections.each { splitSection ->
        def oldResource = splitSection.oldResource
        def parentResource = oldResource.parent
        def parentResourceNode = parentResource.adaptTo(Node)
        def content = splitSection.content
        if (StringUtils.isBlank(content)) {
            //println "Skipped empty related links: ${oldResource.path}"
            return
        } else {
            try {
                def parsed = new JSONObject(content)

                def properties = oldResource.adaptTo(ModifiableValueMap)

                properties.remove("section")

                def sectionHeading = parsed['sectionHeading']
                def sectionLinks = parsed['sectionLinks']
                def length = sectionLinks.length()

                sectionLinks = (0..length-1).collect { linkIndex ->
                    sectionLinks.getString(linkIndex)
                }

                sectionLinks = sectionLinks?.toArray(new String[0]) ?: new String[0]

                def newProperties = [:]
                newProperties << properties
                newProperties << ['sectionHeading': sectionHeading, 'sectionLinks': sectionLinks]

                properties.remove("componentHeading")

                while (parentResource.getChild("manual_related_links_m_${counter}")) {
                    counter++
                }

                def newResource = resourceResolver.create(parentResource, "manual_related_links_m_${counter}", newProperties)

                parentResourceNode.orderBefore(newResource.name, oldResource.name)
                counter++
            } catch (Exception e) {
                println "Broken related links: ${oldResource.path}"
                log.error("Problem with {}", oldResource.path, e)
            }
        }
    }
    def page = pageManager.getContainingPage(splitSections[0].oldResource.path)
    resourceResolver.delete(splitSections[0].oldResource)

    page.path
} as Set
println "============="
if( saveChanges ){
    println "Pages successfully modified"
}else{
    println "Pages to be modified"
}
println "============="


modifiedResources.findAll().each { pagePath ->
    println pagePath
}

// change from revert() to commit() to save the changes
if( saveChanges ){
    resourceResolver.commit()
} else {
    resourceResolver.revert()
}