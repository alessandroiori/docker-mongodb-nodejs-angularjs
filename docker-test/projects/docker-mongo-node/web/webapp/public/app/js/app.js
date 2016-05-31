'use strict';

/* App Module */

var cookbookApp = angular.module('cookbookApp', [
  'ngRoute',
  'appControllers'
]);


cookbookApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
     when('/recipe', {
        templateUrl: 'app/partials/recipe-list.html',
        controller: 'RecipeListCtrl'
      }).
    when('/recipe/add', {
        templateUrl: 'app/partials/add-recipe.html',
        controller: 'RecipeAddCtrl'
    }).
    when('/recipe/:recipeId', {
            templateUrl: 'app/partials/recipe-detail.html',
            controller: 'RecipeDetailCtrl'
        }).
    when('/cookbook/:cookbookId', {
        templateUrl: 'app/partials/recipe-list.html',
        controller: 'RecipeCookBookCtrl'
      }).
    otherwise({
        redirectTo: '/recipe'
      });
  }]);