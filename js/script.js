$(function() {
  "use strict";

  //enable tooltips
  $('[data-toggle="tooltip"]').tooltip();

  //disable carousel pause
  $('.carousel').carousel({
    pause: false
  });

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

  //Make all elements highlight on hover and on iOS when touched
  $('.menu-group').each(function(){
    $(this).hover(function(){
        $(this).addClass('menu-group-hover');
      }, function(){
        $(this).removeClass('menu-group-hover');
      }
    );
  });

  //show carousel caption only on sizes bigger than xs
  //fix navbar on bottom only for sizes bigger than xs
  if(wwidth >= 768){
    $('footer nav').addClass('navbar-fixed-bottom');
    $('footer nav .content').removeClass('container-fluid');
    $('footer nav .content').addClass('container');
    $('.fixed-address').addClass('text-right');
    $('#hours-collapse').addClass('in');
    $('.hours-toggle').attr('aria-expanded', true);
  }

  //Highlight group pricing for menu categories with general pricing
  $('.no-price').hover(
    function(){
      $(this).parents('.row.menu-cat').children('.cat-pricing').addClass('menu-group-hover');
    }, function(){
      $(this).parents('.row.menu-cat').children('.cat-pricing').removeClass('menu-group-hover');
    }
  );

  //close nav on mobile if tapped elsewhere
  $(document).on('click', function(event) {
    if (!$(event.target).closest('#menucontainer').length) {
      $('.navbar-collapse.in').collapse('hide');
    }
  });

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

  var wheight = 0;
  var carousel = 0;

  wheight = $(window).height(); //get height of window
  console.log(wheight + ', ' + $('.navbar-fixed-bottom').height() + ', ' + $('.description').outerHeight());
  carousel = wheight - $('.navbar-fixed-bottom').height() - $('.description').outerHeight() - 10; //get height of carousel
  console.log(carousel);
  $('.fullheight').css('height', carousel); //set .fullheight to window size
  //create margin above header if not enough space to keep it below navbar
  if(carousel < $('.navbar-fixed-top .navbar-header').height()){
    $('.fullheight').hide();
    $('.description').css('margin-top', $('.navbar-fixed-top .navbar-header').height());
  } else {
    $('.fullheight').show();
    $('.description').css('margin-top', 0);
  }
  //do not show captions until loaded
  $('.carousel-caption').hide();

  $(window).bind("load", function() {
    //make any corrections after page is completely loaded
    wheight = $(window).height(); //get height of window
    console.log(wheight + ', ' + $('.navbar-fixed-bottom').height() + ', ' + $('.description').outerHeight());
    carousel = wheight - $('.navbar-fixed-bottom').height() - $('.description').outerHeight() - 10; //get height of carousel
    console.log(carousel);
    $('.fullheight').css('height', carousel); //set .fullheight to window size
    //create margin above header if not enough space to keep it below navbar
    if(carousel < $('.navbar-fixed-top .navbar-header').height()){
      $('.fullheight').hide();
      $('.description').css('margin-top', $('.navbar-fixed-top .navbar-header').height());
    } else {
      $('.fullheight').show();
      $('.description').css('margin-top', 0);
    }
    //if carousel captions does not fit below navbar, do not show it
    var tallestCap = 0;
    $('.carousel-caption').each(function(){
      if($(this).height() > tallestCap){
        tallestCap = $(this).outerHeight();
      }
    });
    if((tallestCap + 20 + $('.navbar-fixed-top .navbar-header').height()) > $('.fullheight').css('height').replace(/[^-\d\.]/g, '')){
      $('.carousel-caption').hide();
    } else {
      $('.carousel-caption').show();
    }
  });

  console.log(wheight + ', ' + $('.navbar-fixed-bottom').height() + ', ' + $('.description').outerHeight());
  console.log(carousel);

  //adjust height of .fullheight elements on window resize
  $(window).resize(function(){
    var wwidth = $(window).width();
    if(wwidth < 768){
      //put footer at bottom of page, change type of container
      $('footer nav .content').removeClass('container');
      $('footer nav').removeClass('navbar-fixed-bottom');
      $('footer nav .content').addClass('container-fluid');
      $('.fixed-address').removeClass('text-right');
    } else {
      //put footer at bottom of window, change type of container
      $('footer nav .content').removeClass('container-fluid');
      $('footer nav').addClass('navbar-fixed-bottom');
      $('footer nav .content').addClass('container');
      $('.fixed-address').addClass('text-right');
    }
    var wheight = $(window).height(); //get height of window
    console.log(wheight + ', ' + $('.navbar-fixed-bottom').height() + ', ' + $('.description').outerHeight());
    var carousel = wheight - $('.navbar-fixed-bottom').height() - $('.description').outerHeight() - 10; //get height of carousel
    console.log(carousel);
    $('.fullheight').css('height', carousel); //set .fullheight to window size minus other elements

    //if carousel captions does not fit below navbar, do not show it
    var tallestCap = 0;
    $('.carousel-caption').each(function(){
      if($(this).height() > tallestCap){
        tallestCap = $(this).outerHeight();
      }
    });
    if((tallestCap + 20 + $('.navbar-fixed-top .navbar-header').height()) > $('.fullheight').css('height').replace(/[^-\d\.]/g, '')){
      $('.carousel-caption').hide();
    } else {
      $('.carousel-caption').show();
    }

    //create margin above header if not enough space to keep it below navbar
    if(carousel < $('.navbar-fixed-top .navbar-header').height()){
      $('.fullheight').hide();
      $('.description').css('margin-top', $('.navbar-fixed-top .navbar-header').height());
    } else {
      $('.fullheight').show();
      $('.description').css('margin-top', 0);
    }
  });
  $(document).on('hidden.bs.collapse', function(){
    var wheight = $(window).height(); //get height of window
    var carousel = wheight - $('.navbar-fixed-bottom').height() - $('.description').outerHeight() - 10; //get height of carousel
    console.log(carousel);
    $('.fullheight').css('height', carousel); //set .fullheight to window size
    //create margin above header if not enough space to keep it below navbar
    if(carousel < $('.navbar-fixed-top .navbar-header').height()){
      $('.fullheight').hide();
      $('.description').css('margin-top', $('.navbar-fixed-top .navbar-header').height());
    } else {
      $('.fullheight').show();
      $('.description').css('margin-top', 0);
    }
  });
});
