$(document).ready(function(){
    var mobileClass = "pad visible-xs-block visible-sm-block";
    var breadcrumb = "nav.breadcrumbs";
    var $iswDiv = $('aside .pad .textclearfloat img[src="/content/dam/medtronic-com/global/important-safety-information.png"]').first().closest('.textclearfloat');
    if($iswDiv.length > 0){
        var $mobileDiv = $iswDiv.clone();
        $mobileDiv.addClass(mobileClass);
        $mobileDiv.insertAfter(breadcrumb);
    }
});