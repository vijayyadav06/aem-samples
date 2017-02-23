/*
 * Listeners for L2 Labels tab
 */

(function(window, document, Granite, $) {
    "use strict";

    var rel = ".page-properties-label",
        rel2 = ".pathbrowser";
    function writeLabel($input, $button, pageLevel){
        var val = $input.val();
        var text = val.split("\/").pop().replace(/-/g, " ").replace(/(^|\s+)\w/g,function(s){
            return s.toUpperCase();
         });
        if(text == "Labels"){
            text = "";
        }
        if(text == ""){
            text = "Select a label to display on " + pageLevel.replace("Pages", "pages");
        }
        $button.html(text).append('<i class="coral-Icon coral-Icon--sizeS coral-Icon--tags"></i>');
    }
    $(document).on("foundation-contentloaded", function (event) {
        var $target = $(event.target);
        var $pathBrowser = $target.find(rel + ".coral-PathBrowser");

        $pathBrowser.each(function () {
            var pathBrowser = $(this).data("pathBrowser");
            var $button = $(this).find(".js-coral-pathbrowser-button");
            var cancelButton = '<button class="coral-Button coral-Button--square" type="button" title="Clear"><i class="coral-Icon coral-Icon--sizeS coral-Icon--close"></i></button>';
            $button.after(cancelButton);
            var $fieldLabel = $(this).prev();
            writeLabel(pathBrowser.inputElement, $button, $fieldLabel.text());

            /**
             * Handle the clear operation
             */
            $button.next().click(function(){
                pathBrowser.inputElement.val("");
                writeLabel(pathBrowser.inputElement, $button, $fieldLabel.text());
            });

            /**
             * Handle selections from the PathBrowser picker
             */
            pathBrowser.$picker.off("coral-pathbrowser-picker-confirm" + rel2).on("coral-pathbrowser-picker-confirm" + rel2, function (e) {
                var $input = pathBrowser.inputElement;
                writeLabel($input, $button, $fieldLabel.text());
            });


        });
    });

})(window, document, Granite, Granite.$);
