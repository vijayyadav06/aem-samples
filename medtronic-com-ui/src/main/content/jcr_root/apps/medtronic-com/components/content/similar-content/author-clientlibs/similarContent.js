/* display 3 groups */
function displayContentDefault(dialog) {
  var fields = dialog.findByType('multifield');
  var count = fields[0].items.getCount() - 1;
  if (count == 0) {
    fields[0].addItem();
    fields[0].addItem();
    fields[0].addItem();
    fields[0].doLayout();
  }
}

/* validate the url of the Similar Content */
function validateSimailarURL(dialog) {
  var str = dialog.find("dName", "link");
  var fields = dialog.findByType('multifield');
  var validate = true;

  for (var i = 0; i < str.length; i++) {
    var m = str[i].getValue().indexOf("manuals.medtronic");
    if (m != -1) {
      var n = str[i].getValue().indexOf("/manuals/search");
      if (n == -1) {
        CQ.Ext.Msg.show({
          msg: 'Please contact an Oracle administrator for the correct URL for the eManual you are trying to link to.',
          maxWidth: 510,
          icon: CQ.Ext.MessageBox.WARNING
        });
        validate = false;
      }
    }
  }

  var count = fields[0].items.getCount() - 1;
  if (count < 3) {
    CQ.Ext.Msg.show({
      title: 'Validation Failed',
      msg: 'Please add 3 items at least.',
      buttons: CQ.Ext.Msg.OK,
      icon: CQ.Ext.MessageBox.ERROR
    });
    validate = false;
  }

  return validate;
}