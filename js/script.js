$(function() {
  "use strict";

  var wheight = $(window).height(); //get height of window
  var wwidth = $(window).width(); //get width of window
  var wcarousel = wheight - $('.navbar-fixed-top').height() - $('.navbar-fixed-bottom').height() - $('.description').outerHeight() - 15; //get height of carousel
  $('.fullheight').css('height', wcarousel); //set .fullheight to window size

  var topoffset = 50; //variable for menu height

  //Activate Scrollspy
  $('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: topoffset
  });

  // add inbody class
  var hash = $(this).find('li.active a').attr('href');
  if(hash !== '#page-top') {
    $('header nav').addClass('inbody');
  } else {
    $('header nav').removeClass('inbody');
  }

  //show carousel caption only on sizes bigger than xs
  if(wwidth < 768){
    $('.carousel-caption p').hide();
  } else {
    $('.carousel-caption p').show();
  }



  //Use smooth scrolling when clicking on navigation
  $('.navbar a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') ===
      this.pathname.replace(/^\//,'') &&
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-topoffset+2
        }, 500);
        return false;
      } //target.length
    } //click function
  }); //smooth scrolling

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
    } else {
      $('.carousel-caption p').show();
    }
  });
});
