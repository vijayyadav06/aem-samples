CQ.Ext.ns("Medtronic.Widgets");

Medtronic.Widgets.Selection = CQ.Ext.extend(CQ.form.Selection, {
  constructor: function(config) {
    Medtronic.Widgets.Selection.superclass.constructor.call(this, config);
  },
  
  setOptions: function(options) {
    Medtronic.Widgets.Selection.superclass.setOptions.call(this, options);
    var _select = this;
    
    this.comboBox.validator = (function() {
      var value = _select.hiddenField.getValue();
      
      var valid = options.filter(function(option) {
        // if the value matches an option
        return value === option.value;
      }).length > 0;
      
      if (!valid) {
        return CQ.I18n.getMessage("Please select a valid value");
      }
      
      return true;
    });
  },
  clearInvalid: function() {
    Medtronic.Widgets.Selection.superclass.clearInvalid.call(this);
    if (this.type === "select" || type === "combobox") {
      this.comboBox.clearInvalid();
    }
  },
  selectCombo: function(combo, record, index) {
    Medtronic.Widgets.Selection.superclass.selectCombo.call(this, combo, record, index);
    combo.startValue = combo.value;
  }
});

CQ.Ext.reg("mdtselection", Medtronic.Widgets.Selection);