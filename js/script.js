$(function() {
  "use strict";

  //disable carousel pause
  $('.carousel').carousel({
    pause: false
  });

  var wheight = $(window).height(); //get height of window
  var wwidth = $(window).width(); //get width of window

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
  //Highlight home as active if in description
  if(hash === '#description'){
    $('li a[href="#page-top"]').parent().addClass('active');
  }

  //Append "current" text for screen reader in navbar
  $(this).find('li.active a').append("<span class=\"sr-only\">\(current\)</span>");

  // Add an inbody class & append "current" text for screen readers to nav when scrollspy event fires
  $('.navbar-fixed-top').on('activate.bs.scrollspy', function() {
    var hash = $(this).find('li.active a').attr('href');
    if(hash !== '#page-top') {
      $('header nav').addClass('inbody');
    } else {
      $('header nav').removeClass('inbody');
    }
    if(hash === '#description'){
      $('li a[href="#page-top"]').parent().addClass('active');
    }
    $('li a').find('span.sr-only').remove();
    $(this).find('li.active a').append("<span class=\"sr-only\">\(current\)</span>");
  });

  //show carousel caption only on sizes bigger than xs
  //fix navbar on bottom only for sizes bigger than xs
  if(wwidth > 768){
    $('footer nav').addClass('navbar-fixed-bottom');
    $('footer nav .content').removeClass('container-fluid');
    $('footer nav .content').addClass('container');
    $('.fixed-address').addClass('text-right');
    //Highlight group pricing for menu categories with general pricing
    $('.no-price').hover(
      function(){
        $(this).parents('.row.menu-cat').children('.menu-left').children('.cat-pricing').addClass('menu-group-hover');
      }, function(){
        $(this).parents('.row.menu-cat').children('.menu-left').children('.cat-pricing').removeClass('menu-group-hover');
      }
    );
  }

  var carousel = wheight - $('.navbar-fixed-bottom').height() - $('.description').outerHeight() - 10; //get height of carousel
  $('.fullheight').css('height', carousel); //set .fullheight to window size

  //Use smooth scrolling when clicking on navigation and close menu on click on mobile
  $('.navbar a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') ===
      this.pathname.replace(/^\//,'') &&
      location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if($(this).attr('class') !== 'dropdown-toggle') {
          $(this).parents('.navbar-collapse.in').collapse('hide');
      }
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
    var wwidth = $(window).width();
    if(wwidth < 768){
      //put footer at bottom of page, change type of container
      $('footer nav .content').removeClass('container');
      $('footer nav').removeClass('navbar-fixed-bottom');
      $('footer nav .content').addClass('container-fluid');
      $('.fixed-address').removeClass('text-right');
      $('.no-price').hover(
        function(){}, function(){}
      );
    } else {
      //put footer at bottom of window, change type of container
      $('footer nav .content').removeClass('container-fluid');
      $('footer nav').addClass('navbar-fixed-bottom');
      $('footer nav .content').addClass('container');
      $('.fixed-address').addClass('text-right');
      //Highlight group pricing for menu categories with general pricing
      $('.no-price').hover(
        function(){
          $(this).parents('.row.menu-cat').children('.menu-left').children('.cat-pricing').addClass('menu-group-hover');
        }, function(){
          $(this).parents('.row.menu-cat').children('.menu-left').children('.cat-pricing').removeClass('menu-group-hover');
        }
      );
    }
    var wheight = $(window).height(); //get height of window
    var carousel = wheight - $('.navbar-fixed-bottom').height() - $('.description').outerHeight() - 10; //get height of carousel
    $('.fullheight').css('height', carousel); //set .fullheight to window size
  });
});
