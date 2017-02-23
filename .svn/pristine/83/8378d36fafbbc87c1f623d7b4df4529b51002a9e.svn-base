(function() {
  var oldFinish;
  $(document).on("foundation-contentloaded", function() {
    if (!oldFinish) {
      if (window.CUI && CUI.RichText && CUI.RichText.prototype) {
        oldFinish = CUI.RichText.prototype.finish;
        CUI.RichText.prototype.finish = function(isCancelled) {
          var editedContent = oldFinish.call(this, isCancelled);
          this.$element.data("rteinstance", null);

          return editedContent;
        };
      }
    }
  });
})();