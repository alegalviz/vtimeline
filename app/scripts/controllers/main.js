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

  $scope.categoriaseleccionada = '';
  $scope.setCategoria = function(cat) {
    $scope.categoriaseleccionada = cat;
  };
  $scope.etiquetaseleccionada = '';
  $scope.setEtiqueta = function(cat) {
    $scope.etiquetaseleccionada = cat;
  };

  $scope.actualizarlineas = function() {
    $('.hitos').find('.circulo').connections({all:false});
    $('.connection').addClass('loaded');
  };
  $scope.unirhitos = function () {
    angular.element('.hitos').find('.circulo').connections('remove');
    setTimeout($scope.actualizarlineas, 800);
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

vtimelineApp.filter('formatoEtiquetas', function() {
  return function(input)
  {
    var listado;
    listado = input.split(',').map(function(item) {
      return item.trim().toLowerCase();
    });
    return listado;
  };
});

vtimelineApp.filter('filtrarCategorias', function(){
  return function(values, categoria) {

    if(!categoria) {
      // initially don't filter
      return values;
    }

    return values.filter(function(value){
      if (value.categoria.toLowerCase().indexOf(categoria) !== -1) {
        return true;
      }
      return false;
    });
  };
});
vtimelineApp.filter('filtrarEtiquetas', function(){
  return function(values, etiqueta) {

    if(!etiqueta) {
      // initially don't filter
      return values;
    }

    return values.filter(function(value){

      if (value.Etiquetas.toLowerCase().indexOf(etiqueta) !== -1) {
        return true;
      }
      return false;
    });
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

vtimelineApp.directive('onFinishRender', function($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      if (scope.$last) setTimeout(function () {
        scope.$emit('onRepeatLast', element, attr);
      }, 1);
    }
  };
});

vtimelineApp.service('anchorDesplazarSuave', function(){

  this.scrollTo = function(eID) {

    // This scrolling function
    // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
    var startY, stopY;
    function currentYPosition() {
      // Firefox, Chrome, Opera, Safari
      if (document.pageYOffset) { return document.pageYOffset; }
      // Internet Explorer 6 - standards mode
      if (document.documentElement && document.documentElement.scrollTop)
      { return document.documentElement.scrollTop; }
      // Internet Explorer 6, 7 and 8
      if (document.body.scrollTop) {return document.body.scrollTop;}
      return 0;
    }

    function elmYPosition(eID) {
      var elm = document.getElementById(eID);
      var y = elm.offsetTop - 65;
      var node = elm;
      while (node.offsetParent && node.offsetParent !== document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
      } return y;
    }
    startY = currentYPosition();
    stopY = elmYPosition(eID);
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
        setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
        leapY += step;
        if (leapY > stopY) { leapY = stopY; } timer++;
      } return;
    }
    for ( var j=startY; j>stopY; j-=step ) {
      setTimeout('window.scrollTo(0, '+leapY+')', timer * speed);
      leapY -= step; if (leapY < stopY) { leapY = stopY;  } timer++;
    }



  };

});


vtimelineApp.directive('conecciones', [
  '$timeout', 'connConfig', function ($timeout, connConfig) {
    return {
      scope: {
        options: '=',
        enabled: '@'
      },
      restrict: 'AE',
      link: function (scope, element, attr) {
       // escondo las conecciones
       angular.element(element).css('display', 'none');

        var options, initOptions, destroy, init, destroyAndInit;

        initOptions = function () {
          options = angular.extend(angular.copy(connConfig),{
            enabled: scope.enabled !== 'false'
          }, scope.options);

        };

        destroy = function () {
          angular.element(element).find('.circulo').connections('remove');
        };

        init = function () {
          initOptions();
          if (angular.element(element).hasClass('conn-initialized')) {
            if (options.enabled) {
              angular.element(element).find('.circulo').connections('update');
            } else {
              destroy();
            }
          } else {
            if (!options.enabled) {
              return;
            }
            $timeout(function () {
              angular.element(element).css('display', 'block');
              angular.element(element).find('.circulo').connections({all:false});
              $('.connection').addClass('loaded');
            });
          }
        };

        destroyAndInit = function () {
          destroy();
          init();
        };

        element.one('$destroy', function () {
          destroy();
        });

        return scope.$watch('options', function (newVal) {
          if (newVal !== null) {
            return destroyAndInit();
          }
        }, true);
      }
    };
  }
]);

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
