import javax.jcr.query.Query
import groovy.json.*

saveChanges = false
/////////////////////////////
// Static Variables
/////////////////////////////
rootPath = '/content/medtronic-com'
//Text Editor Component
richTextType = "medtronic-com/components/content/rich-text-editor"
richTextProperty = "richText"
//Title-Text Component
titleTextType = "medtronic-com/components/content/title-text"
titleTextProperty = "groups"
//migration content (destination) component
migrationContentType = "medtronic-com/components/content/migration-content"
migrationContentProperty = "html"

rightRailNode = "right-rail"
jcrContentNode = "jcr:content"
slingResourceType = "sling:resourceType"

basicFormRegex = /<\/form>/

//////////////////////////////////////////////////////////////
// Toggles for running on alternate components
// Uncomment the type/property you wish to run this query on:
/////////////////////////////////////////////////////////////

//     title-text component
resourceType = titleTextType
resourceProperty = titleTextProperty

/*
//    rich text (Text Editor)
resourceType = richTextType
resourceProperty = richTextProperty;
*/
/////////////////////////////////////////////////////////////

// Global/Tracking Variables
totalModified = 0
query = "select * from [nt:base] as s where isDescendantNode([${rootPath}]) and [sling:resourceType] = '${resourceType}' and [${resourceProperty}] IS NOT NULL";
forms = [:]
initForms()

modifiedNodes = [:]
unmatchedFormNodes = [];

def resourcePaths = resourceResolver.findResources(query, Query.JCR_SQL2).collect { resource ->
    resource.path
} as Set

def richTextNodes = resourcePaths.collect { resourcePath ->
   def resource = resourceResolver.getResource(resourcePath);
   def properties = resource.adaptTo(ModifiableValueMap.class)
   def text = getTextProperty(resourcePath,properties)
   def hasMatch = false;
   if( text != null ){
       for( String formName : forms.keySet() ) {
            def formRegex = forms[formName]['rte']
            def originalForm = forms[formName]['original']
            if(  text =~ /$formRegex/ || text.contains(originalForm)){
                String newValue = text
                if( newValue =~ /$formRegex/ ) {
                    newValue = newValue.replaceAll(formRegex, originalForm)
                }
                if( !isRightRail(resource) ){
                   newValue = "<div class='pad'>${newValue}</div>"
                }
                //switch the resource type to migration-content
                properties.put(slingResourceType, migrationContentType)
                //add updated text property
                properties.put(migrationContentProperty,newValue.toString())
                //remove old value from properties
                properties.remove(richTextProperty)
                totalModified++
                if( modifiedNodes.containsKey(formName) ){
                    modifiedNodes[formName] << resourcePath
                }else{
                    modifiedNodes[formName] = [resourcePath]
                }
                hasMatch = true;
            }
       }
       if(!hasMatch && text =~ basicFormRegex ){
           unmatchedFormNodes << resourcePath
       }
   }
}

def getTextProperty(resourcePath, properties){
    def text = null
    if (resourceType == richTextType){
        text = properties.get(richTextProperty,null)
    }else if ( resourceType == titleTextType){
        //title text has a multifield, as well as a title.  Only operate on ones with only one item
        def groups = properties.get(titleTextProperty, String[].class)
        //get all groups that have a form in them
        def groupsWithForms = groups.findAll{ grpString ->
            (grpString =~ basicFormRegex)
        }as ArrayList

        if( groupsWithForms != null && groupsWithForms.size() == 1){
            def firstGroup = new JsonSlurper().parseText(groupsWithForms.get(0))
            def titleProp = firstGroup.get('title')
            def textProp = firstGroup.get('text')
            text = "<h2>${titleProp}</h2>${textProp}"
        }else if( groupsWithForms.size() > 1){
            //if there are more than one group in the multifield, ignore and add to the unmatched list
            unmatchedFormNodes << resourcePath
        }
    }
    return text
}

//Boolean.  True for if the content is in the main content par, false if it is within the right-rail.
def isRightRail(resource){
    def parentNode = resource.getParent();
    def isRightRail = false
    //crawl up the content tree to find either a right-rail node (the resource is within right rail),
    //or jcr:content node (it is not in right rail)
    while( parentNode != null && !parentNode.getName().equals(jcrContentNode) ) {
        if( parentNode.getName().equals(rightRailNode) ){
            isRightRail = true
            break
        }else{
            parentNode = parentNode.getParent()
        }
    }
    return isRightRail
}


def printOutput(){


    if( unmatchedFormNodes.size() > 0) {
        println "-----------------------------------"
        println "The following nodes (${unmatchedFormNodes.size()}) have a form, but did not match any of our RegEx's"
        println "-----------------------------------"
        unmatchedFormNodes.each { unmatched ->
            println "\t${unmatched}"
        }
    }
     println "==================================="
    if (saveChanges){
        println "Changed the following ${richTextType} pages (${totalModified}) to $migrationContentType nodes"
        resourceResolver.commit()
    } else{
        println "The following ${richTextType} nodes (${totalModified}) should be converted to ${migrationContentType} nodes"
        resourceResolver.revert()
    }
    println "==================================="
    modifiedNodes.each{ modified ->
        println "---------------------------"
        println "${modified.key} forms (${modified.value.size()})"
        println "---------------------------"
        modified.value.each { path ->
            println "\t${path}"
        }
    }
    return
}


//putting this down here to make the initialization less busy.
def initForms(){

forms['bowel-incontinence'] =
[ 'original' :
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" id="therapy" name="therapy" value="5">
    <input type="hidden" id="filterOnCondition" name="filterOnCondition" value="true">
    <input type="hidden" name="searchByFilterName" value="zipCode">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte': "<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\"\\s*(id=\"therapy\")?\\s*name=\"therapy\" value=\"5\">\\s*<input type=\"hidden\"\\s*(id=\"filterOnCondition\")?\\s*name=\"filterOnCondition\" value=\"true\">\\s*<input type=\"hidden\" name=\"searchByFilterName\" value=\"zipCode\">\\s*<fieldset>\\s*<legend>Find a Doctor\\s*</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code\\s*<i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]
/*
forms['cancer-pain'] = [
'original':
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" value="3" name="therapy" id="therapy">
	<input type="hidden" value="9" name="therapy" id="therapy">
	<input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',

'rte': "<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" value=\"3\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"9\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]*/

forms['chronic-pain-back-leg'] = [
'original':
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" value="3" name="therapy" id="therapy">
	<input type="hidden" value="9" name="therapy" id="therapy">
	<input id="condition" type="hidden" name="condition" value="true">
	<input id="conditionType" type="hidden" name="conditionType" value="168">
	<input id="filterOnCondition" type="hidden" name="filterOnCondition" value="true">
	<input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte' : "<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" value=\"3\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"9\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input\\s*(id=\"condition\")?\\s*type=\"hidden\" name=\"condition\" value=\"true\">\\s*<input\\s*(id=\"conditionType\")?\\s*type=\"hidden\" name=\"conditionType\" value=\"168\">\\s*<input\\s*(id=\"filterOnCondition\")?\\s*type=\"hidden\" name=\"filterOnCondition\" value=\"true\">\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]

forms['chronic-pain-cprs'] = [
'original' :
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" value="3" name="therapy" id="therapy">
	<input type="hidden" value="9" name="therapy" id="therapy">
	<input id="condition" type="hidden" name="condition" value="true">
	<input id="conditionType" type="hidden" name="conditionType" value="169">
	<input id="filterOnCondition" type="hidden" name="filterOnCondition" value="true">
	<input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte':"<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" value=\"3\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"9\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input\\s*(id=\"condition\")?\\s*type=\"hidden\" name=\"condition\" value=\"true\">\\s*<input\\s*(id=\"conditionType\")?\\s*type=\"hidden\" name=\"conditionType\" value=\"169\">\\s*<input\\s*(id=\"filterOnCondition\")?\\s*type=\"hidden\" name=\"filterOnCondition\" value=\"true\">\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]

forms['chronic-pain-painful-neuropathy'] = [
'original':
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" value="3" name="therapy" id="therapy">
	<input type="hidden" value="9" name="therapy" id="therapy">
	<input id="condition" type="hidden" name="condition" value="true">
	<input id="conditionType" type="hidden" name="conditionType" value="170">
	<input id="filterOnCondition" type="hidden" name="filterOnCondition" value="true">
	<input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte': "<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" value=\"3\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"9\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input\\s*(id=\"condition\")?\\s*type=\"hidden\" name=\"condition\" value=\"true\">\\s*<input\\s*(id=\"conditionType\")?\\s*type=\"hidden\" name=\"conditionType\" value=\"170\">\\s*<input\\s*(id=\"filterOnCondition\")?\\s*type=\"hidden\" name=\"filterOnCondition\" value=\"true\">\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]

forms['chronic-pain'] = [
'original':
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" value="3" name="therapy" id="therapy">
    <input type="hidden" value="9" name="therapy" id="therapy">
	<input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte':"<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" value=\"3\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"9\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]

forms['dystonia'] = [
'original':
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" id="therapy" name="therapy" value="2">
    <input type="hidden" id="condition" name="condition" value="true">
    <input type="hidden" id="conditionType" name="conditionType" value="161">
    <input type="hidden" id="filterOnCondition" name="filterOnCondition" value="true">
    <input type="hidden" name="searchByFilterName" value="zipCode">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte':"<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\"\\s*(id=\"therapy\")?\\s*name=\"therapy\" value=\"2\">\\s*<input type=\"hidden\"\\s*(id=\"condition\")?\\s*name=\"condition\" value=\"true\">\\s*<input type=\"hidden\"\\s*(id=\"conditionType\")?\\s*name=\"conditionType\" value=\"161\">\\s*<input type=\"hidden\"\\s*(id=\"filterOnCondition\")?\\s*name=\"filterOnCondition\" value=\"true\">\\s*<input type=\"hidden\" name=\"searchByFilterName\" value=\"zipCode\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]
/*
forms['essential-tremor'] = [
'original':
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" value="2" name="therapy" id="therapy">
    <input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte':"<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" value=\"2\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]*/

forms['gastroparesis'] = [
'original':
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" name="therapy" id="therapy" value="7">
    <input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte': "<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*value=\"7\">\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]

forms['ocd'] = [
'original':
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" value="8" name="therapy" id="therapy">
    <input type="hidden" value="true" name="condition" id="condition">
    <input type="hidden" value="178" name="conditionType" id="conditionType">
    <input type="hidden" value="true" name="filterOnCondition" id="filterOnCondition">
    <input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte':"<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" value=\"8\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"true\" name=\"condition\"\\s*(id=\"condition\")?\\s*>\\s*<input type=\"hidden\" value=\"178\" name=\"conditionType\"\\s*(id=\"conditionType\")?\\s*>\\s*<input type=\"hidden\" value=\"true\" name=\"filterOnCondition\"\\s*(id=\"filterOnCondition\")?\\s*>\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]

forms['overactive-bladder'] = [
'original':
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input id="therapy" type="hidden" name="therapy" value="1">
    <input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte':"<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input\\s*(id=\"therapy\")?\\s*type=\"hidden\" name=\"therapy\" value=\"1\">\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]

forms['parkinsons'] = [
'original':
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" value="2" name="therapy" id="therapy">
    <input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte': "<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" value=\"2\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]

forms['severe-spasticity-brain-injury'] = [
'original':
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" value="4" name="therapy" id="therapy">
    <input type="hidden" value="true" name="condition" id="condition">
    <input type="hidden" value="172" name="conditionType" id="conditionType">
    <input type="hidden" value="true" name="filterOnCondition" id="filterOnCondition">
    <input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte': "<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" value=\"4\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"true\" name=\"condition\"\\s*(id=\"condition\")?\\s*>\\s*<input type=\"hidden\" value=\"172\" name=\"conditionType\"\\s*(id=\"conditionType\")?\\s*>\\s*<input type=\"hidden\" value=\"true\" name=\"filterOnCondition\"\\s*(id=\"filterOnCondition\")?\\s*>\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]

forms['severe-spasticity-cerebral-palsy'] = [
'original': '''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" value="4" name="therapy" id="therapy">
    <input type="hidden" value="true" name="condition" id="condition">
    <input type="hidden" value="173" name="conditionType" id="conditionType">
    <input type="hidden" value="true" name="filterOnCondition" id="filterOnCondition">
    <input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte' : "<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" value=\"4\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"true\" name=\"condition\"\\s*(id=\"condition\")?\\s*>\\s*<input type=\"hidden\" value=\"173\" name=\"conditionType\"\\s*(id=\"conditionType\")?\\s*>\\s*<input type=\"hidden\" value=\"true\" name=\"filterOnCondition\"\\s*(id=\"filterOnCondition\")?\\s*>\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]

forms['severe-spasticity-multiple-sclerosis'] = [
'original' :
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" value="4" name="therapy" id="therapy">
    <input type="hidden" value="true" name="condition" id="condition">
    <input type="hidden" value="174" name="conditionType" id="conditionType">
    <input type="hidden" value="true" name="filterOnCondition" id="filterOnCondition">
    <input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte':"<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" value=\"4\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"true\" name=\"condition\"\\s*(id=\"condition\")?\\s*>\\s*<input type=\"hidden\" value=\"174\" name=\"conditionType\"\\s*(id=\"conditionType\")?\\s*>\\s*<input type=\"hidden\" value=\"true\" name=\"filterOnCondition\"\\s*(id=\"filterOnCondition\")?\\s*>\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]

forms['severe-spasticity-spinal-cord-injury'] = [
'original':
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" value="4" name="therapy" id="therapy">
    <input type="hidden" value="true" name="condition" id="condition">
    <input type="hidden" value="176" name="conditionType" id="conditionType">
    <input type="hidden" value="true" name="filterOnCondition" id="filterOnCondition">
    <input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte':"<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" value=\"4\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"true\" name=\"condition\"\\s*(id=\"condition\")?\\s*>\\s*<input type=\"hidden\" value=\"176\" name=\"conditionType\"\\s*(id=\"conditionType\")?\\s*>\\s*<input type=\"hidden\" value=\"true\" name=\"filterOnCondition\"\\s*(id=\"filterOnCondition\")?\\s*>\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>//s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]

forms['severe-spasticity-stroke'] = [
'original':
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" value="4" name="therapy" id="therapy">
    <input type="hidden" value="true" name="condition" id="condition">
    <input type="hidden" value="177" name="conditionType" id="conditionType">
    <input type="hidden" value="true" name="filterOnCondition" id="filterOnCondition">
    <input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte': "<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" value=\"4\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"true\" name=\"condition\"\\s*(id=\"condition\")?\\s*>\\s*<input type=\"hidden\" value=\"177\" name=\"conditionType\"\\s*(id=\"conditionType\")?\\s*>\\s*<input type=\"hidden\" value=\"true\" name=\"filterOnCondition\"\\s*(id=\"filterOnCondition\")?\\s*>\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]

forms['severe-spasticity'] = [
'original':
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" value="4" name="therapy" id="therapy">
    <input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte': "<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" value=\"4\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]

forms['urinary-retention'] = [
'original':
'''<form target="_blank" action="http://www.medtronic.com/physicianlocator/googleMaps/showResults" method="get" class="mdt-form" data-toggle="validator" role="form">
    <input type="hidden" value="1" name="therapy" id="therapy">
    <input type="hidden" value="zipCode" name="searchByFilterName">
	<fieldset>
		<legend>Find a Doctor</legend>
		<div class="form-group">
			<label for="searchByFilterValue">Your ZIP Code <i class="required-field-indicator">*</i></label>
			<input type="text" class="form-control" name="searchByFilterValue" id="searchByFilterValue" aria-required="true" required data-error="Please enter a ZIP code.">
			<div class="help-block with-errors"></div>
		</div>
	</fieldset>
	<input type="submit" class="btn btn-default disabled" value="Submit">
</form>''',
'rte': "<form target=\"_blank\" action=\"http://www.medtronic.com/physicianlocator/googleMaps/showResults\" method=\"get\" class=\"mdt-form\" data-toggle=\"validator\" role=\"form\">\\s*<input type=\"hidden\" value=\"1\" name=\"therapy\"\\s*(id=\"therapy\")?\\s*>\\s*<input type=\"hidden\" value=\"zipCode\" name=\"searchByFilterName\">\\s*<fieldset>\\s*<legend>Find a Doctor</legend>\\s*<div class=\"form-group\">\\s*<label for=\"searchByFilterValue\">Your ZIP Code <i class=\"required-field-indicator\">\\*</i>\\s*</label>\\s*<input type=\"text\" class=\"form-control\" name=\"searchByFilterValue\"\\s*(id=\"searchByFilterValue\")?\\s*aria-required=\"true\"\\s*(required)?\\s*data-error=\"Please enter a ZIP code.\">\\s*<div class=\"help-block with-errors\">(&nbsp;)?</div>\\s*</div>\\s*</fieldset>\\s*(<br>)?\\s*<input type=\"submit\" class=\"btn btn-default disabled\" value=\"Submit\">\\s*(<p>&nbsp;</p>)?\\s*</form>"
]

}
return printOutput()