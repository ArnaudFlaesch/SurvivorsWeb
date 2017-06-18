/**
 * Created by Arnaud on 20/05/2017.
 */

const io = require("socket.io-client");
const API_URL = "http://localhost:3000";

const socketService = {};

socketService.playersSprites = [];

socketService.socket = io.connect(API_URL);

socketService.initListeners = function () {
    socketService.socket.on("displayPlayers", socketService.displayPlayers);
};

socketService.playerLoggedIn = function (nickname, positionX, positionY) {
    socketService.socket.emit("playerLoggedIn", {"_nickname": nickname, "_positionX": positionX, "_positionY": positionY});
};

socketService.movePlayer = function (nickname, positionX, positionY) {
    socketService.playersSprites.map(function (sprite) {
        if (sprite._nickname === nickname) {
            sprite.sprite.destroy();
        }
    });
    socketService.socket.emit("movePlayer", {"_nickname": nickname, "_positionX": positionX, "_positionY": positionY});
};

socketService.displayPlayers = function (playerList) {
    socketService.playersSprites = [];
    playerList.map(function (player) {
        socketService.playersSprites.push({"_nickname": player._nickname, "sprite": this.game.add.sprite(player._positionX, player._positionY, "player")});
    });
};

module.exports = socketService;
