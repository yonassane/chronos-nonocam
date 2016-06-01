"use strict";

(function () {

angular.module("historyApp")

.controller("historyCtrl", ["socketFactory", "CNMessage",
function (socketFactory, CNMessage) {

    var self    = this;
    var socket  = socketFactory();


    /* Methods */
    self.initMessageList = function(messageList) {
        if (!messageList) {
            return;
        }

        angular.forEach(messageList, self.addMessageToList);
    };
    
    self.addMessageToList = function(message) {
        if (!message) {
            return;
        }
            
        if (!self.messageList || !self.messageList.length) {
            self.messageList = [];
        }

        self.messageList.push({
            'text':         message.text,
            'creationDate': message.creationDate,
            'style':        {
                'color':            message.textColor,
                'backgroundColor':  message.backgroundColor
            }
        });
    };

    /* Socket.io events */
    socket.on("updateMessage", self.addMessageToList);


    CNMessage.getAll().then(self.initMessageList);

}]);

})();
