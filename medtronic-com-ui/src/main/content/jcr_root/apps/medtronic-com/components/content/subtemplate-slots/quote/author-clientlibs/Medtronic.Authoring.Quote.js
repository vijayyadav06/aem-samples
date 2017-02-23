Medtronic.Authoring.Quote = (function() {
  return {
    date: {
      render: function(box) {
        box.setMaxValue(new Date());
      }
    },
    dialog: {
      loadContent: function(dialog) {
        Medtronic.Authoring.enableLabelFields(dialog.find('name', './showLabel')[0]);
      }
    }
  };
})();