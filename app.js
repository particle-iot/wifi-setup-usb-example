#!/usr/bin/env node


const fs = require('fs');
const path = require('path');

const http = require('http');


const serverPort = 5123;

var publicPath = path.join(__dirname, 'docs');

var express = require('express');

var app = express();



app.use('/', express.static(publicPath));


let serverOptions = {

};

var server = http.createServer(serverOptions, app).listen(serverPort, function(){
    //logger.info("listening for http on port " + serverPort);
});
