Medtronic.Authoring.WarnOnLeave = (function() {
  return {
    showWol: {
      selectionChanged: function(box, isChecked) {
        var wolDetails = box.ownerCt.getComponent("wolDetails");

        wolDetails.items.items.forEach(function(field) {
          if (isChecked) {
            field.enable();
            field.show();
          } else {
            field.disable();
            field.hide();
          }
        });
        wolDetails.doLayout();
      },
      loadContent: function(box) {
        var wolDetails = box.ownerCt.getComponent("wolDetails");
        wolDetails.items.items.forEach(function(field) {
          if (box.value) {
            field.enable();
            field.show();
          } else {
            field.disable();
            field.hide();
          }
        });
      }
    }
  };
})();