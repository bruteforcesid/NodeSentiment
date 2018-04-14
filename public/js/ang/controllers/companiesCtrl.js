var app = angular.module("myApp");

app.controller('companies', ['$scope', '$location', '$rootScope', 'apiServices', 'sharedData', function($scope, $location, $rootScope, apiServices, sharedData) {
    $scope.abc = true;
    $scope.response;

    $scope.load = function() {

        apiServices.companiesAPI('', function(response) {
            $scope.abc = false;
            if (response.error_code != 0) {
                $location.path('/error');
            } else {
                $scope.response = response.data;
            }
        }, function(error) {
            $location.path('/error');
        });
    }

    $scope.load();

    $scope.setSharedData = function(companyName) {

        sharedData.setProperty({

            "companyName": companyName

        });

        $location.path('/ratings');
    };
}]);