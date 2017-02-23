$(document).ready(function() {

    $('#category-filter').change(function(){
        var filterValue = $(this).val();
        if (filterValue == 'ALL') {
            $("#press-release-container li").show();
        } else {
            $("#press-release-container li").hide();
            $("#press-release-container li[data-categories*='" + filterValue + "']").show();
        }
    });
});