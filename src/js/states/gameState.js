/**
 * Created by Arnaud on 27/05/2017.
 */

"use strict";

const socketService = require("../services/socketService");
const playerSpeed = 20;

var bag, layer, map, player, bar, toolbar, healthLabel, hungerLabel;
var style = {fill: "#FFFFFF"};
const gameState = {};

gameState.user = {};

gameState.init  = function (userData) {
    gameState.user = JSON.parse(userData);
    socketService.initListeners();
};

gameState.preload = function () {
    this.game.load.tilemap("map", "assets/map.csv", null, Phaser.Tilemap.CSV);
    this.game.load.spritesheet("player", "./assets/player.png", 27, 35);
    this.game.load.image("bag", "./assets/bag.png");
    this.game.load.image("toolbar", "./assets/toolbar.png");
    this.game.load.image("grass", "./assets/grass.png");
    this.game.load.image("wall", "./assets/wall.png");
};

gameState.create = function () {
    map = this.game.add.tilemap("map", 40, 40);
    map.addTilesetImage("grass");
    layer = map.createLayer(0);
    layer.resizeWorld();

    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    player = this.game.add.sprite(this.user._positionX, this.user._positionY, "player");
    socketService.playerLoggedIn(this.user._nickname, this.user._positionX, this.user._positionY);
    this.game.physics.enable(player, Phaser.Physics.ARCADE);

    player.enableBody;
    player.body.collideWorldBounds = true;
    player.animations.add("up", [6, 7, 8], 10, true);
    player.animations.add("left", [0, 1, 2], 10, true);
    player.animations.add("right", [9, 10, 11], 10, true);
    player.animations.add("down", [3, 4, 5], 10, true);

    gameState.createToolbar();

    this.game.camera.follow(player);

    this.game.input.keyboard.createCursorKeys();
    this.game.input.keyboard.addKeys([Phaser.Keyboard.Z, Phaser.Keyboard.Q, Phaser.Keyboard.D, Phaser.Keyboard.S]);
};

gameState.update = function () {
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
        this.user._positionY = player.y - playerSpeed;
        socketService.movePlayer(this.user._nickname, this.user._positionX, this.user._positionY);
        player.y = this.user._positionY;
        player.animations.play("up");
    }

    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        this.user._positionY = player.y + playerSpeed;
        socketService.movePlayer(this.user._nickname, this.user._positionX, this.user._positionY);
        player.y = this.user._positionY;
        player.animations.play("down");
    }

    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
        this.user._positionX = player.x - playerSpeed;
        socketService.movePlayer(this.user._nickname, this.user._positionX, this.user._positionY);
        player.x = this.user._positionX;
        player.animations.play("left");
    }

    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        this.user._positionX = player.x + playerSpeed;
        socketService.movePlayer(this.user._nickname, this.user._positionX, this.user._positionY);
        player.x = this.user._positionX;
        player.animations.play("right");
    }

    else {
        player.animations.stop();
        player.frame = 4;
    }
};

gameState.createToolbar = function() {
    bar = this.game.add.group();
    let barCollision = this.game.physics.arcade.collide(player, bar);
    bar.enableBody = true;
    bar.fixedToCamera = true;

    for (let index = 0; index < this.game.world.width; index += 40) {
        toolbar = this.game.add.sprite(index, this.game.camera.height - 54, "toolbar");
        bar.add(toolbar);
    }

    bag = this.game.add.sprite(10, this.game.camera.height - 60, "bag");
    bag.inputEnabled = true;
    bag.events.onInputUp.add(this.displayBagContents);
    bar.add(bag);

    bar.add(this.game.add.text(200, this.game.camera.height - 45, this.user._nickname, style));
    bar.add(this.game.add.text(400, this.game.camera.height - 45, "Santé", style));
    bar.add(this.game.add.text(600, this.game.camera.height - 45, "Faim", style));

    gameState.updateToolbar();
}

gameState.updateToolbar = function () {
    if (healthLabel !== undefined) {
        console.log("là");
        healthLabel.destroy();
    }
    if (hungerLabel !== undefined) {
        hungerLabel.destroy();
    }
    healthLabel = this.game.add.text(500, this.game.camera.height - 45, this.user._health, style);
    hungerLabel = this.game.add.text(700, this.game.camera.height - 45, this.user._hunger, style);
    bar.add(healthLabel);
    bar.add(hungerLabel);
}

setInterval(function () {
    gameState.user._health -= 1;
    gameState.user._hunger -= 1;
    gameState.updateToolbar();
}, 3000);


gameState.displayBagContents = function () {

};

module.exports = gameState;
