Medtronic.Authoring.ReferenceFootnote = (function() {
  "use strict";
  // Component listeners goes here
  return {
    data: {
      itemCount: 0,
      added: function(panel, index) {
        this.itemCount = this.itemCount + 1;
        var content = panel.find("key", "content")[0];
        content.fieldLabel = "List Item " + this.itemCount + "*";
      },
      removedItem: function(field) {
        if (this.itemCount == 0) { return false; }
        this.itemCount = this.itemCount - 1;
        var labelItems = $("#" + field.id).find("label");
        $(labelItems).each(function(index) {
          var subLabelContent = "<br><span class='sub-label'>Add only one reference or footnote per List Item box.</span>";
          $(this).html("List Item " + (index + 1) + "*" + subLabelContent);
        });
      }
    }
  };
})();