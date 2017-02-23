Medtronic.Authoring.NavigationMenu = (function() {
  "use strict";
  
	return {
		showNavUrl:{
			selectionChanged: function(box, isChecked) {
				var tabpanel = box.findParentByType('tabpanel');
				var navurl = tabpanel.find('name', './navigationUrl')[0];
				if (isChecked) {
					navurl.setDisabled(true);
				} else {
					navurl.setDisabled(false);
				}
			}
		}
	};
})();