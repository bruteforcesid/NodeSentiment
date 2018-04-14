'use strict';

var app = angular.module('myApp');

app.factory('apiServices', ['$http', 'PROPERTIES', '$localStorage', function($http, PROPERTIES, $localStorage) {

    var baseURL = PROPERTIES.BASE_URL;


    var config = {
        cache: false,
        headers: {

        }
    }

    var transform = function(config) {
        if ($localStorage.token) {
            config.headers['x-access-token'] = $localStorage.token;
        } else {
            config.headers['x-access-token'] = 'abc';
        }
        return config;
    }

    return {
        companiesAPI: function(data, success, error) {

            $http.get(baseURL + '/companiesList')
                .success(success)
                .error(error);

        },
        ratingsAPI: function(data, success, error) {

            $http.get(baseURL + '/ratings/' + data)
                .success(success)
                .error(error);

        }
    };
}]);


app.service('sharedData', ['$localStorage', function($localStorage) {

    $localStorage.property = {};

    return {

        getProperty: function() {
            return $localStorage.property;
        },
        setProperty: function(value) {
            $localStorage.property = value;
        }

    };

}]);