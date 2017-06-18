/**
 * Created by Arnaud on 27/05/2017.
 */

"use strict";

const httpService = require("../services/httpService");
let emailInput, loginInput, passwordInput;

const registerState = {
    "preload": function () {
        this.game.load.image("validateButton", "./assets/validateButton.png");
        this.game.load.image("loginButton", "./assets/loginButton.png");
        this.game.add.plugin(Fabrique.Plugins.InputField);
    },

    "create": function () {
        emailInput = this.game.add.inputField(this.game.world.centerX, 60, {
            "placeHolder": "Adresse mail",
            "type": Fabrique.InputType.text
        });
        loginInput = this.game.add.inputField(this.game.world.centerX, 80, {
            "placeHolder": "Login",
            type: Fabrique.InputType.text
        });
        passwordInput = this.game.add.inputField(this.game.world.centerX, 100, {
            placeHolder: "Mot de passe",
            type: Fabrique.InputType.password
        });
        this.game.add.button(this.game.world.centerX - 40, 140, "validateButton", this.checkCredentials, this);
        this.game.add.button(this.game.world.centerX + 40, 140, "loginButton", this.loginUser, this);
    },

    "loginUser": function () {
        this.game.state.start("login");
    },

    "checkCredentials": function () {
        let userData = httpService.register(emailInput.value, loginInput.value, passwordInput.value);
        if (userData) {
            this.game.state.start("game");
            this.game.state.start("game", true, false, userData);
        }
    }
};

module.exports = registerState;
