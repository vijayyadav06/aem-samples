(function($, $document) {
    "use strict";
  
    $(document).on("click", ".cq-dialog-submit", function(e) {
        if ($("input[id='socialMedia']:checked").length > 6) {
            $(window).adaptTo("foundation-ui").alert("Error Message", "No more than 6 selections can be made");
            return false;
        }
        
        if ($(".is-invalid").length > 0) {
          var input = $(".is-invalid").closest(".coral-TabPanel-pane").attr("id"); 
          if(!input){return;}
          var navfield = $('a[aria-controls="' + input + '"]').addClass("is-active");
          $('a[aria-controls="' + input + '"]').trigger("click");
          return false;
        }
        
    });
    
    
    var CORAL_RTE = ".coral-RichText",
    // copied from /etc/clientlibs/granite/coralui2/js/validations.js
    fieldErrorEl = $("<span class='coral-Form-fielderror coral-Icon coral-Icon--alert coral-Icon--sizeS' "
            + "data-init='quicktip' data-quicktip-type='error' />");
    var CORAL_RTE_DIALOG = ".coral-RichText-dialog";
  
    $document.on("dialog-ready", function() {
      // coral validation framework ignores hidden and contenteditable fields, so
      // add an invisible text field
      // the text field is just for registering a validator
        $(CORAL_RTE).after("<input type=text style='display:none'/>");
    
        $(CORAL_RTE).on("input", function() {
            var $invisibleText = $(this).nextAll("input:text").val($(this).text().trim());
      
            $invisibleText.checkValidity();
            $invisibleText.updateErrorUI();
        });

        /**
         * WOL: add validation for URL in 'Descriptive text' field
         */
        $(CORAL_RTE_DIALOG).on("input", function(){
          var pathField = $(this).find('input')[0];
          $(pathField).checkValidity();
          $(pathField).updateErrorUI();
        });
    });
  
    // register the validator on richtext invisible text field
    $.validator.register({
        selector: ".richtext-container > input:text",
  
        validate: function($invisibleText) {
            var $hidden = $invisibleText.prevAll("[type=hidden]"), 
            isRequired = $hidden.attr("required") === true || $hidden.attr("aria-required") === "true",
            $richText = $invisibleText.prevAll(".coral-RichText");
            if (isRequired && $richText.text().length === 0) { 
                return $invisibleText.message("validation.required") || "required"; 
            }
            return null;
        },
  
        show: function($invisibleText, message) {
            this.clear($invisibleText);
    
            var field = $invisibleText.prevAll(CORAL_RTE), 
            arrow = field.closest("form").hasClass("coral-Form--vertical") ? "right" : "top";
    
            fieldErrorEl.clone().attr("data-quicktip-arrow", arrow).attr("data-quicktip-content", message).insertAfter(field);
    
            field.attr("aria-invalid", "true").toggleClass("is-invalid", true);
        },
  
        clear: function($invisibleText) {
            var field = $invisibleText.prevAll(CORAL_RTE);
    
            field.removeAttr("aria-invalid").removeClass("is-invalid").nextAll(".coral-Form-fielderror").tooltip("hide").remove();
        }
    });

    /**
     * WOL: register click event for Cancel button in Rich Text Dialog
     */
    var regEvent = setInterval(function(){
      var cancelBtn = $("button.coral-RichText-dialogButton.coral-Button[data-type='cancel']");
      $(cancelBtn).click(function(){
          $(this).addClass("warn-on-leave-cancel");
          var coralDialog = $(".coral-RichText-dialog");
          $(coralDialog).find(".is-invalid").each(function(){
              $(this).removeClass("is-invalid");
          });
          $(coralDialog).find("span.js-coral-validation-error").each(function(){
              $(this).remove();
          });
      });
      if(cancelBtn.length > 0){
        clearInterval(regEvent);
      }
    }, 50);
    

    /**
     * register validator on rich text dialog text field
    */
    /*
     RM: 03/2016 MDT-2493
     Removing validation against emanual URLs

    $.validator.register({
      selector: ".coral-RichText-dialog[aria-hidden='false'] span input",
      validate: function(el) {
        var E_MANUAL = {
          MANUALS_HOST: "manuals.medtronic",
          MANUALS_PATH: "/manuals/search",
          ERROR_MESSAGE: "Please contact an Oracle contact for the correct URL for the eManual you are trying to link to."
        };
        var value = el.val().toLowerCase();
        var $val_input = $(el);
        var checkBtn = $(".coral-RichText-dialog button.coral-RichText-dialogButton.coral-Button--primary");
        var value_valid = value.indexOf(E_MANUAL.MANUALS_HOST) === -1 || value.indexOf(E_MANUAL.MANUALS_PATH) > -1;
        if (!value_valid) {
          $val_input.addClass("is-invalid");
          $(checkBtn).attr('disabled', "true");
          return E_MANUAL.ERROR_MESSAGE;
        } else {
          $val_input.removeClass("is-invalid");
          $(checkBtn).removeAttr("disabled");
          return;
        }
      }
    });
    */
})($, $(document));