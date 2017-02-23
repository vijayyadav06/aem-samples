Medtronic.Authoring.TitleTextAsset = (function() {
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
    }
  };
})();