Medtronic.Authoring.Acknowledgement = (function() {
  return {
      authTypeChanged: function(box, value) {
        var acknowledgementDetails = box.ownerCt.getComponent("acknowledgementDetails");

        acknowledgementDetails.items.items.forEach(function(field) {
          if (value == 'acknowledgement') {
            field.enable();
            field.show();
          } else {
            field.disable();
            field.hide();
          }
        });
        acknowledgementDetails.doLayout();
      },
      loadContent: function(box) {
        var acknowledgementDetails = box.ownerCt.getComponent("acknowledgementDetails");
        acknowledgementDetails.items.items.forEach(function(field) {
          if (box.value) {
            field.enable();
            field.show();
          } else {
            field.disable();
            field.hide();
          }
        });
      }
  };
})();