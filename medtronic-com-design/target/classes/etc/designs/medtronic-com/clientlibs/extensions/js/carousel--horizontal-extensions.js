(function($) {
    $(function() {
        $(".image-list__title").each(function() {
            $(this).click(function(e) {
                if ($(this).parents(".carousel-wrap").prev().text() == "true") {
                    e.preventDefault();
                    var href = $(this).attr("href");
                    window.open(href);
                }
            });
        });
    });
}(jQuery));