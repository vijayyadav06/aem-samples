Medtronic.Authoring = (function() {
  "use strict";

  var XTYPE = {
          PATHFIELD: "pathfield",
          RICHTEXT: "richtext",
          MULTIFIELD: "multifield",
          SELECTION: "selection",
          CHECKBOX: "checkbox",
          DIALOG: "dialog",
          NAME: "name"
  };

  var E_MANUAL = {
          MANUALS_HOST: "manuals.medtronic",
          MANUALS_PATH: "/manuals/search",
          ERROR_MESSAGE: "Please contact an Oracle administrator for the correct URL for the eManual you are trying to link to."
  };

  var LABEL_FIELDS = {
          LABEL_HYPERLINK: "./labelHyperlink",
          NEWTAB: "./labelNewTab",
          INTERNAL_LINK: "/content/",
          LEGACY_MIGRATION_ID: "./migrationLegacyID",
          MIGRATED: "./migrationproperties_migrated"
  };

  return {
    validateEManualUrl: function(field) {
      /*
      RM: 03/2016 Setting to return true always to disable validation.
      MDT-2493
      --------
      // regex here to eliminate the need to clone
      var fieldValue = field.getValue() || "";
      var fieldValid;
      var extraText;

      if (field.xtype === XTYPE.PATHFIELD) {
        fieldValue = fieldValue.toLowerCase();
        fieldValid = fieldValue.indexOf(E_MANUAL.MANUALS_HOST) === -1 || fieldValue.indexOf(E_MANUAL.MANUALS_PATH) > -1;
      } else if (field.xtype === XTYPE.RICHTEXT) {
        var richtext = $($.parseHTML(fieldValue));
        var links = richtext.find("a").andSelf().filter("a");

        var badLinks = links.filter(function(_, link) {
          var linkHref = ($(link).attr("href") || "").toLowerCase();
          return linkHref.indexOf(E_MANUAL.MANUALS_HOST) > -1 && linkHref.indexOf(E_MANUAL.MANUALS_PATH) === -1;
        });

        if (!badLinks.length) {
          fieldValid = true;
        } else {
          var linkText = badLinks.first().text();
          var linkUrl = badLinks.first().attr("href");
          extraText = "<br/>Link Text: " + linkText + "<br/>Link Url: " + linkUrl;
        }
      }

      if (!fieldValid) {
        if (extraText) { return E_MANUAL.ERROR_MESSAGE + extraText; }

        return E_MANUAL.ERROR_MESSAGE;
      }
    */
      return true
    },
    addMinimumMultifieldItems: function(dialog) {
      var multifields = dialog.findBy(function(field) {
        return field.xtype === XTYPE.MULTIFIELD;
      });

      multifields.forEach(function(multifield) {
        var minItems = multifield.minItems || 0;

        if (typeof minItems === "string") {
          try {
            minItems = parseInt(minItems);
          } catch (e) {
            // ignore parse errors
          }
        }

        while (multifield.getValue().length < minItems) {
          multifield.addItem();
        }
      });
    },
    getCheckboxValue: function(checkboxField) {
      var isChecked = checkboxField.getValue();
      isChecked = isChecked && isChecked.length && isChecked[0] === "true";

      return isChecked;
    },
    enableLabelFields: function(displayLabel) {
      if (displayLabel.xtype === XTYPE.SELECTION && displayLabel.type === XTYPE.CHECKBOX) {
        var dialog = displayLabel.findParentByType(XTYPE.DIALOG);
        var labelHyperlink = dialog.find(XTYPE.NAME, LABEL_FIELDS.LABEL_HYPERLINK)[0];
        var newTab = dialog.find(XTYPE.NAME, LABEL_FIELDS.NEWTAB)[0];
        if (displayLabel.getValue() == 'true') {
          labelHyperlink.enable();
          $('#' + labelHyperlink.el.id).attr("readonly", true);
          newTab.enable();
        } else {
          labelHyperlink.disable();
          $('#' + labelHyperlink.el.id).removeClass('x-form-invalid');
          newTab.disable();
        }
      }
    },
    validateExternalLinks: function(pathfield) {
      if (pathfield.xtype === XTYPE.PATHFIELD) {
        var path = pathfield.getValue();
        if (path.substring(0, LABEL_FIELDS.INTERNAL_LINK.length) == LABEL_FIELDS.INTERNAL_LINK) {
          return true;
        } else {
          return false;
        }
      }
    },
    migrationFlagSettings: function(field) {
      if (field.type === XTYPE.CHECKBOX) {
        var dialog = field.findParentByType(XTYPE.DIALOG);
        // to check the migrate checkbox when migrationLegacyID is present
        var migrationLegacyID = dialog.find("name", LABEL_FIELDS.LEGACY_MIGRATION_ID)[0];
        if ((null != migrationLegacyID && undefined != migrationLegacyID) && migrationLegacyID.value.length > 0) {
          $("input[name='" + LABEL_FIELDS.MIGRATED + "']")[0].checked = true;
        } else {
          $("input[name='" + LABEL_FIELDS.MIGRATED + "']")[0].checked = false;
        }
      }
    }
  };
})()