/**
 * Created by Arnaud on 27/05/2017.
 */

"use strict";

const httpService = require("../services/httpService");

let loginInput, passwordInput;

var loginState = {
    preload: function () {
        this.game.load.image("validateButton", "./assets/validateButton.png");
        this.game.load.image("registerButton", "./assets/registerButton.png");
        this.game.add.plugin(Fabrique.Plugins.InputField);
    },

    create: function () {
        loginInput = this.game.add.inputField(this.game.world.centerX, 80, {
            "placeHolder": "Login",
            "type": Fabrique.InputType.text
        });
        passwordInput = this.game.add.inputField(this.game.world.centerX, 100, {
            "placeHolder": "Mot de passe",
            "type": Fabrique.InputType.password
        });

        this.game.add.button(this.game.world.centerX - 40, 140, "validateButton", this.checkCredentials, this);
        this.game.add.button(this.game.world.centerX + 40, 140, "registerButton", this.registerUser, this);
    },

    "registerUser": function () {
        this.game.state.start("register");
    },

    "checkCredentials": function () {
        let userData = httpService.login(loginInput.value, passwordInput.value);
        if(JSON.parse(userData)._nickname !== undefined) {
            this.game.state.start("game", true, false, userData);
        }
    }
};

module.exports = loginState;
