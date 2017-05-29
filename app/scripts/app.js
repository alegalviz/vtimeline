'use strict';

/**
 * @ngdoc overview
 * @name vtimelineApp
 * @description
 * # vtimelineApp
 *
 * Main module of the application.
 */
angular
  .module('vtimelineApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'duScroll',
    'angular.filter',
    'angularMoment',
    'anguvideo',
    'angularLazyImg'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

//****************************************//
//http://codepen.io/matmarsiglio/pen/Avmxb
/*var canvasDots = function() {
  var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d'),
    colorDot = '#ffffff',
    color = '#ffffff';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';
  ctx.fillStyle = colorDot;
  ctx.lineWidth = 0.5;
  ctx.strokeStyle = color;

  var mousePosition = {
    x: 30 * canvas.width / 100,
    y: 30 * canvas.height / 100
  };

  var dots = {
    nb: 350,
    distance: 60,
    dradius: 100,
    array: []
  };

  function Dot(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;

    this.vx = -0.5 + Math.random();
    this.vy = -0.5 + Math.random();

    this.radius = Math.random();
  }

  Dot.prototype = {
    create: function(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fill();
    },

    animate: function(){
      for(var i = 0; i < dots.nb; i++){

        var dot = dots.array[i];

        if(dot.y < 0 || dot.y > canvas.height){
          dot.vx = dot.vx;
          dot.vy = - dot.vy;
        }
        else if(dot.x < 0 || dot.x > canvas.width){
          dot.vx = - dot.vx;
          dot.vy = dot.vy;
        }
        dot.x += dot.vx;
        dot.y += dot.vy;
      }
    },

    line: function(){
      var idot;
      var jdot;
      for(var i = 0; i < dots.nb; i++){
        for(var j = 0; j < dots.nb; j++){
          idot = dots.array[i];
          jdot = dots.array[j];

          if((idot.x - jdot.x) < dots.distance && (idot.y - jdot.y) < dots.distance && (idot.x - jdot.x) > - dots.distance && (idot.y - jdot.y) > - dots.distance){
            if((idot.x - mousePosition.x) < dots.dradius && (idot.y - mousePosition.y) < dots.dradius && (idot.x - mousePosition.x) > - dots.dradius && (idot.y - mousePosition.y) > - dots.dradius){
              ctx.beginPath();
              ctx.moveTo(idot.x, idot.y);
              ctx.lineTo(jdot.x, jdot.y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      }
    }
  };

  function createDots(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var dot;
    for(var i = 0; i < dots.nb; i++){
      dots.array.push(new Dot());
      dot = dots.array[i];
      dot.create();
    }

    dot.line();
    dot.animate();
  }

  window.onmousemove = function(parameter) {
    mousePosition.x = parameter.pageX;
    mousePosition.y = parameter.pageY;
  };

  mousePosition.x = window.innerWidth / 2;
  mousePosition.y = window.innerHeight / 2;

  setInterval(createDots, 1000/30);
};

window.onload = function() {
  canvasDots();
};
/*********************************************/

(function($) {
  $( document ).ready(function() {
    stickyElements();
    $('#menu a').smoothScroll({offset: -78});
    $('.logo a').smoothScroll();
  });


  function stickyElements() {
    var $stickyMenu = $('#menu');
    var sticky;

    if ($stickyMenu.length) {
      sticky = new Waypoint.Sticky({
        element: $stickyMenu[0],
        wrapper: '<div class="sticky-wrapper waypoint" />'
      });

      $('#descripcion').waypoint({
        handler: function(direction) {
          if (direction==='down') {
            $stickyMenu.addClass('pegajoso');
          } else {
            $stickyMenu.removeClass('pegajoso');
          }
        },
        offset: '0px'
      });
    }
  }

  var aChildren = $('.navbar li.onepage').children(); // find the a children of the list items
  var aArray = []; // create the empty aArray
  for (var i=0; i < aChildren.length; i++) {
    var aChild = aChildren[i];
    var ahref = $(aChild).attr('href');
    aArray.push(ahref);
  }

  $(window).scroll(function(){
    var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
    var windowHeight = $(window).height(); // get the height of the window
    var docHeight = $(document).height();

    for (var i=0; i < aArray.length; i++) {
      var theID = aArray[i];
      var divPos = $(theID).offset().top; // get the offset of the div from the top of page
      var divHeight = $(theID).height(); // get the height of the div in question
      if (windowPos+64 >= divPos && windowPos+64 < (divPos + divHeight)) { //64 tamanio del menu
        $('a[href="' + theID + '"]').addClass('nav-active');
      } else {
        $('a[href="' + theID + '"]').removeClass('nav-active');
      }
    }

    if(windowPos + windowHeight === docHeight) {
      if (!$('nav li.onepage:last-child a').hasClass('nav-active')) {
        var navActiveCurrent = $('.nav-active').attr('href');
        $('a[href="' + navActiveCurrent + '"]').removeClass('nav-active');
        $('nav li.onepage:last-child a').addClass('nav-active');
      }
    }
  });

})(jQuery);
