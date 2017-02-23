Medtronic.Authoring.Download = (function() {
  "use strict";
  return {
    dialog: {
      loadcontent: function(dialog) {
        Medtronic.Authoring.addMinimumMultifieldItems(dialog);
        var field = dialog.findByType('multifield')[0];
        var dates = field.findByType('datefield');
        var dateCheck = field.find('key', '_DNT_displayDate');
        dateCheck.forEach(function(value, index) {
          if (dateCheck[index].getValue() != 'true') {
            dates[index].disable();
          }
        });
      },
      beforesubmit: function(dialog) {
        var field = dialog.findByType('multifield')[0];
        var dates = field.findByType('datefield');
        var dateCheck = field.find('key', '_DNT_displayDate');
        dates.forEach(function(value, index) {
          if (CQ.Ext.isEmpty(dates[index].getValue())) {
            dates[index].setValue(new Date());
          }
        });
      }
    },
    url: {
      validate: function(urlField) {
        var fileExtensions = ["pdf", "xls", "xlsx", "doc", "docx", "ppt", "pptx", "jpg", "jpeg", "png", "gif", "bmp",
            "mp3", "mp4", "ogg", "webm", "zip"];
        var path = urlField.getValue();
        var nameArray = path.split(".");
        var extension = "";
        if (nameArray.length > 1) {
          extension = nameArray[nameArray.length - 1];
        }
        if (fileExtensions.indexOf(extension) < 0) {
          return false;
        } else {
          return Medtronic.Authoring.validateEManualUrl(urlField);
        }
      }
    },
    date: {
      afterrender: function(box) {
        if (CQ.Ext.isEmpty(box.getValue())) {
          box.setValue(new Date());
        }
      },
      render: function(box) {
        box.setMaxValue(new Date());
        var dialog = box.findParentByType("dialog");
        var field = dialog.findByType('multifield')[0];
        var dateCheckboxes = field.find('key', '_DNT_displayDate');
        var dates = field.findByType('datefield');
        dateCheckboxes.forEach(function(value, index) {
          if (dates[index].getId() == box.getId()) {
            if (dateCheckboxes[index].getValue() != 'true') {
              box.disable();
            } else {
              box.enable();
            }
            return false;
          }
        });
      }
    },
    displayDate: {
      change: function(box) {
        var dialog = box.findParentByType("dialog");
        var field = dialog.findByType('multifield')[0];
        var dateField = field.find('key', '_DNT_publicationDate');
        var dateCheckboxes = field.find('key', '_DNT_displayDate');
        dateCheckboxes.forEach(function(value, index) {
          if (dateCheckboxes[index].getId() == box.getId()) {
            if (dateCheckboxes[index].getValue() != 'true') {
              dateField[index].disable();
            } else {
              dateField[index].enable();
            }
            return false;                       
          }
        });
      }
    }
  }
})();