Medtronic.Authoring.Hero = (function() {
  var ALL_COLORS = {
    "navy-blue": {
      "text": "Navy Blue",
      "value": "navy-blue"
    },
    "medtronic-blue": {
      "text": "Medtronic Blue",
      "value": "medtronic-blue"
    },
    "cobalt-blue": {
      "text": "Cobalt Blue",
      "value": "cobalt-blue"
    },
    "medium-blue": {
      "text": "Medium Blue",
      "value": "medium-blue"
    },
    "sky-blue": {
      "text": "Sky Blue",
      "value": "sky-blue"
    },
    "light-blue": {
      "text": "Light Blue",
      "value": "light-blue"
    },
    "blue-gray": {
      "text": "Blue Gray",
      "value": "blue-gray"
    },
    "dark-gray": {
      "text": "Dark Gray",
      "value": "dark-gray"
    },
    "light-gray": {
      "text": "Light Gray",
      "value": "light-gray"
    },
    "white": {
      "text": "White",
      "value": "white"
    },
    "yellow": {
      "text": "Yellow",
      "value": "yellow"
    },
    "light-orange": {
      "text": "Light Orange",
      "value": "light-orange"
    },
    "orange": {
      "text": "Orange",
      "value": "orange"
    },
    "green": {
      "text": "Green",
      "value": "green"
    },
    "turquoise": {
      "text": "Turquoise",
      "value": "turquoise"
    },
    "purple": {
      "text": "Purple",
      "value": "purple"
    }
  };

  var TEXT_COLORS = {
    "bg-navy-blue": ["cobalt-blue", "medium-blue", "sky-blue", "light-blue", "blue-gray", "dark-gray", "light-gray",
        "white", "yellow", "light-orange", "orange", "green", "turquoise"],
    "bg-medtronic-blue": ["medium-blue", "sky-blue", "light-blue", "light-gray", "white", "yellow", "light-orange",
        "green", "turquoise"],
    "bg-sky-blue": ["navy-blue", "medtronic-blue", "purple"],
    "bg-light-blue": ["navy-blue", "medtronic-blue", "purple"],
    "bg-light-gray": ["navy-blue", "medtronic-blue", "purple"],
    "bg-white": ["navy-blue", "medtronic-blue", "cobalt-blue", "blue-gray", "dark-gray", "orange", "purple"]
  };

  var FRAME_COLORS = {
    "all": ["navy-blue", "medtronic-blue", "cobalt-blue", "medium-blue", "sky-blue", "light-blue", "blue-gray",
        "dark-gray", "light-gray", "white"],
    "bg-navy-blue": ["medtronic-blue", "cobalt-blue", "medium-blue", "sky-blue", "light-blue", "blue-gray",
        "dark-gray", "light-gray", "white"],

    "bg-medtronic-blue": ["navy-blue", "cobalt-blue", "medium-blue", "sky-blue", "light-blue", "blue-gray",
        "dark-gray", "light-gray", "white"],

    "bg-sky-blue": ["navy-blue", "medtronic-blue", "cobalt-blue", "medium-blue", "light-blue", "blue-gray",
        "dark-gray", "light-gray", "white"],

    "bg-light-blue": ["navy-blue", "medtronic-blue", "cobalt-blue", "medium-blue", "sky-blue", "blue-gray",
        "dark-gray", "light-gray", "white"],

    "bg-light-gray": ["navy-blue", "medtronic-blue", "cobalt-blue", "medium-blue", "sky-blue", "light-blue",
        "blue-gray", "dark-gray", "white"],

    "bg-white": ["navy-blue", "medtronic-blue", "cobalt-blue", "medium-blue", "sky-blue", "light-blue", "blue-gray",
        "dark-gray", "light-gray"]
  };

  var FRAME_TYPES = {
    "single-image": [{
      "text": "None",
      "value": "no-frame"
    }, {
      "text": "Brand Frame",
      "value": "brand-frame"
    }],
    "image-with-text": [{
      "text": "None",
      "value": "no-frame"
    }, {
      "text": "Brand Frame",
      "value": "brand-frame"
    }, {
      "text": "Brand Plus",
      "value": "brand-plus"
    }],
    "two-images": [{
      "text": "None",
      "value": "no-frame"
    }, {
      "text": "Brand Frame",
      "value": "brand-frame"
    }, {
      "text": "Brand Plus",
      "value": "brand-plus"
    }],
    "text-only": [{
      "text": "None",
      "value": "no-frame"
    }, {
      "text": "Brand Frame",
      "value": "brand-frame"
    }]
  }

  function setTextColorOptions(fields, backgroundColor) {
    var allowedColors = TEXT_COLORS[backgroundColor];
    var options = [];

    if (allowedColors) {
      allowedColors.forEach(function(allowedColor) {
        options.push(ALL_COLORS[allowedColor]);
      });
    }

    fields.forEach(function(textColorField) {
      textColorField.setOptions(options);
    });
  }
  
  function setFrameTypeOptions(frameTypeField, heroType) {
    var frameTypeOptions = FRAME_TYPES[heroType] || [];
    
    frameTypeField.setOptions(frameTypeOptions);
  }

  function setFrameColorOptions(field, backgroundColor, useAllColors) {
    var allowedColors = FRAME_COLORS[backgroundColor];
    var options = [];

    if (useAllColors) {
      allowedColors = FRAME_COLORS.all;
    }

    if (allowedColors) {
      allowedColors.forEach(function(allowedColor) {
        options.push(ALL_COLORS[allowedColor]);
      });
    }

    field.setOptions(options);
  }

  function toggleBackgroundColorField(frameColorField, heroType) {
    frameColorField.setDisabled(heroType === "single-image" || heroType === "two-images");
    frameColorField.clearInvalid();
  }

  function toggleFrameColorField(frameColorField, frameType) {
    frameColorField.setDisabled(frameType == "no-frame");
    frameColorField.clearInvalid();
  }

  function toggleHeroElements(heroElements, heroType) {
    heroElements.forEach(function(heroElement) {
      var isHeroType = heroElement[heroType];
      heroElement.setDisabled(!isHeroType);
      heroElement.setVisible(isHeroType);
    });
  }

  function toggleHeroElementFields(heroElement, enabled) {
    // disable hero fields within a hero element
    heroElement.find("heroElementField", true).forEach(function(heroField) {
      heroField.setDisabled(!enabled);
    });
  }

  function toggleCtaDetails(ctaDetails, showCta) {
    ctaDetails.setDisabled(!showCta);
  }

  function toggleCtaFields(ctaDetails, showCta) {
    var ctaFields = getCtaFields(ctaDetails);

    ctaFields.forEach(function(ctaField) {
      ctaField.setDisabled(!showCta);
      ctaField.clearInvalid();
    });
  }

  function toggleTextLocationFieldSet(textLocationFieldSet, enabled) {
    var dialog = textLocationFieldSet.findParentByType("dialog");

    var frameTypeField = getFrameTypeField(dialog);
    var frameType = frameTypeField.getValue();
    var notBrandPlus = frameType !== "brand-plus";

    textLocationFieldSet.setVisible(enabled && notBrandPlus);
    toggleHeroElementFields(textLocationFieldSet, enabled && notBrandPlus);
  }

  function toggleTextFieldSet(textFieldSet, enabled) {
    var dialog = textFieldSet.findParentByType("dialog");
    toggleHeroElementFields(textFieldSet, enabled);

    var showCtaField = getShowCtaField(dialog);
    var ctaDetails = getCtaDetails(dialog);
    var showCta = Medtronic.Authoring.getCheckboxValue(showCtaField);

    toggleCtaDetails(ctaDetails, showCta);
  }

  function getHeroTypeField(dialog) {
    return dialog.find("name", "./heroType")[0];
  }

  function getHeroElements(dialog) {
    return dialog.find("heroElement", true);
  }

  function getHeroElementFields(heroElement) {
    return heroElement.find("heroElementField", true);
  }

  function getBackgroundColorField(dialog) {
    return dialog.find("name", "./textBackgroundColor")[0];
  }

  function getFrameTypeField(dialog) {
    return dialog.find("name", "./frameType")[0];
  }

  function getFrameColorField(dialog) {
    return dialog.find("name", "./frameColor")[0];
  }

  function getTextColorFields(dialog) {
    return dialog.find("key", "_DNT_textColor");
  }

  function getShowCtaField(dialog) {
    return dialog.find("name", "./showCta")[0];
  }

  function getCtaDetails(dialog) {
    return dialog.find("itemId", "ctaDetails")[0];
  }

  function getCtaFields(dialog) {
    return dialog.find("ctaField", true);
  }

  function getTextLocationFieldSet(dialog) {
    return dialog.find("itemId", "textLocationFieldSet")[0];
  }

  return {
    dialog: {
      loadContent: function(dialog) {
        var heroTypeField = getHeroTypeField(dialog);
        var heroElements = getHeroElements(dialog);
        var backgroundColorField = getBackgroundColorField(dialog);
        var frameTypeField = getFrameTypeField(dialog);
        var frameColorField = getFrameColorField(dialog);
        var textColorFields = getTextColorFields(dialog);
        var textLocationFieldSet = getTextLocationFieldSet(dialog);

        var heroType = heroTypeField.getValue();
        var backgroundColor = backgroundColorField.getValue();
        var frameType = frameTypeField.getValue();
        var useAllFrameColors = heroType === "single-image" || heroType === "two-images";

        Medtronic.Authoring.addMinimumMultifieldItems(dialog);

        toggleBackgroundColorField(backgroundColorField, heroType);
        toggleFrameColorField(frameColorField, frameType);

        toggleHeroElements(heroElements, heroType);

        setFrameTypeOptions(frameTypeField, heroType);
        setFrameColorOptions(frameColorField, backgroundColor, useAllFrameColors);
        setTextColorOptions(textColorFields, backgroundColor);

        toggleTextLocationFieldSet(textLocationFieldSet, !textLocationFieldSet.disabled);
      }
    },

    /* dialog field handlers */
    heroType: {
      selectionChanged: function(heroTypeField, heroType) {
        var dialog = heroTypeField.findParentByType("dialog");
        var backgroundColorField = getBackgroundColorField(dialog);
        var heroElements = getHeroElements(dialog);
        var frameColorField = getFrameColorField(dialog);
        var frameTypeField = getFrameTypeField(dialog);
        
        var useAllFrameColors = heroType === "single-image" || heroType === "two-images";
        var backgroundColor = backgroundColorField.getValue();

        toggleBackgroundColorField(backgroundColorField, heroType);
        setFrameTypeOptions(frameTypeField, heroType);
        setFrameColorOptions(frameColorField, backgroundColor, useAllFrameColors);
        toggleHeroElements(heroElements, heroType);
      }
    },
    backgroundColor: {
      selectionChanged: function(backgroundColorField, backgroundColor) {
        var dialog = backgroundColorField.findParentByType("dialog");
        var frameColorField = getFrameColorField(dialog);
        var textColorFields = getTextColorFields(dialog);

        setTextColorOptions(textColorFields, backgroundColor);
        setFrameColorOptions(frameColorField, backgroundColor);

        frameColorField.setValue(frameColorField.defaultValue);
        textColorFields.forEach(function(textColorField) {
          textColorField.setValue(textColorField.defaultValue);
        });
      }
    },
    frameType: {
      selectionChanged: function(frameTypeField, frameType) {
        var dialog = frameTypeField.findParentByType("dialog");
        var frameColorField = getFrameColorField(dialog);
        var textLocationFieldSet = getTextLocationFieldSet(dialog);

        toggleFrameColorField(frameColorField, frameType);
        toggleTextLocationFieldSet(textLocationFieldSet, !textLocationFieldSet.disabled);

        if (frameType == "no-frame") {
          colorField.setValue(frameColorField.defaultValue);
        }
      }
    },
    headings: {
      add: function(container, item, index) {
        if (item.xtype === "mdtmultifieldpanel") {
          var dialog = container.findParentByType("dialog");
          var backgroundColorField = getBackgroundColorField(dialog);
          var backgroundColor = backgroundColorField.getValue();
          setTextColorOptions(getTextColorFields(item), backgroundColor);
        }
      },
      itemCount: 1,
      added: function(panel) {
        var headlineText = panel.find("key", "text")[0];
        headlineText.fieldLabel = "Line " + this.itemCount;
        this.itemCount = this.itemCount + 1;
      },
      removedItem: function(field) {
        if (this.itemCount == 1) { return false; }
        this.itemCount = this.itemCount - 1;
        var multiItems = field.items.items;
        multiItems.forEach(function(item, index) {
          var headline = item.find("key", "text")[0];
          var label = $("#" + headline.id).parents(".hero-heading-text").find("label")[0];
          $(label).text("Line " + (index + 1));
          $(label).append('<span class="cq-asterisk">*</span>');
        });
      }
    },
    showCta: {
      selectionChanged: function(showCtaCheckbox, showCta) {
        var dialog = showCtaCheckbox.findParentByType("dialog");
        var ctaDetails = getCtaDetails(dialog);

        toggleCtaDetails(ctaDetails, showCta);
      }
    },

    /* dialog field set handlers */
    ctaDetails: {
      enable: function(ctaDetails) {
        toggleCtaFields(ctaDetails, true);
      },
      disable: function(ctaDetails) {
        toggleCtaFields(ctaDetails, false);
      }
    },
    textLocationFieldSet: {
      enable: function(textLocationFieldSet) {
        toggleTextLocationFieldSet(textLocationFieldSet, true);
      },
      disable: function(imageTwoFieldSet) {
        toggleTextLocationFieldSet(textLocationFieldSet, false);
      }
    },
    textFieldSet: {
      enable: function(textFieldSet) {
        toggleTextFieldSet(textFieldSet, true);
      },
      disable: function(textFieldSet) {
        toggleTextFieldSet(textFieldSet, false);
      }
    },
    imageOneFieldSet: {
      enable: function(imageOneFieldSet) {
        toggleHeroElementFields(imageOneFieldSet, true);
      },
      disable: function(imageOneFieldSet) {
        toggleHeroElementFields(imageOneFieldSet, false);
      }
    },
    imageTwoFieldSet: {
      enable: function(imageTwoFieldSet) {
        toggleHeroElementFields(imageTwoFieldSet, true);
      },
      disable: function(imageTwoFieldSet) {
        toggleHeroElementFields(imageTwoFieldSet, false);
      }
    }
  }
})();