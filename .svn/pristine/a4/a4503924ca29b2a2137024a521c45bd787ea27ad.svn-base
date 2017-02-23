/* when checkbox is selected, the related fields will display */
function productDetail_displayFields(box, isChecked, name, fName) {
  var tabpanel = box.findParentByType('tabpanel');
  var title = tabpanel.find('name', name)[0];
  var items = tabpanel.find('fName', fName);
  var enable = true;
  if (isChecked) {
    title.setDisabled(false);
    enable = false;
  } else {
    title.setDisabled(true);
    enable = true;
  }

  for (var i = 0; i < items.length; i++) {
    items[i].setDisabled(enable);
  }
}

/* when checkbox is selected, the related fields will display */
function productDetail_displayDetailedFields(box, isChecked) {
  var tabpanel = box.findParentByType('tabpanel');
  var title = tabpanel.find('name', 'title3')[0];
  var item = tabpanel.find('name', './descriptiveText2')[0];
  if (isChecked) {
    title.setDisabled(false);
    item.setDisabled(false);
  } else {
    title.setDisabled(true);
    item.setDisabled(true);
  }
}

/*
 * if author selects 'Alternate Text'('None') options, the related fields will
 * display(hide)
 */
function productDetail_displayISWText(box, value, name, option, state) {
  var tabpanel = box.findParentByType('tabpanel');
  var iswText = tabpanel.find('name', name)[0];
  if (value == option) {
    iswText.setVisible(state);
  } else {
    iswText.setVisible(!state);
  }

  if (name == './iswText') {
    var iswURL = tabpanel.find('name', './iswURL')[0];
    if (value == 'none') {
      iswURL.setVisible(false);
      iswURL.setDisabled(true);
    } else {
      iswURL.setVisible(true);
      iswURL.setDisabled(false);
    }
  }
}

/* before submit, validate function */
function productDetail_validate(dialog) {
  /*
   * validation: if the URL is contains 'manuals.medtronic', but doesn't contain
   * '/manuals/search' or not
   */
  var hyperlink = dialog.find('dName', 'hyperlink');
  for (var i = 0; i < hyperlink.length; i++) {
    var value = hyperlink[i].getValue();
    var m = value.indexOf("manuals.medtronic");
    if (m != -1) {
      var n = value.indexOf("/manuals/search");
      if (n == -1) {
        $('#' + hyperlink[i].el.id).addClass('x-form-invalid');
        CQ.Ext.Msg.show({
          msg: 'Please contact an Oracle administrator for the correct URL for the eManual you are trying to link to.',
          maxWidth: 510,
          icon: CQ.Ext.MessageBox.WARNING
        });
        return false;
      }
    }
  }
  var iswURL = dialog.find('name', './iswURL')[0];
  var iswValue = iswURL.getValue();
  var index = iswValue.indexOf("manuals.medtronic");
  if (index != -1) {
    var n = iswValue.indexOf("/manuals/search");
    if (n == -1) {
      $('#' + iswURL.el.id).addClass('x-form-invalid');
      CQ.Ext.Msg.show({
        msg: 'Please contact an Oracle administrator for the correct URL for the eManual you are trying to link to.',
        maxWidth: 510,
        icon: CQ.Ext.MessageBox.WARNING
      });
      return false;
    }
  }

  var manualURL = dialog.getField("./manualURL");
  var value = manualURL.getValue();
  var btn = dialog.getField("./includeProductLink").getValue();
  var m = value.indexOf("manuals.medtronic");
  if (m != -1 && btn == "true") {
    var n = value.indexOf("/manuals/search");
    if (n == -1 && btn == "true") {
      $('#' + manualURL.el.id).addClass('x-form-invalid');
      CQ.Ext.Msg.show({
        msg: 'Please contact an Oracle administrator for the correct URL for the eManual you are trying to link to.',
        maxWidth: 510,
        icon: CQ.Ext.MessageBox.WARNING
      });
      return false;
    }
  }

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
      msg: 'Please add 1 item at least.',
      buttons: CQ.Ext.Msg.OK,
      icon: CQ.Ext.MessageBox.ERROR
    });
    return false;
  }

  /* validation: the list items group numbers is enough or not */
  var includeLink = dialog.getField('./includeHyperlinks').getValue();
  if (includeLink == 'true') {
    var multifield = dialog.find('name', './listItems1');
    var count = multifield[0].items.getCount() - 1;
    $('#' + multifield[0].el.id).find('div div.x-panel-body.x-panel-body-noheader').eq(0).css('border-top-color',
            '#d0d0d0');
    $('#' + multifield[0].el.id).find('div div.x-panel-body.x-panel-body-noheader').eq(0)
            .css('border-color', '#d0d0d0');
    if (count < 2 || count > 8) {
      // $('#'+ multifield[0].el.id).css('border', '1px solid red');
      $('#' + multifield[0].el.id).find('div div.x-panel-body.x-panel-body-noheader').eq(0).css('border-top-color',
              'red');
      $('#' + multifield[0].el.id).find('div div.x-panel-body.x-panel-body-noheader').eq(0).css('border-color', 'red');
      CQ.Ext.Msg.show({
        title: 'Validation Failed',
        msg: 'Please add 2 items at least, 8 items at most.',
        buttons: CQ.Ext.Msg.OK,
        icon: CQ.Ext.MessageBox.ERROR
      });
      return false;
    }
  }

  /* validation: the list items group numbers is enough or not */
  var includeList = dialog.getField("./includeList").getValue();
  if (includeList == 'true') {
    var multifield = dialog.find('name', './listItems2');
    var count = multifield[0].items.getCount() - 1;
    $('#' + multifield[0].el.id).find('div div.x-panel-body.x-panel-body-noheader').eq(0).css('border-top-color',
            '#d0d0d0');
    $('#' + multifield[0].el.id).find('div div.x-panel-body.x-panel-body-noheader').eq(0)
            .css('border-color', '#d0d0d0');
    if (count < 2 || count > 8) {
      // $('#'+ multifield[0].el.id).css('border', '1px solid red');
      $('#' + multifield[0].el.id).find('div div.x-panel-body.x-panel-body-noheader').eq(0).css('border-top-color',
              'red');
      $('#' + multifield[0].el.id).find('div div.x-panel-body.x-panel-body-noheader').eq(0).css('border-color', 'red');
      CQ.Ext.Msg.show({
        title: 'Validation Failed',
        msg: 'Please add 2 items at least, 8 items at most.',
        buttons: CQ.Ext.Msg.OK,
        icon: CQ.Ext.MessageBox.ERROR
      });
      return false;
    }
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

  /* show 2 groups by default */
  var listItems1 = dialog.find('name', './listItems1');
  var item1 = listItems1[0].items.getCount() - 1;
  var includeLink = dialog.getField('./includeHyperlinks').getValue();
  if (item1 == 0 && includeLink == 'true') {
    listItems1[0].addItem();
    listItems1[0].addItem();
    listItems1[0].doLayout();
  }

  /* show 2 groups by default */
  var listItems2 = dialog.find('name', './listItems2');
  var item2 = listItems2[0].items.getCount() - 1;
  var includeList = dialog.getField("./includeList").getValue();
  if (item2 == 0 && includeList == 'true') {
    listItems2[0].addItem();
    listItems2[0].addItem();
    listItems2[0].doLayout();
  }
}

/* in US region, the options will not contain 'None' option */
function productDetail_renderOptions(box) {
  var values = [];
  var country = $('div.product_detail_country').text()
          || $(parent.document).find('#ContentFrame').contents().find("div.product_detail_country").text();
  if (country == 'US') {
    values = [{
      text: 'ISW Graphic with Text',
      value: 'text'
    }, {
      text: 'ISW Graphic Only',
      value: 'only'
    }, {
      text: 'ISW Graphic with Alternate Text',
      value: 'alternateText'
    }];
  } else {
    values = [{
      text: 'ISW Graphic with Text',
      value: 'text'
    }, {
      text: 'ISW Graphic Only',
      value: 'only'
    }, {
      text: 'ISW Graphic with Alternate Text',
      value: 'alternateText'
    }, {
      text: 'None',
      value: 'none'
    }];
  }
  box.setOptions(values);
  var formItem = $('#' + box.el.id).find('div.x-form-item').eq(0);
  $(formItem).append(
          '<div style="padding-left: 0px;margin-bottom: 0px;" class="x-form-item-description">'
                  + 'Indications, Safety, and Warnings Graphic</div>');
}

var imageIndex = 0;
var listIndex = 0;

/* display label with index */
function productDetail_displayFieldLabel(field, prefix, suffix, name) {
  var itemIndex;
  if (name == 'image') {
    imageIndex = imageIndex + 1;
    itemIndex = imageIndex;
  } else if (name == 'listItem') {
    listIndex = listIndex + 1;
    itemIndex = listIndex;
  }
  field.fieldLabel = prefix + " " + itemIndex + " " + suffix;
}

/*
 * according to the removed item, change the item index
 * dynamically(Image&Title4:List Items)
 */
function productDetail_removeItem(field, prefix, suffix, type, name) {
  if (name == 'image' && imageIndex > 0) {
    imageIndex = imageIndex - 1;
  } else if (name == 'listItem' && listIndex > 0) {
    listIndex = listIndex - 1;
  }
  var count = field.items.getCount() - 1;
  for (var i = 0; i < count; i++) {
    var item = field.items.get(i).findByType(type)[0];
    var label;
    if (name == 'image') {
      label = $("#" + item.id).parent().parent().parent().children("label")[0];
    } else if (name == 'listItem') {
      label = $("#" + item.id).parent().parent().children("label")[0];
    }
    $(label).text(prefix + " " + (i + 1) + " " + suffix);
    $(label).append('<span class="cq-asterisk">*</span>');
  }
}

/* change the item index(Title2: List Items) */
function productDetail_removeMultiItem(field) {
  var count = field.items.getCount() - 1;
  for (var i = 0; i < count; i++) {
    var index = i + 1;
    var listItem = field.items.get(i).findByType('textfield')[0];
    var itemLabel = $("#" + listItem.id).parent().parent().children("label")[0];
    $(itemLabel).text('List Item ' + index);
    $(itemLabel).append('<span class="cq-asterisk">*</span>');

    var link = field.items.get(i).findByType('pathfield')[0];
    var linkLabel = $("#" + link.id).parent().parent().parent().children("label")[0];
    $(linkLabel).text('Hyperlink ' + index);

  }
}

/* display item index dynamically(List Item) */
function productDetail_displayListItemLabel(box) {
  productDetail_toggleDisabled(box, './includeHyperlinks');
  var field = box.findParentByType('multifield');
  var count = field.items.getCount() - 1;
  for (var i = 0; i < count; i++) {
    var index = i + 1;
    var listItem = field.items.get(i).findByType('textfield')[0];
    var itemLabel = $("#" + listItem.id).parent().parent().children("label")[0];
    $(itemLabel).text('List Item ' + index);
    $(itemLabel).append('<span class="cq-asterisk">*</span>');
  }
}

/* display item index dynamically(Hyperlink) */
function productDetail_displayLinkLabel(box) {
  var field = box.findParentByType('multifield');
  var count = field.items.getCount() - 1;
  for (var i = 0; i < count; i++) {
    var index = i + 1;
    var link = field.items.get(i).findByType('pathfield')[0];
    var linkLabel = $("#" + link.id).parent().parent().parent().children("label")[0];
    $(linkLabel).text('Hyperlink ' + index);

  }
}

/* when dialog close, reset the global variable's value */
function productDetail_resetValue() {
  imageIndex = 0;
  listIndex = 0;
  $('div.x-panel-body.x-panel-body-noheader').css('border-top-color', '#d0d0d0');
  $('div.x-panel-body.x-panel-body-noheader').css('border-color', '#d0d0d0');
}

/*
 * when the include checkbox is selected(de-selected), the related list item
 * will be enabled(disabled)
 */
function productDetail_toggleDisabled(box, name) {
  var dialog = box.findParentByType('dialog');
  var value = dialog.getField(name).getValue();
  if (value == 'true') {
    box.setDisabled(false);
  } else {
    box.setDisabled(true);
  }
}