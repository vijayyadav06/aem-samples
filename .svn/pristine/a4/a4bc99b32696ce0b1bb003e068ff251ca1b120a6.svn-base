$( document ).ready( function() {
  var href = parent.document.location.href;
  if (href.indexOf("editor.html") != -1) {
    $(".accordion__expand-all").each(function() {
      $(this).click();
    });
    distinctComponentInTouchUI();
  } else if (href.indexOf("cf#") != -1) {
    // distinctComponentInClassicUI();
  }
} );

function distinctComponentInTouchUI() {
      var dialogs = $(parent.document).find(".InsertComponentDialog");
      if (dialogs.length > 0) {
        var dialog = dialogs[dialogs.length - 1];
        var html = $(dialog).find("h2")[0].innerHTML;
        if ("Insert New Component" == html) {
          var list = $(dialog).find(".coral-SelectList-sublist button");
          for (var i = list.length - 1; i > 0; i--) {
            if (list[i].innerHTML == list[i - 1].innerHTML) {
              list[i].remove();
            }
          }
        }
      }
      setTimeout("distinctComponentInTouchUI()", 500);
    }
