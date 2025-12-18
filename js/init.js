(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('.fixed-action-btn').floatingActionButton({
      direction: 'top',
      hoverEnabled: true,
      toolbarEnabled: false
    });
    $('input#icon_prefix, textarea#textarea').characterCounter();
    $('.tooltipped').tooltip({ delay: 50 });
    $('.collapsible').collapsible();

  });
})(jQuery);
