Medtronic.Authoring.PressReleaseHeader = (function() {
	return {
		date: {
			render: function(box) {
				box.setMaxValue(new Date());
			}
		},
		rte:{
			validator:function(field){
				var valid = Medtronic.Authoring.validateEManualUrl(field);
				// we must explicitly check for true, since valid is either an error message or true
				if (valid === true) {
					var fieldValue = field.getValue() || "";
					var richtext = $($.parseHTML(fieldValue));
					var paragraphs = richtext.filter("p");
					if (paragraphs.length > 0) {
						valid = "Please only add one paragraph to the press release richtext area.";
					}
				}
				return valid;
			}
		}
	};
})();