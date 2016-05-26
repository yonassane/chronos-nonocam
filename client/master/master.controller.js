"use strict";

(function () {

angular.module("masterApp")

.controller("masterCtrl", ["socketFactory", function (socketFactory) {

    var self = this;
    var socket = socketFactory();
    // TODO compute it from messageArea width
    var messageAreaHeightInPixel    = 330;
    var messageAreaPaddingInPixel   = 10;


    /* Methods */
    self.emitNewMessage = function(newMessage) {
        socket.emit("updateMessage", newMessage);
    };

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


    /* Properties */
    self.newMsg = {
        'text':             "Coucou !\nComment\nça va ?",
        'textColor':        "#FF7D26",
        'backgroundColor':  "#000000",
        'rows':             3
    };

    self.updateMessageArea(self.newMsg);

}]);

})();
