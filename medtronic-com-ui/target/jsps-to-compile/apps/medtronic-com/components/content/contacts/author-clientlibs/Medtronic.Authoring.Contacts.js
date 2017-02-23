Medtronic.Authoring.Contacts = (function() {
  "use strict";

  return {
    dialog: {
      validateEmail: function(dialog) {
        var emails = dialog.find('fName', 'email');
        for (var i = 0; i < emails.length; i++) {
          var email = emails[i].getValue();
          if (email != "") {
            var emailContainsAtSymbol = email.indexOf('@') < 0;
            if (emailContainsAtSymbol) {
              $('#' + emails[i].el.id).addClass('x-form-invalid');
              CQ.Ext.Msg.show({
                title: 'Validation Failed',
                msg: 'Please enter a valid email address.',
                buttons: CQ.Ext.Msg.OK,
                icon: CQ.Ext.MessageBox.ERROR
              });
              return false;
            }
          }

        }
      },

      displayDefault: function(dialog) {
        var field = dialog.findByType('multifield')[0];
        var count = field.items.getCount() - 1;
        if (count == 0) {
          field.addItem();
          field.doLayout();
        }
      }
    }
  };
})();