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
    'duScroll'
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