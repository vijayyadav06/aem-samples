Medtronic.Authoring.HeadlineWithISI = (function() {
  return {
    showCta: {
      selectionChanged: function(box, isChecked) {
        var ctaDetails = box.ownerCt.getComponent("ctaDetails");

        ctaDetails.items.items.forEach(function(field) {
          if (isChecked) {
            field.enable();
          } else {
            field.disable();
          }
        });

        ctaDetails.doLayout();
      },
      loadContent: function(box) {
        var ctaDetails = box.ownerCt.getComponent("ctaDetails");

        ctaDetails.items.items.forEach(function(field) {
          if (box.value) {
            field.enable();
          } else {
            field.disable();
          }
        });
      }
    },
    isiType: {
        selectionchanged: function(box, value){
          var tabpanel = box.findParentByType('tabpanel');
  		  var field = tabpanel.find('name', './isiText')[0];
          var url = tabpanel.find('name', './isiUrl')[0];
          var newTab = tabpanel.find('name', './isiNewTab')[0];
          var state = false;
          if (value != 'textAndGraphic') {
            state = true;
          }
          field.setDisabled(state);
          url.setDisabled(state);
          newTab.setDisabled(state);
        }
    }, 
    dialog: {
      beforeSubmit: function(dialog) {
        if (!Medtronic.Authoring.validateEManualUrls(dialog)) {
          return false;
        }
        
        return true;
      },
      loadContent: function(dialog) {
        Medtronic.Authoring.addMinimumMultifieldItems(dialog);
      }
    },
    text: {
      itemCount: 1,
      added: function(panel) {
        var headlineText = panel.find("key", "headingText")[0];
        headlineText.fieldLabel = "Line " + this.itemCount;
        this.itemCount = this.itemCount + 1;
      },
      removedItem: function(field) {
        if (this.itemCount == 1) { return false; }
        this.itemCount = this.itemCount - 1;
        var multiItems = field.items.items;
        multiItems.forEach(function(item, index) {
          var headline = item.find("key", "headingText")[0];
          var label = $("#" + headline.id).parents(".headline-isi-heading-text").find("label")[0];
          $(label).text("Line " + (index + 1));
          $(label).append('<span class="cq-asterisk">*</span>');
        });
      }
    }
  };
})();