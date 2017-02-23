Medtronic.Authoring.Footer = (function() {
  "use strict";

  var defaultVal = "Select a Social Channel";
  /**
   * validate field: if author has entered content either of the Field Label
   * inputs, the other input is required
   */
  function validate(field) {
    var value = field.getValue();
    var panel = field.findParentByType("panel");
    var linkURL = panel.find("key", "linkURL")[0];
    setRequired(linkURL, value);
  }

  /**
   * set field label input required or not
   */
  function setRequired(field, value) {
    if (value && value != defaultVal) {
      field.allowBlank = false;
    } else {
      field.allowBlank = true;
    }
  }
  // Component listeners goes here
  return {
    dialog: {
      loadContent: function(dialog) {
        var linkArr = ['./linkColumns1', './linkColumns2', './linkColumns3', './linkColumns4', './socialChannels',
            './footerLinks'];
        for (var i = 0; i < linkArr.length; i++) {
          var linksMultiFields = dialog.find('name', linkArr[i]);
          linksMultiFields.forEach(function(linksMultiField) {
            while (linksMultiField.getValue().length < 1) {
              linksMultiField.addItem();
            }
          });
        }
      },
      beforeSubmit: function(dialog) {
        var valid = true;
        //image alt text conditionally required
        var codePath = dialog.find("name", "./codePath")[0];
        if (codePath.getRawValue()) {
          var altText = dialog.find("name", "./altText")[0];
          if (!altText.getRawValue()) {
            altText.markInvalid("This field is required");
            valid = false;
          }
        }
        
        //Link Columns and Social Media Channels
        var linkURLs = dialog.find("key", "linkURL");
        var arr = [];
        var index = 0;
        linkURLs.forEach(function(linkURL) {
          var value = linkURL.getValue();
          var panel = linkURL.findParentByType("panel");
          var linkText = panel.find("key", "linkText")[0];
          var textVal = linkText.getValue();
          if (value) {
            if (!textVal || textVal == defaultVal) {
              arr[index++] = linkText;
            }
          } else {
            if (textVal && textVal != defaultVal) {
              arr[index++] = linkText;
            }
          }
        });
        if (arr.length > 0) {
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].value == defaultVal) {
              arr[i].comboBox.markInvalid("This field is required");
            } else {
              arr[i].markInvalid("This field is required");
            }
          }
          valid = false;
        }
        if (!valid) {
          CQ.Ext.Msg.show({
            title: 'Validation Failed',
            msg: 'Verify the values of the marked fields.',
            buttons: CQ.Ext.Msg.OK,
            icon: CQ.Ext.MessageBox.ERROR
          });
        }
        return valid;
      }
    },
    linkText: {
      change: function(field) {
        validate(field);
      },
      loadContent: function(field) {
        validate(field);
      }
    },
    channel: {
      selectionChanged: function(field) {
        validate(field);
      },
      loadContent: function(field) {
        validate(field);
      }
    }
  };
})();