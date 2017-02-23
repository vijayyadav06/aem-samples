Medtronic.Granite.Authoring.Migration = (function(){
    "use strict";

//Migration Tab Variables
  var PROP_LEGACY_MIGRATION_ID = "./migrationLegacyID";
  var PROP_MIGRATION_MIGRATED_CHECKBOX = "./migrationproperties_migrated";
  var ATTRIBUTE_VALUE = "value";

    $(document).on("cui-contentloaded", function(event,objects){
        //initialize the migration checkbox field
        var migrationCheckbox = $("input[name='" + PROP_MIGRATION_MIGRATED_CHECKBOX + "']");
        if (migrationCheckbox.length > 0) {
          var migration_id = $("input[name='" + PROP_LEGACY_MIGRATION_ID + "']").attr(ATTRIBUTE_VALUE);
          if (migration_id && migration_id.length > 0) {
            migrationCheckbox[0].checked = true;
          } else {
            migrationCheckbox[0].checked = false;
          }
        }
    });
})();