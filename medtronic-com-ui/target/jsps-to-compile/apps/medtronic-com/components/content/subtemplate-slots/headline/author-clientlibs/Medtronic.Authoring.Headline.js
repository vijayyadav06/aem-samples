Medtronic.Authoring.Headline = (function() {
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
    dialog: {
      beforeSubmit: function(dialog) {
        if (!Medtronic.Authoring.validateEManualUrls(dialog)) { return false; }

        return true;
      },
      loadContent: function(dialog) {
        Medtronic.Authoring.addMinimumMultifieldItems(dialog);
        Medtronic.Authoring.enableLabelFields(dialog.find('name', './showLabel')[0]);
      },

      /* change the Line index */
      removeMultiItem: function(field) {
        var count = field.items.getCount() - 1;
        for (var i = 0; i < count; i++) {
          var index = i + 1;
          var listItem = field.items.get(i).findByType('textfield')[0];
          var itemLabel = $("#" + listItem.id).parent().parent().children("label")[0];
          var listItemField = field.items.get(i).find('key', 'text');
          $(itemLabel).text('Line ' + index + '*');
        }
      },

      /* display item index dynamically(Line) */
      displayLineLabel: function(box) {
        var field = box.findParentByType('multifield');
        var count = field.items.getCount() - 1;
        for (var i = 0; i < count; i++) {
          var index = i + 1;
          var listItem = field.items.get(i).findByType('textfield')[0];
          listItem.focus(false, 10);
          var itemLabel = $("#" + listItem.id).parent().parent().children("label")[0];
          var listItemField = field.items.get(i).find('key', 'text');
          $(itemLabel).text('Line ' + index + '*');
        }
      }

    }
  };
})();