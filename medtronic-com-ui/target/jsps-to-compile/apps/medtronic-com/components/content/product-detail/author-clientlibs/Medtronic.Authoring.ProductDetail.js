
/*
 * if author selects 'Alternate Text'('None') options, the related fields will
 * display(disabled)
 */
function productDetailDisplayISWText(box, value, name, option, state) {
  var tabpanel = box.findParentByType('tabpanel');
  var iswText = tabpanel.find('name', name)[0];
  if (value == option) {
    iswText.setVisible(state);
  } else {
    iswText.setVisible(!state);
  }

  if (name == './iswText') {
    var iswURL = tabpanel.find('name', './iswURL')[0];
    var iswText = tabpanel.find('name', './iswText')[0];
    if (value == 'none') {
      iswURL.setVisible(true);
      iswURL.setDisabled(true);
      iswText.setVisible(true);  
    } else {
      iswURL.setVisible(true);
      iswURL.setDisabled(false);
    }
  }
}

/* before submit, validate function */
function productDetailValidate(dialog) {

  /* validation: the product image group numbers is enough or not */
  var fields = dialog.find('name', './image');
  var count = fields[0].items.getCount() - 1;
  $('#' + fields[0].el.id).find('div div.x-panel-body.x-panel-body-noheader').eq(0).css('border-top-color', '#d0d0d0');
  $('#' + fields[0].el.id).find('div div.x-panel-body.x-panel-body-noheader').eq(0).css('border-color', '#d0d0d0');
  if (count < 1) {
    $('#' + fields[0].el.id).find('div div.x-panel-body.x-panel-body-noheader').eq(0).css('border-top-color', 'red');
    $('#' + fields[0].el.id).find('div div.x-panel-body.x-panel-body-noheader').eq(0).css('border-color', 'red');
    CQ.Ext.Msg.show({
      title: 'Validation Failed',
      msg: 'Please add 1 Image item at least.',
      buttons: CQ.Ext.Msg.OK,
      icon: CQ.Ext.MessageBox.ERROR
    });
    return false;
  }
}

/* show specific group(s) by default for product image, list items */
function productDetail_displayDefault(dialog) {
  /* show 1 group by default */
  var fields = dialog.find('name', './image');
  var count = fields[0].items.getCount() - 1;
  if (count == 0) {
    fields[0].addItem();
    fields[0].doLayout();
  }
}


var imageIndex = 0;
var listIndex = 0;

/* display label with index */
function productDetail_displayFieldLabel(field, prefix, suffix, name) {
  var itemIndex;
  if (name == 'image') {
    imageIndex = imageIndex + 1;
    itemIndex = imageIndex;
  }
  field.fieldLabel = prefix + " " + itemIndex + " " + suffix;
}

/*
 * according to the removed item, change the item index
 * dynamically(Image :List Items)
 */
function productDetail_removeItem(field, prefix, suffix, type, name) {
  if (name == 'image' && imageIndex > 0) {
    imageIndex = imageIndex - 1;
  } 
  var count = field.items.getCount() - 1;
  for (var i = 0; i < count; i++) {
    var item = field.items.get(i).findByType(type)[0];
    var label;
    if (name == 'image') {
      label = $("#" + item.id).parent().parent().parent().children("label")[0];
    } 
    $(label).text(prefix + " " + (i + 1) + " " + suffix);
    $(label).append('<span class="cq-asterisk">*</span>');
  }
}

/* when dialog close, reset the global variable's value */
function productDetail_resetValue() {
  imageIndex = 0;
  listIndex = 0;
  $('div.x-panel-body.x-panel-body-noheader').css('border-top-color', '#d0d0d0');
  $('div.x-panel-body.x-panel-body-noheader').css('border-color', '#d0d0d0');
}

