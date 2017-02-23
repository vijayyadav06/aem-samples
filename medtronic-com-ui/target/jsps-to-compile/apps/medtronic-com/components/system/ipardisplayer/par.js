/*  ADOBE CONFIDENTIAL
  __________________

   Copyright 2014 Adobe Systems Incorporated
   All Rights Reserved.

  NOTICE:  All information contained herein is, and remains
  the property of Adobe Systems Incorporated and its suppliers,
  if any.  The intellectual and technical concepts contained
  herein are proprietary to Adobe Systems Incorporated and its
  suppliers and are protected by trade secret or copyright law.
  Dissemination of this information or reproduction of this material
  is strictly forbidden unless prior written permission is obtained
  from Adobe Systems Incorporated.
*/

/**
 * iParsys paragraph sightly foundation component JS backing script
 */
"use strict";
use(["/libs/wcm/foundation/components/utils/ResourceUtils.js", "/libs/wcm/foundation/components/utils/ParagraphSystem.js", "/libs/sightly/js/3rd-party/q.js"], function (ResourceUtils, ParagraphSystem, Q) {
    
    var isParentCanceled = false;
    
    var CONST = {
        PROP_INHERITANCE: "inheritance",
        INHERITANCE_CANCELED: "cancel",
        INHERITANCE_PAR_SUFFIX: "/iparsys/par"
    }

    /**
     * Compute the paragraphs that need rendering
     * Will include parent's content recursively when encountering resource types having the INHERITANCE_PAR_SUFFIX suffix
     */
    var _getParagraphs = function (parentResource, parSysPath, allParagraphsPromise, collector) {
        
        if (!collector) {
            collector = [];
        }
        
        var parPath = parentResource.path + "/jcr:content/" + parSysPath;

        log.debug("Trying to resolve resource " + parPath);

        parentResource.resolve(parPath).then(function (parResource) {
            try {
                log.debug("Reading paragraphs under resource " + parResource.path);
                var isCanceled = parResource.properties[CONST.PROP_INHERITANCE] == CONST.INHERITANCE_CANCELED;
                
                isParentCanceled = isParentCanceled || isCanceled;
                if (isCanceled) {
                    log.debug("iParsys: Inheritance cancelled, not collecting paragraphs");
                    allParagraphsPromise.resolve(collector);
                    return;
                }
                
                log.debug("iParsys: Building paragraph system under " + parResource.path);
                var parsys = new ParagraphSystem(parResource, undefined, false);
                log.debug("iParsys: Built paragraph system under " + parResource.path);
                parsys.getParagraphs().then(function (paragraphs) {
                    log.debug("iParsys: Found " + paragraphs.length + " paragraphs");
                    for (var parIdx = 0 ; parIdx < paragraphs.length ; parIdx++) {
                        var currentPar = paragraphs[parIdx];
                        log.debug("iParsys: Found paragraph " + currentPar.path);
                        var resourceType = currentPar.resourceType;
                        if (resourceType.indexOf(CONST.INHERITANCE_PAR_SUFFIX) >= 0) {
                            // do recursive call to determine parent's content
                            log.debug("Recursing into paragraphs of resource " + parResource.path);
                            parentResource.getParent().then(function (newParent) {
                                _getParagraphs(newParent, parSysPath, allParagraphsPromise, collector);
                            });
                        } else {
                            collector.push(currentPar);
                        }
                    }
                    
                    allParagraphsPromise.resolve(collector);
                });
            } catch (e) {
                log.error(e);
            }
        }, function() {
            log.debug("Can't resolve " + parPath + " trying parent ");
            parentResource.getParent().then(function (newParent) {
                _getParagraphs(newParent, parSysPath, allParagraphsPromise, collector);
            }, function() {
                log.debug("No parent for " + parentResource.path + " found!");
                allParagraphsPromise.resolve(collector);
            });
        });
        
    };
    
    var parentResource = undefined;
    var inheritanceDisabled = granite.resource.properties[CONST.PROP_INHERITANCE] == CONST.INHERITANCE_CANCELED;
    
    var allParagraphsPromise = Q.defer();
    
    ResourceUtils.getContainingPage(granite.resource).then(function (containingPage) {
        containingPage.getParent().then(function (parentResource) {
            log.debug("Found iParsys parent Resource/Page: " + parentResource.path);
            
            // get page content relative path to the parsys
            var parSysPath = ResourceUtils.getRelativeParent(granite.resource.path, 1);
            
            var contentPrefix = containingPage.path + "/jcr:content";
            
            parSysPath = parSysPath.substring(contentPrefix.length + 1);
            
            log.debug("Using parsys path: " + parSysPath);
            
            if (!inheritanceDisabled) {
                _getParagraphs(parentResource, parSysPath, allParagraphsPromise);
            } else {
                allParagraphsPromise.resolve([]);
            }
        });
    });
    
    return {
        inheritanceDisabled: inheritanceDisabled,
        parentInheritanceDisabled: isParentCanceled,
        renderInfo: allParagraphsPromise.promise
    };
});
