$(function() {
  "use strict";

  var wheight = $(window).height() - $('.description').height() - $('.navbar-fixed-top').height() - $('.navbar-fixed-bottom').height(); //get height of window

  $('.fullheight').css('height', wheight); //set .fullheight to window size

  //replace img inside carousels with a background image
  $('#carousel-display .item img').each(function(){
    var imgSrc = $(this).attr('src');
    $(this).parent().css({'background-image': 'url('+imgSrc+')'});
    $(this).remove();
  });

  //adjust height of .fullheight elements on window resize

  $(window).resize(function(){
    var wheight = $(window).height() - $('.description').height() - $('.navbar-fixed-top').height() - $('.navbar-fixed-bottom').height(); //get height of window
    $('.fullheight').css('height', wheight); //set .fullheight to window size
  });
});
