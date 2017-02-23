import javax.jcr.query.Query
import groovy.json.*
// where should we look?
queryRoot = "/content/medtronic-com"
// Component ResourceType, in crx/de, value of sling:resourceType
resourceType = "medtronic-com/components/content/subtemplate-slots/video-slender-squat"
// Which property are you looking for (refer to crx/de)
resourceProperty = "videos"

// Save or Dry Run
saveChanges = true

/*
DO NOT MODIFY BELOW THIS LINE.
 */
tableRows = []
tableHeaders = ["Path","Original Value(videos)","Modified Value (videos)"]
query = "SELECT * FROM [nt:unstructured] AS s WHERE ISDESCENDANTNODE([${queryRoot}]) AND s.[sling:resourceType] LIKE '${resourceType}' AND (s.[${resourceProperty}] IS NOT NULL)"


def resourcePaths = resourceResolver.findResources(query, Query.JCR_SQL2).collect { resource ->
    resource.path
} as Set

resourcePaths.each { resourcePath ->

    def valueMap = resourceResolver.getResource(resourcePath).adaptTo(ModifiableValueMap.class)
    def resourcePropArray = valueMap.get(resourceProperty,String[].class)
    String[] newResourcePropArray = new String[resourcePropArray.size()]
    resourcePropArray.eachWithIndex { value,index ->
        def jsonSlurper = new JsonSlurper()
        def jsonValue = jsonSlurper.parseText(value)
        def transcript = jsonValue.transcript
        if( transcript != null ){
            def tableRow = []
            tableRow << resourcePath
            tableRow << value
            def transcriptJson = jsonSlurper.parseText(jsonValue.transcript)
            //support both before/after DNT translation (as these weren't matched properly before)
            jsonValue._DNT_showTranscript = transcriptJson._DNT_showTranscript || transcriptJson.showTranscript
            jsonValue.transcriptText = transcriptJson.transcriptText
            jsonValue.transcriptURL = transcriptJson.transcriptURL
            jsonValue._DNT_transcriptNewTab = transcriptJson._DNT_transcriptNewTab || transcriptJson.transcriptNewTab
            jsonValue.remove("transcript")
            def newPropString = JsonOutput.toJson(jsonValue)
            tableRow << newPropString
            newResourcePropArray[index] = newPropString
            tableRows << tableRow
        }
    }
    valueMap.remove(resourceProperty)
    valueMap.put(resourceProperty,newResourcePropArray)
}
if( saveChanges ){
    resourceResolver.commit()
}else{
    resourceResolver.revert()
}

return table {
    columns(tableHeaders)
    rows(tableRows)
}