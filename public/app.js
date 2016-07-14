/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _chatUtils = __webpack_require__(1);

	var _constants = __webpack_require__(2);

	__webpack_require__(3);

	(function () {
	    if (window.File && window.FileReader) {
	        document.getElementById('uploadButton').addEventListener('click', _chatUtils.startUpload);
	        document.getElementById('fileBox').addEventListener('change', _chatUtils.fileChosen);
	    } else {
	        document.getElementById('statusArea').innerHTML = "Your Browser Doesn't Support The File API Please Update Your Browser";
	    }

	    document.getElementById('rooms').addEventListener('click', function (event) {
	        return (0, _chatUtils.switchRoom)('' + event.target.innerHTML);
	    });
	    document.getElementById('datasend').addEventListener('click', function (event) {
	        return (0, _chatUtils.createOnClick)('data', 'sendchat');
	    });
	    document.getElementById('roombutton').addEventListener('click', function (event) {
	        return (0, _chatUtils.createOnClick)('roomname', 'create room');
	    });
	    document.getElementById('data').addEventListener('keypress', function (event) {
	        return (0, _chatUtils.createOnEnter)(event, 'sendchat');
	    });
	    document.getElementById('roomname').addEventListener('keypress', function (event) {
	        return (0, _chatUtils.createOnEnter)(event, 'create room');
	    });
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createOnEnter = exports.createOnClick = exports.getselectedFile = exports.startUpload = exports.dateGet = exports.fileChosen = exports.makeid = exports.switchRoom = undefined;

	var _constants = __webpack_require__(2);

	var selectedFile = void 0;

	var switchRoom = function switchRoom(room) {
	    return _constants.socket.emit('switchRoom', room);
	};
	var getselectedFile = function getselectedFile() {
	    return selectedFile;
	};
	var fileChosen = function fileChosen(event) {
	    return selectedFile = event.target.files[0];
	};

	var createOnClick = function createOnClick(fieldId, eventName) {
	    var data = document.getElementById('' + fieldId);
	    _constants.socket.emit('' + eventName, data.value);
	    data.value = '';
	};

	var createOnEnter = function createOnEnter(event, socketEvent) {
	    if (event.keyCode == 13) {
	        _constants.socket.emit('' + socketEvent, event.target.value);
	        event.target.value = '';
	    }
	};

	var dateGet = function dateGet(val) {
	    if (val) return new Date(val).getDate() + '/' + (new Date(val).getMonth() + 1) + '/' + new Date(val).getFullYear() + ' @ ' + new Date(val).getHours() + ':' + new Date(val).getMinutes();else return new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() + ' @ ' + new Date().getHours() + ':' + new Date().getMinutes();
	};

	var makeid = function makeid() {
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    for (var i = 0; i < 25; i++) {
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    }return text;
	};

	var startUpload = function startUpload() {
	    if (document.getElementById('fileBox').value != "") {
	        (function () {
	            var ex = selectedFile.name.split('.');
	            var name = makeid() + '.' + ex[ex.length - 1];
	            _constants.fileReader.onload = function (event) {
	                _constants.socket.emit('upload', { name: name, data: event.target.result });
	            };
	            _constants.socket.emit('start', { name: name, size: selectedFile.size });
	            document.getElementById('statusArea').innerHTML = '\n            <div id="loading">\n                <div id="spinner"> \n                    <img src="./ring.svg" width="10%"/> \n                </div>\n                <div id=\'uploaded\'> \n                    <span id=\'mb\'> 0 </span> / <span> ' + Math.round(selectedFile.size / 1048576) + 'MB </span> \n                </div> \n            </div>\n        ';
	        })();
	    } else {
	        alert("Please Select A File");
	    }
	};

	exports.switchRoom = switchRoom;
	exports.makeid = makeid;
	exports.fileChosen = fileChosen;
	exports.dateGet = dateGet;
	exports.startUpload = startUpload;
	exports.getselectedFile = getselectedFile;
	exports.dateGet = dateGet;
	exports.createOnClick = createOnClick;
	exports.createOnEnter = createOnEnter;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var socket = io();
	var fileReader = new FileReader();

	exports.socket = socket;
	exports.fileReader = fileReader;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(4);

	__webpack_require__(5);

	__webpack_require__(6);

	__webpack_require__(7);

	__webpack_require__(8);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _chatUtils = __webpack_require__(1);

	var _constants = __webpack_require__(2);

	_constants.socket.on('updatechat', function (username, data) {
		var conversation = document.getElementById('conversation');
		var li = document.createElement('li');
		li.innerHTML = '(' + (0, _chatUtils.dateGet)() + ') ' + username + ':</b> ' + data + ')';
		conversation.appendChild(li);
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _constants = __webpack_require__(2);

	_constants.socket.on('connect', function () {
	   var username = prompt("What's your name: ");
	   _constants.socket.emit('adduser', username);
	   document.getElementById('helloID').innerHTML = 'Hello, ' + username;
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _chatUtils = __webpack_require__(1);

	var _constants = __webpack_require__(2);

	_constants.socket.on('moreData', function (data) {
	    var mb = document.getElementById('mb');
	    mb.innerHTML = '' + Math.round(data.percent / 100.0 * (0, _chatUtils.getselectedFile)().size / 1048576);
	    data.place *= 524288;
	    _constants.fileReader.readAsBinaryString((0, _chatUtils.getselectedFile)().slice(data.place, data.place + Math.min(524288, (0, _chatUtils.getselectedFile)().size - data.place)));
	});

	_constants.socket.on('done', function (data) {
	    var loading = document.getElementById('loading');
	    var conversation = document.getElementById('conversation');
	    var li = document.createElement('li');

	    li.innerHTML = '\n        <span>(' + (0, _chatUtils.dateGet)() + ') ' + data.user + ':</span>\n        </b>\n        <a href="/download?name=' + data.link + '" download>\n            <i class="glyphicon glyphicon-file"></i>\n        </a>\n    ';

	    conversation.appendChild(li);
	    loading.parentNode.removeChild(loading);
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _chatUtils = __webpack_require__(1);

	var _constants = __webpack_require__(2);

	_constants.socket.on('updaterooms', function (rooms, current_room) {
	    var roomsEl = document.getElementById('rooms');
	    roomsEl.innerHTML = '';

	    $.each(rooms, function (key, value) {
	        var li = document.createElement('li');
	        if (value == current_room) {
	            li.innerHTML = '\n            <h4>\n                <i class="glyphicon glyphicon-headphones"></i> ' + value + '\n            </h4>\n            ';
	            roomsEl.appendChild(li);
	        } else {
	            li.innerHTML = '\n            <h4>\n                <i class="glyphicon glyphicon-headphones"></i> \n                <a href="#"> <span>' + value + '</span> </a>\n            </h4>\n            ';

	            roomsEl.appendChild(li);
	        }
	    });
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _chatUtils = __webpack_require__(1);

	var _constants = __webpack_require__(2);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	_constants.socket.on('updateusers', function (users) {
	    var userMessages = [];
	    var conversation = document.getElementById('conversation');
	    var usersEl = document.getElementById('users');

	    usersEl.innerHTML = '';

	    $.each(users, function (key, value) {
	        var li = document.createElement("li");
	        li.innerHTML = '\n            <h4>\n                <i class="glyphicon glyphicon-user"></i> <span>' + value.name + '</span>\n            </h4>\n        ';
	        usersEl.appendChild(li);

	        if (value.messages.length > 0) {
	            value.messages.forEach(function (key) {
	                var li = document.createElement("li");
	                li.innerHTML = '(' + (0, _chatUtils.dateGet)(key.date) + ') ' + value.name + ' :</b> ' + key.txt;
	                userMessages = [].concat(_toConsumableArray(userMessages), [li]);
	            });
	        }
	    });

	    userMessages.sort().forEach(function (key) {
	        conversation.appendChild(key);
	    });
	});

/***/ }
/******/ ]);