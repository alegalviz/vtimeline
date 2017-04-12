'use strict';

/**
 * @ngdoc function
 * @name vtimelineApp.controller:MainCtrl
 * @description 2017
 * @author alegalviz
 * # MainCtrl
 * Controller of the vtimelineApp
 */
var vtimelineApp = angular.module('vtimelineApp');

vtimelineApp.controller('MainCtrl', function ($scope, hitosRepository) {


     hitosRepository.getAllHitos().then(function(hitos) {
         $scope.hitos = hitos.data.filter(function (i){
             return i.titulo!==null;
         });

     });

      $scope.addHito = function () {
        $scope.hitos.push($scope.hito);
        $scope.hito = '';
      };
      $scope.removeHito = function (index) {
        $scope.hitos.splice(index, 1);
      };
    });

vtimelineApp.factory('hitosRepository', function($http) {
  return {
    getAllHitos: function() {

        var url = 'json/puhal-v2.json';
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
    var momentString = momentObj.format('DD-MM'); // 2016-07-15

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

vtimelineApp.directive('lineConnection', function(){
  return {
    restrict: 'A',
    link: function(scope, el){
      $(el).connections();
    }
  }
});
$(document).ready(function() {
  $('.circulos').connections();
  var connections = $('connection, inner');
  setInterval(function() { connections.connections('update') }, 100);
});
