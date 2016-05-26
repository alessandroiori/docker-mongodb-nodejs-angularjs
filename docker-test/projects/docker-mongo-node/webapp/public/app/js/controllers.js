'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('CookBookCtrl', ['$scope', 'AppAdapter',
  function($scope, AppAdapter) {

    AppAdapter.getCookbooks().then(
        function success(response){
          $scope.cookbooks = response.data.cookBooks;
        },function error(response){})

}]);

appControllers.controller('RecipeListCtrl', ['$scope', 'AppAdapter',
  function($scope, AppAdapter) {

    AppAdapter.getRecipes().then(
        function success(response) {
          $scope.recipes = response.data.recipes;
        },function error(response){});

}]);


appControllers.controller('RecipeCookBookCtrl', ['$scope', 'AppAdapter','$routeParams',
  function($scope, AppAdapter,$routeParams) {

      var cookbookId = $routeParams.cookbookId;
      AppAdapter.getCookbook(cookbookId).then(
          function success(response) {
              $scope.recipes = response.data.cookBook.recipes;
          }, function error(response){});

}]);

appControllers.controller('RecipeDetailCtrl', ['$scope', 'AppAdapter', '$routeParams',
  function($scope, AppAdapter, $routeParams) {

      var recipeID =  $routeParams.recipeId;
      AppAdapter.getRecipe(recipeID).then(
          function success (response){
            $scope.recipe = response.data.recipe;
          }
          ,function error (response){});
}]);

appControllers.controller('RecipeAddCtrl', ['$scope','AppAdapter',
  function($scope,AppAdapter) {

      AppAdapter.getCookbooks().then(
        function success (response){
            $scope.cookbooks = response.data.cookBooks;
        },function error(response){}
      );

      $scope.newRecipe = {}
      $scope.newCookbook = {
          name:"",
          description:"",
          owener:""
        };
      $scope.cookbookSelected = {};

      $scope.newRecipe.ingredients = [{}];
      
      $scope.addNewIngredient = function() {
        $scope.newRecipe.ingredients.push({});
      };

      $scope.removeIngredient = function(index) {
          $scope.newRecipe.ingredients.splice(index,1);
      };
      $scope.newRecipe.steps = [{}];

      $scope.addNewStep = function() {
          $scope.newRecipe.steps.push({});
      };
      $scope.removeStep = function(index) {
          $scope.newRecipe.steps.splice(index,1);
      };

      function callAddCookbookAndLinkRecipe(recipeAddedID,cookbook){
          AppAdapter.addCookbook(cookbook).then(
              function success(response){
                  if(response.data.status){
                      var cookbookAddedID = response.data.cookbook._id;
                      callLinkRecipeAtCookbook(recipeAddedID,cookbookAddedID);
                  }
                  else $scope.msg = "Errore nell'aggiunta del ricettario ";
              },function error(response){}
          )
      }

      function callLinkRecipeAtCookbook (recipeAddedID,coookbookID){
          AppAdapter.linkRecipeAtCookbook(recipeAddedID,coookbookID).then(
              function success(response){
                  if (response.data.status){
                      $scope.msg = "Ricetta aggiunta con successo";
                  }
                  else $scope.msg = "Errore nel link ad un ricettario ";
              },
              function error(response){}
          )
      }

      $scope.addRecipe = function (){
          AppAdapter.addRecipe($scope.newRecipe).then(
              function success(response){
                  if (response.data.status){
                      $scope.response = response;
                      var recipeAddedID = response.data.recipe._id;
                      if($scope.cookbookSelected == "newCookbook"){
                          var coookbook = $scope.newCookbook;
                          callAddCookbookAndLinkRecipe(recipeAddedID,coookbook);
                      }else{
                          var coookbookID = $scope.cookbookSelected;
                          callLinkRecipeAtCookbook(recipeAddedID,coookbookID);
                      }
                  }
                  else $scope.msg = "Errore aggiunta ricetta"

              },
              function error(response){})
    }

}]);

appControllers.service("AppAdapter",['$http',function($http){
    var host = "http://localhost:8080"

    this.addCookbook = function (newCookbook){
        return $http.post(host+"/cookbook",newCookbook);
    };
    this.getCookbooks = function () {
      return $http.get(host+"/cookbook");
    };
    this.getCookbook = function(cookbookId){
        return $http.get(host+"/cookbook/"+cookbookId)
    };
    this.addRecipe = function (recipe){
        //cloning object recipe for preparing steps data to backend ["step1","step2"]without backfire
        var newRecipe = JSON.parse(JSON.stringify(recipe));
        newRecipe.steps.forEach(function (step,index){
            newRecipe.steps[index] = step.descr;
        });
        //prepare tags format for backend ["tag1","tag2"]
        var stringTags = newRecipe.tag;
        if (stringTags!=null){
            newRecipe.tag = [];
            stringTags.split(",").forEach(function (tag,index){
                if(tag!="")
                    newRecipe.tag[index] = tag;
            });
        }

        return $http.post(host+"/recipe",newRecipe);
    };
    this.getRecipes = function (){
      return $http.get(host+"/recipe")
    };
    this.getRecipe = function(recipeId){
        return $http.get(host+"/recipe/"+recipeId)
    };
    this.linkRecipeAtCookbook = function(recipeID,cookbookID){
      var recipeToLink = {"recipeID":recipeID};
      return $http.post(host+"/cookbook/"+cookbookID+"/recipe/link",recipeToLink);
    };
}]);

