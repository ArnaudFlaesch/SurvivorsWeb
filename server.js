/**
 * Created by Arnaud on 17/06/2017.
 */

const express = require('express'),
    app = express(),
    server = require('http').createServer(app);

app.use(express.static("./build"));

server.listen(8000);