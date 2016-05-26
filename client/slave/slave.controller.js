"use strict";

(function () {

angular.module("slaveApp")

.controller("slaveCtrl", ["$window", "socketFactory", function ($window, socketFactory) {

    var self = this;
    var socket = socketFactory();
    // TODO compute it from messageArea width
    var messageAreaHeightInPixel    = $window.innerHeight;
    var messageAreaPaddingInPixel   = 20;


    /* Methods */
    self.updateMessageArea = function(message) {
        self.message        = angular.copy(message);
        self.messageStyle   = {
            'color':            message.textColor,
            'background-color': message.backgroundColor,
            'height':           messageAreaHeightInPixel,
            'padding-top':      messageAreaPaddingInPixel,
            'padding-bottom':   messageAreaPaddingInPixel,
            'font-size':        Math.floor((messageAreaHeightInPixel - 2 * messageAreaPaddingInPixel) / message.rows)+"px"
        };

        console.log("message: %o", self.message);
        console.log("messageStyle: %o", self.messageStyle);
    };


    /* Socket.io events */
    socket.on("updateMessage", self.updateMessageArea);

}]);

})();
