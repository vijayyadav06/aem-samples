import javax.jcr.query.Query
import com.day.cq.wcm.commons.ReferenceSearch
import com.day.cq.wcm.commons.ReferenceSearch.Info
/****
 *
    The below script is used to find any DAM assets which are not currently referenced by content.

    The variables below can be configured to change where in the repository we're looking for assets and references.
    There are also variables to toggle print displays (if you want to see ones with only one reference, for example),
    as well as to automagically delete any assets that are not currently referenced.  Use this with CAUTION as it cannot
    be reversed.

****/

//where in content tree to look
referenceRootPath = "/jcr:root/content/medtronic-com"
//what kind of content nodes (leave if you are unsure)
referenceType = "nt:base"
//what asset location to check
assetRootPath = "/content/dam/medtronic-com-m"
//what type of asset (leave if you're unsure)
assetType = "dam:Asset"
//true will show exactly where the asset is referenced (if numReferencesToShow > 0)
showReferenceLocation = false

includeSubAssets = true;

// Be extremely careful setting this value to true.  It is not reversible and will delete all assets that do not
// have any references.  It is highly recommended to do a "dry-run" (set as false) and create a backup package of assetRootPath
// prior to running as true.
deleteUnreferencedAssets = false;

//Specify how many references the asset should have (or less) to display in results.
// 0 = only show assets which are not referenced
// 1 = show assets which are not referenced, as well as ones referenced only 1 time
// n = show assets which are referenced n or less times.
numReferencesToShow = 1000


// ***** DO NOT MODIFY BEYOND THIS POINT. ***** //
refSearch = new ReferenceSearch()
refSearch.setSearchRoot(referenceRootPath)
refSearch.setExact(true)
resourceReferenceList = [:]
//don't modify unless you know what you're doing
subAssetRegex = "%/subassets/%"


assetQuery = "SELECT * FROM [${assetType}] AS s WHERE ISDESCENDANTNODE([${assetRootPath}])"
if( !includeSubAssets ){
    assetQuery += " AND [jcr:path] NOT LIKE '${subAssetRegex}'"
}
assetResourcePaths = resourceResolver.findResources(assetQuery,Query.JCR_SQL2).collect { asset ->
    asset.path
} as Set

assetResourcePaths.each { assetPath ->
    assetReferences = getAssetReferences(assetPath)
    numReferences = assetReferences.size()
    if( resourceReferenceList[numReferences] == null){
        resourceReferenceList[numReferences] = [:];
    }
    resourceReferenceList[numReferences][assetPath] = assetReferences;
    if (deleteUnreferencedAssets && numReferences == 0){
        asset = resourceResolver.getResource(assetPath)
        resourceResolver.delete(asset)
    }
}

def printReferenceCount(){
    ( 0 .. numReferencesToShow ).each { i ->
        if( resourceReferenceList[i] != null ){
            def numAssets = resourceReferenceList[i].size();
            println "=============================================================================================================================="
            if( i == 0){
              println "The following asset(s) are not referenced anywhere under ${referenceRootPath}${deleteUnreferencedAssets ? ' and will be removed':''}. (${numAssets})"

            }else{
               println "The following asset(s) include ${i}  reference${i > 1 ? 's':''}. (${numAssets})"
            }
            println "=============================================================================================================================="
                resourceReferenceList[i].each{ assetPath, assetReferences ->
                    println "\t${assetPath} "+ (assetReferences.size() > 1 ? "(${assetReferences.size().toString()})":'')
                    if( showReferenceLocation && i > 0 ){
                        println "\t--------------------------------------------------------------------"
                        println "\tReferenced in:"

                        assetReferences.each{ referencePath ->
                            println "\t-->${referencePath}"
                    }
                }
            }
        }
    }
    if( deleteUnreferencedAssets ){
        resourceResolver.commit()
    }
}
// Note:  Page Properties are not scanned, just component properties.
// If you would like page properties scanned as well, remove "AND s.[jcr:primaryType] LIKE 'nt:unstructured'" from the below query.
// Doing so will produce some duplicate results.
def getAssetReferences(String assetPath){
    def resourceReferencePaths = [];
    Map<String,Info> results = refSearch.search( resourceResolver, assetPath)
    results.each { key ,value->
        value.getProperties().each { path ->
            resourceReferencePaths << path
        }
    }
    return resourceReferencePaths
}
return printReferenceCount()
