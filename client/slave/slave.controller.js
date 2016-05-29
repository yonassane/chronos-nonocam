"use strict";

(function () {

angular.module("slaveApp")

.controller("slaveCtrl", ["$scope", "$window", "$timeout", "socketFactory", "CNMessage",
function ($scope, $window, $timeout, socketFactory, CNMessage) {

    var self    = this;
    var socket  = socketFactory();


    /* Methods */
    self.updateMessageArea = function(message) {
        if (!message) {
            return;
        }

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


    CNMessage.getLast().then(self.updateMessageArea);

}]);

})();
