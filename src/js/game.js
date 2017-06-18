"use strict";

window.PIXI = require("phaser/build/custom/pixi");
window.p2 = require("phaser/build/custom/p2");

const Phaser = require("phaser"),
    gameState = require("./states/gameState"),
    loginState = require("./states/loginState"),
    registerState = require("./states/registerState");


const game = new Phaser.Game(
    window.innerWidth - 20,
    window.innerHeight - 20,
    Phaser.AUTO,
    "survivors-game"
);

game.state.add("login", loginState);
game.state.add("register", registerState);
game.state.add("game", gameState);
game.state.start("login");

window.game = game;
