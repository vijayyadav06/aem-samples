import com.day.cq.commons.jcr.*
import com.adobe.granite.asset.api.*
import com.day.cq.tagging.*
import org.apache.commons.lang3.*
import javax.jcr.query.Query
import com.day.cq.wcm.api.components.*

componentManager = resourceResolver.adaptTo(ComponentManager)

underComponentRoots = "isDescendantNode('/apps/medtronic-com/components')"

query = "select f from [cq:Widget] as f where (${underComponentRoots}) and [xtype] is not null";

ignoreXtypes = ['componentselector', 'dialog', 'dialogfieldset', 'label', 'panel', 'slingscriptinclude', 'tabpanel'] as Set
translatableXtypes = ['richtext', 'textarea', 'textfield'] as Set
untranslatableXtypes = ['authselection', 'datefield', 'datetime', 'hidden', 'mdtselection', 'numberfield', 'paragraphreference', 'pathfield', 'selection', 'tags'] as Set
multifieldXtypes = ['multifield'] as Set
multifieldPanelXtypes = ['globallinks', 'mdtmultifieldpanel', 'multifieldpanel', 'uniqueiditem'] as Set
cqIncludeXtypes = ['cqinclude'] as Set

def allFields = resourceResolver.findResources(query, Query.JCR_SQL2 ).findAll { field ->
    def valueMap = field.valueMap
    
    !ignoreXtypes.contains(valueMap.xtype) && (valueMap.path || valueMap.name || valueMap.key || valueMap.dName)
}

def dialogRootPaths = allFields.collect { field ->
    if (!field.adaptTo(Node)) {
        // why in the hell does it not return jcr resources backed by nodes?
        field = getResource(field.path);
    }
    
    def dialogRoot = field
    def component = field
    def allRoots = []
    
    while (!isDialogRoot(dialogRoot)) {
        dialogRoot = dialogRoot.parent
    }
    
    dialogRoot.path
} as Set

def dialogRoots = dialogRootPaths.collect { dialogRootPath ->
    resourceResolver.getResource(dialogRootPath)
}

def fieldsFromRoots = collectFieldsFromDialogRoots(dialogRoots)

def filteredFields = fieldsFromRoots.findAll { fieldInfo ->
    !(fieldInfo.component.path =~ /parsys/ || fieldInfo.component.path =~ /ipardisplayer/)
}.findAll { fieldInfo ->
    fieldInfo.name
}.findAll { fieldInfo ->
    def canTranslate = translatableXtypes.contains(fieldInfo.xtype)
    
    if (multifieldXtypes.contains(fieldInfo.xtype)) {
        def fieldConfig = fieldInfo.field.getChild("fieldConfig")
        def fieldXtype = fieldConfig.valueMap.xtype
        
        if (multifieldPanelXtypes.contains(fieldXtype)) {
            fieldXtype = "multifieldpanel (JSON String array)"
            canTranslate = true
        } else if (translatableXtypes.contains(fieldXtype)) {
            canTranslate = true
        }
        
        fieldInfo.extraText = "Mulfield type: ${fieldXtype}"
    }
    
    canTranslate = canTranslate && validName(fieldInfo.name)
    
    // special properties
    if (fieldInfo.component.path == '/apps/medtronic-com/components/pages/application-root') {
        if (fieldInfo.name == './countries') {
            canTranslate = false
        }
    }
    
    canTranslate
}

println filteredFields.size()

println (["friendly component name", "component path", "property name", "xtype", "extra info"].join("\t"))

filteredFields.each { fieldInfo ->
    def componentName = fieldInfo.component.adaptTo(Component).title
    println ([componentName, fieldInfo.component.path, fieldInfo.name.replace("./", ""), fieldInfo.xtype, fieldInfo.extraText].join("\t"))
}

def collectFieldsFromDialogRoots(dialogRoots) {
    def fieldsList = []
    
    dialogRoots.each { dialogRoot ->
        def component = dialogRoot
        while (component.name != "components" && component.valueMap["jcr:primaryType"] != "cq:Component") {
            component = component.parent
        }
        
        fieldsList += collectFieldsFromDialogNodes(component, dialogRoot)
    }
    
    fieldsList
}

def collectFieldsFromDialogNodes(component, dialogNodes) {
    def fieldsList = []
    dialogNodes?.each { dialogNode ->
        def xtype = dialogNode.valueMap.xtype
        def name = dialogNode?.valueMap?.name
        def extraText = ''
        
        fieldsList << [
            'component': component,
            'field': dialogNode,
            'name': name,
            'xtype': xtype,
            'extraText': extraText,
            'isPageProperty': component.path.contains("/pages")
        ]
        
        if (cqIncludeXtypes.contains(xtype)) {
            def includePath = dialogNode.valueMap.path
            includePath = includePath.replace(".infinity.json", "")
            fieldsList += collectFieldsFromDialogNodes(component, [resourceResolver.getResource(includePath)])
        }
        
        fieldsList += collectFieldsFromDialogNodes(component, dialogNode.children)
    }
    
    fieldsList
}


def isDialogRoot(res) {
    (res.name =~ /components|dialog|tab_/) || res.valueMap['jcr:primaryType'] == 'cq:Component'
}

def validName(name) {
    !(name =~ /cq\:|sling\:/)
}
null
