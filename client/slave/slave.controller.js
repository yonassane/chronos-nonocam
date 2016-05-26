"use strict";

(function () {

angular.module("slaveApp")

.controller("slaveCtrl", ["$scope", "$window", "$timeout", "socketFactory", function ($scope, $window, $timeout, socketFactory) {

    var self    = this;
    var socket  = socketFactory();


    /* Methods */
    self.updateMessageArea = function(message) {
        self.message        = angular.copy(message);
        self.messageStyle   = {
            'color':            message.textColor,
            'background-color': message.backgroundColor,
            // -2 because we have padding-top and padding-bottom set to 1vh
            'font-size':        ( (100 - 2) / message.rows ) + "vh"
        };
    };

    /* Socket.io events */
    socket.on("updateMessage", self.updateMessageArea);

    /* Properties */
    self.isFullscreen = false;


    self.updateMessageArea({
        'text':             "Coucou !\nComment\nCa va ?",
        'textColor':        "#FF7D26",
        'backgroundColor':  "#000000",
        'rows':             3
    });

}]);

})();
