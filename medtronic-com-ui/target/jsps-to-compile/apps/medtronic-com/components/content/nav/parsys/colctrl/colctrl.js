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
 * Column control sightly foundation component JS backing script
 */
"use strict";
var global = this;
use(["../../utils/AuthoringUtils.js"], function (AuthoringUtils) {
    
    var CONST = {
        COL_CONTROL_TYPE_PROPERTY: "controlType",
        COL_CONTROL_LAYOUT_PROPERTY: "layout",
        COL_CONTROL_DEFAULT_LAYOUT: "1;cq-colctrl-default",
        
        START_PAR_COLUMN_TYPE: "start",
        END_PAR_COLUMN_TYPE: "end"
    };
    
    var _retrieveAttribute = function (attrName, defaultValue) {
        var value = defaultValue;
        if (global.request
                && global.request.getAttribute
                && global.request.getAttribute(attrName)) {
            value = global.request.getAttribute(attrName);
        }
        
        return value;
    }
    
    var _getEditContext = function () {
        var editContext = undefined;
        var componentContext = _retrieveAttribute("com.day.cq.wcm.componentcontext");
        if (componentContext) {
            editContext = componentContext.getEditContext();
        }
        
        return editContext;
    }
    
    var _getEditConfig = function () {
        var editConfig = undefined;
        var editContext = _getEditContext();
        if (editContext) {
            editConfig = editContext.getEditConfig();
        }
        
        return editConfig;
    }
    
    var editConfig = _getEditConfig();
    var editContext = _getEditContext();
    var isStart = properties.get(CONST.COL_CONTROL_TYPE_PROPERTY, CONST.START_PAR_COLUMN_TYPE) == CONST.START_PAR_COLUMN_TYPE;
    var isEnd = properties.get(CONST.COL_CONTROL_TYPE_PROPERTY, CONST.END_PAR_COLUMN_TYPE) == CONST.END_PAR_COLUMN_TYPE;
    var totalColumns = 0;

    if (typeof wcmmode != "undefined") {
        if (isStart && editConfig) {
            var layout = properties.get(CONST.COL_CONTROL_LAYOUT_PROPERTY, CONST.COL_CONTROL_DEFAULT_LAYOUT);
            var layoutInfo = layout.split(";");
            if (layoutInfo.length > 1) {
                totalColumns = layoutInfo[0];
            }
            editConfig.getToolbar().add(0, new global.Packages.com.day.cq.wcm.api.components.Toolbar.Separator());
            editConfig.getToolbar().add(0, new global.Packages.com.day.cq.wcm.api.components.Toolbar.Label("Start of " + totalColumns + " Columns"));
            editConfig.setOrderable(false);
        } else if (isEnd && editConfig && editContext) {
            editConfig.getToolbar().clear();
            editConfig.getToolbar().add(new global.Packages.com.day.cq.wcm.api.components.Toolbar.Label("End of Columns"));
            editConfig.setOrderable(false);
            editContext.setContentPath(resource.getPath() + "_fake");
        }
    }
    return {
        start: isStart,
        end: isEnd,
        totalColumns: totalColumns,
        isTouch: AuthoringUtils.isTouch
    };
});