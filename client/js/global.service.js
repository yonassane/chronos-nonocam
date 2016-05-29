"use strict";

(function() {

angular.module("chronos-nonocam.global", [])

.factory("CNMessage", ["$http", function($http) {
    return {
        getLast: function() {
            return $http.get("/api/message/last")
                .then(function(response) {
                    return response.data;
                });
        },
        getAll: function() {
            return $http.get("/api/message/all")
                .then(function(response) {
                    return response.data;
                });
        }
    };
}]);

})();
