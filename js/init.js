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

  }); // end of document ready
})(jQuery); // end of jQuery name space
