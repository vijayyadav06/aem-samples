function redirect(locale){
  var $anchorTag = $('a[data-locale="'+locale+'"]')
  if( $anchorTag.length > 0){
    $anchorTag[0].click();
  }
}
$(document).ready(function() {
  $('#headerCountry').change(function(){
    redirect( $(this).val());
  });
  $('#headerLanguage').change(function(){
    redirect( $(this).val());
  });
});
