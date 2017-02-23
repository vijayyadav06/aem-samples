Medtronic.Authoring.Inspirational = (function() {
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
      loadContent: function(box, record) {
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
    dialog: {
      beforeSubmit: function(dialog) {
        if (!Medtronic.Authoring.validateEManualUrls(dialog)) { return false; }

        return true;
      },
      loadContent: function(dialog) {
        Medtronic.Authoring.addMinimumMultifieldItems(dialog);
        Medtronic.Authoring.enableLabelFields(dialog.find('name', './showLabel')[0]);
      }
    },
    text: {
      itemCount: 1,
      added: function(panel) {
        var headlineText = panel.find("key", "text")[0];
        headlineText.focus(false, 10);
        headlineText.fieldLabel = "Line " + this.itemCount;
        this.itemCount = this.itemCount + 1;
      },
      removedItem: function(field) {
        if (this.itemCount == 1) { return false; }
        this.itemCount = this.itemCount - 1;
        var multiItems = field.items.items;
        multiItems.forEach(function(item, index) {
          var headline = item.find("key", "text")[0];
          var label = $("#" + headline.id).parents(".inspirational-headline").find("label")[0];
          $(label).text("Line " + (index + 1));
        });
      }
    }
  };
})();