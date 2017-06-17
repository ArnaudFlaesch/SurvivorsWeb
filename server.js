/**
 * Created by Arnaud on 17/06/2017.
 */

const express = require("express"),
    app = express(),
    server = require("http").createServer(app),
    port = process.env.PORT || 8000;

app.use(express.static("./build"));

server.listen(port, function() {
    console.log("Application started on port " + port);
});