"use strict";

(function () {

angular.module("masterApp")

.controller("masterCtrl", ["$scope", "$window", "socketFactory", "CNMessage",
function ($scope, $window, socketFactory, CNMessage) {

    var self = this;
    var socket = socketFactory();


    /* Methods */
    self.emitNewMessage = function(newMessage) {
        socket.emit("updateMessage", newMessage);
    };

    self.updateMessageArea = function(message) {
        if (!message) {
            return;
        }

        self.message        = angular.copy(message);
        self.messageStyle   = {
            'color':            message.textColor,
            'background-color': message.backgroundColor,
            'font-size':        ($('#messageArea').height() / message.rows)+"px"
        };
    };

    /* Events */
    socket.on("updateMessage", self.updateMessageArea);

    angular.element($window).on("resize", function(evt) {
        if ( self.messageStyle && self.messageStyle["font-size"] ) {
            $scope.$apply(function() {
                self.messageStyle["font-size"] = ($('#messageArea').height() / self.message.rows)+"px";
            });
        }
    });


    CNMessage.getLast()
        .then(function(message) {
            if (!self.message) {
                self.newMsg = angular.copy(message);
                self.updateMessageArea(message);
            }
        });

}]);

})();
