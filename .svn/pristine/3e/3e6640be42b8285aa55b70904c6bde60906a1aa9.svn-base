use(["/apps/medtronic-com/components/common/RunModes.js","/apps/medtronic-com/components/common/LanguageUtil.js"], function(runmodes,LanguageUtil) {
  "use strict";

  var LABEL_VALUES = {
    NOT_AVAILABLE: "LABEL NOT AVAILABLE",
    EMPTY: "",
    DEFAULT_VALUE: "Select a label"
  };

  var PAGE_LEVEL = {
    LEVEL1: "L1",
    LEVEL2: "L2",
    LEVEL3: "L3"
  }

  var PAGE_PROPERTIES = {
    L1_PROPERTY: "pagesL1",
    L2_PROPERTY: "pagesL2L3"
  }

  var RUNMODE_PUBLISH = "publish";

  function getLabelTitleFromPath(labelPath){
    var title = labelPath;
    var tagManager = request.getResourceResolver().adaptTo(Packages.com.day.cq.tagging.TagManager);
    var labelNode = tagManager.resolve(labelPath);
    if( labelNode != null ){
        title = labelNode.getTitle(LanguageUtil.getPageLanguage());
    }
    return title;
  }

  function getLabelText(pageType, url) {
    var label = LABEL_VALUES.EMPTY;
    if (url != null) {
      if (!runmodes[RUNMODE_PUBLISH]) {
        label = LABEL_VALUES.NOT_AVAILABLE;
      }
      var targetPage = pageManager.getPage(url);
      if (targetPage != null) {
        var labelPath = LABEL_VALUES.EMPTY;
        var targetProperties = targetPage.getProperties();
        var optionL1 = targetProperties.get(PAGE_PROPERTIES.L1_PROPERTY, "");
        var optionL2 = targetProperties.get(PAGE_PROPERTIES.L2_PROPERTY, "");
        if ((pageType == PAGE_LEVEL.LEVEL1 || pageType == PAGE_LEVEL.LEVEL2 || pageType == PAGE_LEVEL.LEVEL3)
                && (optionL1 != LABEL_VALUES.EMPTY) && (optionL1.indexOf(LABEL_VALUES.DEFAULT_VALUE) != 0)) {
          labelPath = optionL1;
        }

        if ((pageType == PAGE_LEVEL.LEVEL2 || pageType == PAGE_LEVEL.LEVEL3) && (optionL2 != LABEL_VALUES.EMPTY)
                && (optionL2.indexOf(LABEL_VALUES.DEFAULT_VALUE) != 0)) {
          labelPath = optionL2;
        }

        if( labelPath != "" ){
            label = getLabelTitleFromPath(labelPath);
        }
      }
    }

    return label;

  }
  return {
    labelText: getLabelText(this.pageLevel, this.labelHyperlink),

    getLabelTextFor: function(pageType, url) {
      return getLabelText(pageType, url);
    }
  }

});