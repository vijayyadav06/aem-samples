Medtronic.Authoring.CookieWarning = (function() {
  return {
    showDetails: {
      selectionChanged: function(box, value) {
        var textDetails = box.ownerCt.getComponent("textDetails");
        textDetails.items.items.forEach(function(field) {
          if (value != "none") {
            field.enable();
            field.show();
          } else {
            field.disable();
            field.hide();
          }
        });
        textDetails.doLayout();

		var buttonDetails = box.ownerCt.getComponent("buttonDetails");
          buttonDetails.items.items.forEach(function(field) {
          if (value == "explicit") {
            field.enable();
            field.show();
          } else {
            field.disable();
            field.hide();
          }
        });
        buttonDetails.doLayout();
      },
      loadContent: function(box) {
        var textDetails = box.ownerCt.getComponent("textDetails");
        textDetails.items.items.forEach(function(field) {
          if (box.value !="none") {
            field.enable();
            field.show();
          } else {
            field.disable();
            field.hide();
          }
        });

        var buttonDetails = box.ownerCt.getComponent("buttonDetails");
        buttonDetails.items.items.forEach(function(field) {
          if (box.value =="explicit") {
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