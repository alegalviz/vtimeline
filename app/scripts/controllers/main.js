'use strict';

/**
 * @ngdoc function
 * @name vtimelineApp.controller:MainCtrl
 * @description 2017
 * @author alegalviz
 * # MainCtrl
 * Controller of the vtimelineApp
 */
var vtimelineApp = angular.module('vtimelineApp')
  .constant('connConfig', {
    method: {},
    event: {}
  });

vtimelineApp.controller('MainCtrl', function ($scope, hitosRepository, anchorDesplazarSuave) {

  hitosRepository.getAllHitos().then(function(hitos) {
     $scope.hitos = hitos.data.filter(function (i){
         return (i.titulo!=='' && i.fecha!=='');
     });

  });

  $scope.addHito = function () {
    $scope.hitos.push($scope.hito);
    $scope.hito = '';
  };
  $scope.removeHito = function (index) {
    $scope.hitos.splice(index, 1);
  };
  $scope.continuar = function (eID){
    // call $anchorScroll()
    anchorDesplazarSuave.scrollTo(eID);

  };
});

vtimelineApp.factory('hitosRepository', function($http) {
  return {
    getAllHitos: function() {

        var url = 'json/test.json';
        return $http.get(url);

    }
  };
});

vtimelineApp.filter('fechaFormato', function(moment) {
  return function(input)
  {
    if(input === null){ return; }

    //var _date = $filter('date')(new Date(input), 'dd.MM.yyyy');
    moment.locale('es', {
      months: 'enero febrero marzo abril mayo junio julio agosto septiembre octubre noviembre diciembre'.split(' '),
    });
      var momentObj = moment(input, 'DD \d\e MMMM');
    var momentString = momentObj.format('DD'); // 2016-07-15
    momentString += ' de ' + momentObj.format('MMMM').toUpperCase();

    return momentString;

  };
});

vtimelineApp.filter('emptyFilter', function() {
    return function(array) {
        var filteredArray = [];
        angular.forEach(array, function(item) {
            if (item.titulo) {
                filteredArray.push(item);
            }
        });
        return filteredArray;
    };
});
vtimelineApp.directive('repeatConeccion', function() {
  return function(scope) {
    if (scope.$last){
      scope.$emit('LastElem');
    }
    //scope.$watch('thing', function(){
    //});
  };
});
vtimelineApp.directive('conecciones', ['$timeout', function($timeout) {
  return function(scope, element) {
    scope.$on('LastElem', function(){
        $timeout(function () {
           angular.element(element).find('.circulo').connections({all:false});
        });
    });
  };
}]);

vtimelineApp.service('anchorDesplazarSuave', function(){

  this.scrollTo = function(eID) {

    // This scrolling function
    // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) {speed = 20;}
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
      for ( var i=startY; i<stopY; i+=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY += step; if (leapY > stopY) leapY = stopY; timer++;
      } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
      setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
      leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }

    function currentYPosition() {
      // Firefox, Chrome, Opera, Safari
      if (self.pageYOffset) return self.pageYOffset;
      // Internet Explorer 6 - standards mode
      if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
      // Internet Explorer 6, 7 and 8
      if (document.body.scrollTop) return document.body.scrollTop;
      return 0;
    }

    function elmYPosition(eID) {
      var elm = document.getElementById(eID);
      var y = elm.offsetTop;
      var node = elm;
      while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
      } return y;
    }

  };

});


// vtimelineApp.directive('conecciones', [
  // '$timeout', 'connConfig', function ($timeout, connConfig) {
    // return {
      // scope: {
        // options: '=',
        // enabled: '@'
      // },
      // restrict: 'AE',
      // link: function (scope, element) {
      //  hide slider
      //  angular.element(element).css('display', 'none');

        // var options, initOptions, destroy, init, destroyAndInit;

        // initOptions = function () {
          // options = angular.extend(angular.copy(connConfig),{
            // enabled: scope.enabled !== 'false'
          // }, scope.options);

        // };

        // destroy = function () {};

        // init = function () {
          // initOptions();



          // if (angular.element(element).hasClass('conn-initialized')) {
            // if (options.enabled) {
            //  return slickness.slick('getSlick');
            // } else {
              // destroy();
            // }
          // } else {
            // if (!options.enabled) {
              // return;
            // }
            // $timeout(function () {
              // angular.element(element).find('.circulo').connections({all:false});
            // });
          // }
        // };

        // destroyAndInit = function () {
          // destroy();
          // init();
        // };

        // element.one('$destroy', function () {
          // destroy();
        // });

        // return scope.$watch('options', function (newVal) {
          // if (newVal !== null) {
            // return destroyAndInit();
          // }
        // }, true);
      // }
    // };
  // }
//]);

/*vtimelineApp.directive('conectarLineas', function() {
  return {
    restrict: 'A',
    link: function( $scope ) {
      $scope.$on('repeat_done', function( domainElement ) {
        domainElement.find('.circulo').connections();
      } );
    }
  };
});*/
