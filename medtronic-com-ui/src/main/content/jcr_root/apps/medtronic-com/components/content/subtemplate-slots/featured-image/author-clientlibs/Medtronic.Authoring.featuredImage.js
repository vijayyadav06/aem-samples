Medtronic.Authoring.featuredImage = (function() {
  return {
    dialog: {
      loadContent: function(dialog) {
        Medtronic.Authoring.enableLabelFields(dialog.find('name', './showLabel')[0]);
      }
    }
  };
})();