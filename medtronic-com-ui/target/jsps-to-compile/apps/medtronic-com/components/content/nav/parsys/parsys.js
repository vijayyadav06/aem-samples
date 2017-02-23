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

"use strict";

/**
 * Parsys sightly foundation component JS backing script
 */
var global = this;
use(["/libs/wcm/foundation/components/utils/ParagraphSystem.js"], function (ParagraphSystem) {
    var newParResourceType = granite.resource.resourceType + "/newpar";
    
    var parsys = new ParagraphSystem(granite.resource, newParResourceType, false);

    var isEditMode = false;
    if (global.wcmmode
        && global.wcmmode.isEdit()) {
        isEditMode = true;
    }

    return {
        renderInfo: parsys.getParagraphs(),
        isEditMode: isEditMode
    };
});
