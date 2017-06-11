/**
 * Created by Arnaud on 27/05/2017.
 */

window.jQuery = require("jquery");
window.jQuery.ajaxSetup({ async:false });
const $ = require("jquery"),
    userModel = require("../model/user");

const API_URL = "http://localhost:3000";

var httpService = {

    loggedUser : userModel,

    login : function (login, password) {
        var dataUser = null;
        $.post(API_URL + "/user/login",
            {
                _nickname: login,
                _password: password
            },
            function (data) {
                dataUser = data;
            }, "text"
        );
        return (dataUser);
    },

    register : function (email, login, password) {
        var dataUser = null;
        $.post(API_URL + "/user/register",
            {
                _email: email,
                _nickname: login,
                _password: password
            },
            function (data) {
                dataUser = data;
            }, "text"
        );
        return (dataUser);
    }
};

module.exports = httpService;