var app = angular.module("myApp", ["ngRoute", "ngStorage", "chart.js"]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "views/companiesList.html"
        })
        .when("/error", {
            templateUrl: "views/error.html"
        })
        .when("/ratings", {
            templateUrl: "views/ratings.html"
        })
        .otherwise({
            templateUrl: "views/companiesList.html"
        });
}]);

app.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      chartColors: ['#FF5252', '#FF8A80'],
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
      showLines: false
    });
  }])


app.run(['$rootScope', '$location', '$localStorage',  function($rootScope, $location, $localStorage){
    
}]);