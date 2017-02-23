$(document).ready(function(){
    $.extend($.expr[":"], {
        external : function (a) {

            //var is_exception = false;
          var countryRegex;
          if(location.pathname.indexOf("/content/medtronic-com") != -1){ // this page is in Dev or Dispatcher instance
              countryRegex = "/content/medtronic-com/.*?[^/\.]+";
          }else{
              countryRegex = "/.*?[^/]+";
          }

          var localCountry = location.pathname.match(countryRegex);
          var is_external = a.href != null && a.href.length > 0 //empty links are internal
                              && !a.href.match(/^#/) //links starting with # are internal
                              && !a.href.match(/^mailto\:/) //mailto should open mail client, internal
                              && !a.href.match(/^tel\:/)  //same as tel
                              && !($(a).closest('#modalWarn').length > 0)//do not flag links within the WOL modal as external
                              && !(a.className.indexOf('video__trigger') > -1)
                              && !(a.className.indexOf('header__logo') > -1)
                              && (a.hostname != location.hostname || ! (a.href.match("/content/dam") || a.pathname.match(localCountry))); //same host and same country or same host and from the dam assert means we're internal
            if( is_external ){
                //if we've got an external link, lets make sure it's not part of the exceptions added in the siteroot.
                var exceptions = $("#modalWarn").data("exceptions");
                if(exceptions && exceptions.length > 0){
                    exceptions = exceptions.split(',');
                    for( var i = 0; i < exceptions.length; i++){
                    var exception = exceptions[i];
                        if( exception && exception.length > 0 && a.href && a.href.length > 0){
                            exception = exception.toLowerCase();
                            if( a.href.toLowerCase().match("^"+exception)//if the url starts with the exception string (full link exception)
                                || a.hostname.toLowerCase().match(exception)){//if the hostname matches the exception (hostname exception)
                                is_external = false;//exception links aren't counted as external.
                                break;
                            }
                        }
                    }
                }
            }
            return is_external;
        }
    });

    // ADD BOOTSTRAP DATA-TOGGLE ATTRIBUTE TO THE LINKS
    $('a:external').attr({
      'data-toggle': 'modal',
      'data-target': '#modalWarn',
      'data-remote': false
    }).addClass("ext_link");

    // LINK ATTRIBUTES
    $(function () {
      $('a.ext_link').click(function () {
      var url = $(this).attr('href');
      var target = $(this).attr('target') ? $(this).attr('target') : "_self"

      $('#url_link').attr({
        'href': url,
        'target': target
      });
    });

    // CLOSE MODAL
    $('#url_link').click(function () {
      $('#modalWarn').modal('hide');
    });

    });
});
