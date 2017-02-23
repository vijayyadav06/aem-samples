Medtronic.Authoring.SideRailSubtemplate = (function() {
  function toggleDecorativeCheckbox(box, value) {
    var decorativeCheckbox = box.findParentByType("dialog").find("name", "./decorativeOnly")[0];
    
    if (value == "one-by-one" || value == "one-by-two") {
      decorativeCheckbox.enable();
    } else {
      decorativeCheckbox.disable();
    }
  }
  
  return {
    wrapperSize: {
      selectionChanged: toggleDecorativeCheckbox
    },
    dialog: {
      loadContent: function(dialog) {
        var wrapperSizeSelection = dialog.find("name", "./wrapperSize")[0];
        toggleDecorativeCheckbox(wrapperSizeSelection, wrapperSizeSelection.getValue());
      }
    }
  };
})();