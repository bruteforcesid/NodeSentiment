var app = angular.module("myApp");

app.controller('ratings', ['$scope', '$location', '$rootScope', 'apiServices', 'sharedData', '$timeout', function($scope, $location, $rootScope, apiServices, sharedData, $timeout) {
    
    $scope.sharedObject = sharedData.getProperty();
    $scope.abc = true;
    $scope.response;

    $scope.load = function() {

        console.log("failing");

        if ($scope.sharedObject.companyName == undefined || $scope.sharedObject.companyName == '') {
            $location.path('/');
        } else {

            var companyName = $scope.sharedObject.companyName;

            apiServices.ratingsAPI(companyName, function(response) {

                $scope.abc = false;
                if (response.error_code != 0) {
                    $location.path('/error');
                } else {

                    $scope.response = response.data;
                    $scope.array = [];

                    $scope.array.push(response.companyName);


                    //labels means score - 0 , -1, 2
                    $scope.labels = [];

                    $scope.data = [];

                    for(var x  = 0 ; x < $scope.response.length ; x++){
                        $scope.labels.push($scope.response[x].key);
                        $scope.data.push($scope.response[x].value);
                    }

                    // $scope.labels = ['0', '5', '10', '15', '20', '25', '30'];
                    
                    //list of companies
                    $scope.series = $scope.array;



                    // // data means frequency
                    //   $scope.data = [
                    //     [65, 59, 80, 81, 56, 55, 40]
                    //   ];


                    
                }

            }, function(error) {

                $location.path('/error');
            });
        }
    };

    $scope.load();
}]);