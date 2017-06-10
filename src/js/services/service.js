/**
 * Created by Arnaud on 20/05/2017.
 */

const io = require("socket.io-client"),
    API_URL = "http://localhost:3000",
    socket = io.connect(API_URL);

var service = {

};

module.exports = service;