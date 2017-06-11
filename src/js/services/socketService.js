/**
 * Created by Arnaud on 20/05/2017.
 */

const io = require("socket.io-client"),
    API_URL = "http://localhost:3000";

var socketService = {

    socket : io.connect(API_URL),

    playerLoggedIn : function(positionX, positionY) {
        this.socket.emit("playerLoggedIn", {positionX: positionX, positionY: positionY});
    }

};

module.exports = socketService;