"use strict";

(function () {

angular.module("masterApp")

.controller("masterCtrl", ["$scope", "$window", "socketFactory", function ($scope, $window, socketFactory) {

    var self = this;
    var socket = socketFactory();


    /* Methods */
    self.emitNewMessage = function(newMessage) {
        socket.emit("updateMessage", newMessage);
    };

    self.updateMessageArea = function(message) {
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

    /* Properties */
    self.newMsg = {
        'text':             "Coucou !\nComment\nCa va ?",
        'textColor':        "#FF7D26",
        'backgroundColor':  "#000000",
        'rows':             3
    };


    self.updateMessageArea(self.newMsg);

}]);

})();
