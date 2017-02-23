Medtronic.Authoring.Label = (function() {
  "use strict";
  return {
      page:{
          loadContent: function(field){
              var $input = $("#" + field.id);
              var $img = $input.parent().find("img");
              $input.click(function(){
				  $img.click();
              });
			  var text = $input.val();
              var pageLevel = field.fieldLabel.replace("Pages", "pages")
              if(text == ""){
				  $input.attr("placeholder", "Select a label to display on " + pageLevel);
              }
          },
          dialogSelect: function(field, path){
              var $input = $("#" + field.id);
			  var val = $input.val().split("\/").pop();
        	  var text = val.replace(/-/g, " ").replace(/(^|\s+)\w/g,function(s){
              				  return s.toUpperCase();
         				  });
        	  $input.val(text);
          }
      }
  };
})();