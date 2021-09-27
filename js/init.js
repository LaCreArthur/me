(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.fixed-action-btn').floatingActionButton({
      direction: 'top', // Direction menu comes out
      hoverEnabled: true, // Hover enabled
      toolbarEnabled: false // Toolbar transition enabled
    });
    $('input#icon_prefix, textarea#textarea').characterCounter();
    $('.tooltipped').tooltip({ delay: 50 }); // enable tooltips
    $('.collapsible').collapsible(); // enable collapsible

    // $('#target-div').load('https://play.google.com/store/apps/developer?id=Bretzel+Studio .N4FjMb', function( response, status, xhr ) {
    //   if ( status == "error" ) {
    //     var msg = "Sorry but there was an error: ";
    //     $( "#target-div" ).html( msg + xhr.status + " " + xhr.statusText );
    //   }
    // });

    var iframe   = $('#inlineFrameExample').contents(),
    loginBox = iframe.find(".VjFXz").clone();

    iframe.find("*").remove();
    iframe.append(loginBox);

  }); // end of document ready
})(jQuery); // end of jQuery name space
