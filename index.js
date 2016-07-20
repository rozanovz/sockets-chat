//server utils
const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//express app controllers
const homeCtrl = require('./app/ctrls/home.ctrl');
const chatCtrl = require('./app/ctrls/chat.ctrl');
const downloadCtrl = require('./app/ctrls/download.ctrl');
const authCtrl = require('./app/ctrls/auth.ctrl');

//socket listener
const connectSocket = require('./app/sockets/index');

//express configs
app.set("views",  `${__dirname}/app/views`);
app.set("view engine", "jade");
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//express routes
app.get('/', homeCtrl);
app.get('/chat', chatCtrl);
app.get('/download', downloadCtrl);
app.post('/auth', authCtrl);

//mongoose configs
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://localhost/socketsChat`);

//sockets listeners
io.sockets.on('connection', connectSocket(io));

//launching server
http.listen(4000, () => {
	console.log('listening on 4000');
});