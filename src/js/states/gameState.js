/**
 * Created by Arnaud on 27/05/2017.
 */

const socketService = require("../services/service");

const spriteSize = 40,
    playerSpeed = 20;

var player, cursors, platforms, walls, bag, map, layer;

var gameState = {

    user : {},

    init : function(userData) {
        this.user = userData;
    },

    preload: function () {
        this.game.load.tilemap("map", "assets/map.csv", null, Phaser.Tilemap.CSV);
        this.game.load.spritesheet("player", "./assets/player.png", 27, 35);
        this.game.load.image("bag", "./assets/bag.png");
        this.game.load.image("grass", "./assets/grass.png");
        this.game.load.image("wall", "./assets/wall.png");
    },

    create: function () {
        map = game.add.tilemap("map", 40, 40);
        map.addTilesetImage("grass");
        layer = map.createLayer(0);
        layer.resizeWorld();

        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        bag = this.game.add.sprite(40, game.camera.height - 54, "bag");
        bag.inputEnabled = true;
        bag.fixedToCamera = true;
        bag.events.onInputUp.add(this.displayBagContents);

        player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "player");
        this.game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.collideWorldBounds = true;
        player.animations.add("up", [6, 7, 8], 10, true);
        player.animations.add("left", [0, 1, 2], 10, true);
        player.animations.add("right", [9, 10, 11], 10, true);
        player.animations.add("down", [3, 4, 5], 10, true);

        this.game.camera.follow(player);

        cursors = this.game.input.keyboard.createCursorKeys();
        cursors = this.game.input.keyboard.addKeys([Phaser.Keyboard.Z, Phaser.Keyboard.Q, Phaser.Keyboard.D, Phaser.Keyboard.S]);
    },

    update: function () {
        if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) || this.game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
            player.animations.play("up");
            player.y -= playerSpeed;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            player.animations.play("down");
            player.y += playerSpeed;
        }

        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
            player.animations.play("left");
            player.x -= playerSpeed;
        }
        else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            player.animations.play("right");
            player.x += playerSpeed;
        }
        else {
            player.animations.stop();
            player.frame = 4;
        }
    },

    displayBagContents: function () {

    }
};

module.exports = gameState;