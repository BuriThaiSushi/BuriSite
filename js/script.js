$(function() {
  "use strict";

  var wheight = $(window).height(); //get height of window
  var wwidth = $(window).width(); //get width of window
  var wcarousel = wheight - $('.navbar-fixed-top').height() - $('.navbar-fixed-bottom').height() - $('.description').outerHeight() - 15; //get height of carousel
  $('.fullheight').css('height', wcarousel); //set .fullheight to window size

    if(wwidth < 768){
      $('.carousel-caption p').hide();
    } else {
      $('.carousel-caption p').show();
    }




  // $('#map').each(function(){
  //   if(wwidth < 768){
  //     $(this).addClass('text-left');
  //   } else {
  //     $(this).addClass('text-right');
  //   }
  // });

  //replace img inside carousels with a background image
  $('#carousel-display .item img').each(function(){
    var imgSrc = $(this).attr('src');
    $(this).parent().css({'background-image': 'url('+imgSrc+')'});
    $(this).remove();
  });

  //adjust height of .fullheight elements on window resize

  $(window).resize(function(){
    var wheight = $(window).height(); //get height of window
    var wcarousel = wheight - $('.navbar-fixed-top').height() - $('.navbar-fixed-bottom').height() - $('.description').outerHeight() - 15; //get height of carousel
    $('.fullheight').css('height', wcarousel); //set .fullheight to window size
    var wwidth = $(window).width();
    if(wwidth < 768){
      $('.carousel-caption p').hide();
      // $('#map').addClass('text-left');
      // $('#map').removeClass('text-right');
    } else {
      $('.carousel-caption p').show();
      // $('#map').addClass('text-right');
      // $('#map').removeClass('text-left');
    }
  });
});
