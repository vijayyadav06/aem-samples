Medtronic.Authoring.TestimonialHero = (function() {
  return {
    image: {
      dialogselect: function(field, path) {
        var panel = field.findParentByType("panel");
        var altText = panel.find("name","./alttext")[0];
        altText.allowBlank = false;
        if ($('.alt-text label span').length == 0) {
          $('.alt-text label').append('<span class="cq-asterisk">*</span>');
        }
      },
      keyUp: function(field) {
        var value = field.getRawValue();
        var panel = field.findParentByType("panel");
        var altText = panel.find("name","./alttext")[0];
        if (value == '') {
          altText.allowBlank = true;
          var labelHtml = $('.alt-text label span').remove();
        } else {
          altText.allowBlank = false;
          if ($('.alt-text label span').length == 0) {
            $('.alt-text label').append('<span class="cq-asterisk">*</span>');
          }
        }
      },
      loadContent: function(field) {
        var path = field.getValue();
        if (path != '') {
          var panel = field.findParentByType("panel");
          var altText = panel.find("name","./alttext")[0];
          altText.allowBlank = false;
          if ($('.alt-text label span').length == 0) {
            $('.alt-text label').append('<span class="cq-asterisk">*</span>');
          }
        }
      }
    }
  };
})();