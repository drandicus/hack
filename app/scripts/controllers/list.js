'use strict';

angular.module('hackApp')
  .controller('ListCtrl', function ($scope, $http, $routeParams, $rootScope, $timeout) {
    $scope.news = [];
    $scope.interest = $routeParams.interest || 'Bugs';
    $rootScope.interest = $scope.interest;
    $scope.started = true;
    $timeout(function() {
      $http.get('/api/story/' + $scope.interest).success(function(data){
        $scope.started = false;
        $scope.news = data.articles.filter(Boolean);
        $rootScope.articles = data.articles.filter(Boolean);
      });
    }, 800);

  });
