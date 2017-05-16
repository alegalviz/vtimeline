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
    'afkl.lazyImage',
    'anguvideo'
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

$(function(){
  $('#maximage').maximage({
    cycleOptions: {
      fx: 'fade',
      // Speed has to match the speed for CSS transitions
      speed: 1000,
      timeout: 0,
      prev: '#arrow_left',
      next: '#arrow_right'
    },
    onFirstImageLoaded: function(){
      $('#cycle-loader').hide();
      $('#maximage').fadeIn('fast');
    },
    // cssBackgroundSize might be causing choppiness in retina display safari
    cssBackgroundSize: true
  });

  // Helper function to Fill and Center the HTML5 Video
  $('#html5video').maximage('maxcover');

  // To show it is dynamic html text
  $('.in-slide-content').delay(1200).fadeIn();
});
