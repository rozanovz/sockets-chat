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

	var _chatUtils2 = _interopRequireDefault(_chatUtils);

	var _constants = __webpack_require__(2);

	__webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	    if (window.File && window.FileReader) {
	        document.getElementById('uploadButton').addEventListener('click', _chatUtils2.default.startUpload);
	        document.getElementById('fileBox').addEventListener('change', _chatUtils2.default.fileChosen);
	    } else {
	        document.getElementById('statusArea').innerHTML = "Your Browser Doesn't Support The File API Please Update Your Browser";
	    }

	    document.getElementById('rooms').addEventListener('click', function (event) {
	        return _chatUtils2.default.switchRoom('' + event.target.innerHTML);
	    });
	    document.getElementById('datasend').addEventListener('click', function (event) {
	        return _chatUtils2.default.createOnEvent(event, 'data', 'sendchat');
	    });
	    document.getElementById('roombutton').addEventListener('click', function (event) {
	        return _chatUtils2.default.createOnEvent(event, 'roomname', 'create room');
	    });
	    document.getElementById('data').addEventListener('keypress', function (event) {
	        return _chatUtils2.default.createOnEvent(event, null, 'sendchat');
	    });
	    document.getElementById('roomname').addEventListener('keypress', function (event) {
	        return _chatUtils2.default.createOnEvent(event, null, 'create room');
	    });
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _constants = __webpack_require__(2);

	exports.default = {
	    selectedFile: '',

	    switchRoom: function switchRoom(room) {
	        return _constants.socket.emit('switchRoom', room);
	    },

	    getselectedFile: function getselectedFile() {
	        return undefined.selectedFile;
	    },

	    fileChosen: function fileChosen(event) {
	        return undefined.selectedFile = event.target.files[0];
	    },

	    createOnEvent: function createOnEvent(event, fieldId, socketEvent) {
	        var val = '';

	        if (event.keyCode == 13) {
	            val = event.target.value;
	            event.target.value = '';
	        } else if (event.type == 'click') {
	            var el = document.getElementById('' + fieldId);
	            val = el.val;
	            el.value = '';
	        }

	        _constants.socket.emit('' + socketEvent, val);
	    },

	    dateGet: function dateGet(val) {
	        if (val) return new Date(val).getDate() + '/' + (new Date(val).getMonth() + 1) + '/' + new Date(val).getFullYear() + ' @ ' + new Date(val).getHours() + ':' + new Date(val).getMinutes();else return new Date().getDate() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear() + ' @ ' + new Date().getHours() + ':' + new Date().getMinutes();
	    },

	    makeid: function makeid() {
	        var id = "";
	        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	        for (var i = 0; i < 25; i++) {
	            id += pattern.charAt(Math.floor(Math.random() * pattern.length));
	        }return id;
	    },

	    startUpload: function startUpload() {
	        if (document.getElementById('fileBox').value != "") {
	            (function () {
	                var ex = undefined.selectedFile.name.split('.');
	                var name = makeid() + '.' + ex[ex.length - 1];
	                _constants.fileReader.onload = function (event) {
	                    _constants.socket.emit('upload', { name: name, data: event.target.result });
	                };
	                _constants.socket.emit('start', { name: name, size: undefined.selectedFile.size });
	                document.getElementById('statusArea').innerHTML = '\n                <div id="loading">\n                    <div id="spinner"> \n                        <img src="./img/ring.svg" width="10%"/> \n                    </div>\n                    <div id=\'uploaded\'> \n                        <span id=\'mb\'> 0 </span> / <span> ' + Math.round(undefined.selectedFile.size / 1048576) + 'MB </span> \n                    </div> \n                </div>\n            ';
	            })();
	        } else {
	            alert("Please Select A File");
	        }
	    }
	};

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

	var _chatUtils2 = _interopRequireDefault(_chatUtils);

	var _constants = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_constants.socket.on('updatechat', function (username, data) {
		var li = document.createElement('li');
		li.innerHTML = '(' + _chatUtils2.default.dateGet() + ') ' + username + ':</b> ' + data + ')';
		document.getElementById('conversation').appendChild(li);
	});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _constants = __webpack_require__(2);

	_constants.socket.on('connect', function () {
	   var username = prompt("What's your name: ");
	   document.getElementById('helloID').innerHTML = 'Hello, ' + username;
	   _constants.socket.emit('adduser', username);
	   setInterval(function () {
	      return _constants.socket.emit("::2");
	   }, 15000);
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _chatUtils = __webpack_require__(1);

	var _chatUtils2 = _interopRequireDefault(_chatUtils);

	var _constants = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_constants.socket.on('moreData', function (data) {
	    document.getElementById('mb').innerHTML = '' + Math.round(data.percent / 100.0 * _chatUtils2.default.getselectedFile().size / 1048576);
	    data.place *= 524288;
	    _constants.fileReader.readAsBinaryString(_chatUtils2.default.getselectedFile().slice(data.place, data.place + Math.min(524288, _chatUtils2.default.getselectedFile().size - data.place)));
	});

	_constants.socket.on('done', function (data) {
	    var loading = document.getElementById('loading');

	    var li = document.createElement('li');
	    li.innerHTML = '\n        <span>(' + _chatUtils2.default.dateGet() + ') ' + data.user + ':</span>\n        </b>\n        <a href="/download?name=' + data.link + '" download>\n            <i class="glyphicon glyphicon-file"></i>\n        </a>\n    ';

	    document.getElementById('conversation').appendChild(li);
	    loading.parentNode.removeChild(loading);
	});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _chatUtils = __webpack_require__(1);

	var _chatUtils2 = _interopRequireDefault(_chatUtils);

	var _constants = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_constants.socket.on('updaterooms', function (rooms, current_room) {
	    document.getElementById('rooms').innerHTML = '';

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	        for (var _iterator = rooms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	            var value = _step.value;

	            var li = document.createElement('li');
	            if (value == current_room) {
	                li.innerHTML = '\n            <h4>\n                <i class="glyphicon glyphicon-headphones"></i> ' + value + '\n            </h4>';
	                document.getElementById('rooms').appendChild(li);
	            } else {
	                li.innerHTML = '\n            <h4>\n                <i class="glyphicon glyphicon-headphones"></i> \n                <a href="#"> <span>' + value + '</span> </a>\n            </h4>';
	                document.getElementById('rooms').appendChild(li);
	            }
	        }
	    } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	    } finally {
	        try {
	            if (!_iteratorNormalCompletion && _iterator.return) {
	                _iterator.return();
	            }
	        } finally {
	            if (_didIteratorError) {
	                throw _iteratorError;
	            }
	        }
	    }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _chatUtils = __webpack_require__(1);

	var _chatUtils2 = _interopRequireDefault(_chatUtils);

	var _constants = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	_constants.socket.on('updateusers', function (users) {
	    var userMessages = [];

	    document.getElementById('users').innerHTML = '';

	    var _loop = function _loop(value) {
	        var li = document.createElement("li");
	        li.innerHTML = '\n            <h4>\n                <i class="glyphicon glyphicon-user"></i> <span>' + users[value].name + '</span>\n            </h4>\n        ';
	        document.getElementById('users').appendChild(li);

	        if (users[value].messages.length > 0) {
	            users[value].messages.forEach(function (key) {
	                var li = document.createElement("li");
	                li.innerHTML = '(' + _chatUtils2.default.dateGet(key.date) + ') ' + users[value].name + ' :</b> ' + key.txt;
	                userMessages = [].concat(_toConsumableArray(userMessages), [li]);
	            });
	        }
	    };

	    for (var value in users) {
	        _loop(value);
	    };

	    userMessages.sort().forEach(function (key) {
	        document.getElementById('conversation').appendChild(key);
	    });
	});

/***/ }
/******/ ]);