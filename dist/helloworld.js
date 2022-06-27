/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Renderer.ts":
/*!*************************!*\
  !*** ./src/Renderer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.RenderEngine = exports.Canvas = void 0;\r\n__webpack_require__(/*! ./images */ \"./src/images.ts\");\r\nfunction component() {\r\n    var element = document.createElement('div');\r\n    element.innerHTML =\r\n        \"<div id=\\\"world\\\" style=\\\"height:700px\\\">\\n    <div style=\\\"margin: auto; width:800px; height:700px;\\\">\\n        <canvas  id=\\\"myCanvas\\\" style=\\\"background-color: yellow\\\" width=800px height=700px></canvas>   \\n    </div>\\n   </div>\";\r\n    return element;\r\n}\r\ndocument.body.appendChild(component());\r\nvar Canvas = /** @class */ (function () {\r\n    function Canvas(w, h) {\r\n        this.canvas = document.getElementsByTagName('canvas')[0];\r\n        this.canvas.width = w;\r\n        this.canvas.height = h;\r\n        this.ctx = this.canvas.getContext('2d');\r\n    }\r\n    return Canvas;\r\n}());\r\nexports.Canvas = Canvas;\r\nvar RenderEngine = /** @class */ (function () {\r\n    function RenderEngine(canvas) {\r\n        this.c = canvas.ctx;\r\n    }\r\n    RenderEngine.prototype.render = function (scence) {\r\n        var x;\r\n        for (var _i = 0, _a = scence.instances; _i < _a.length; _i++) {\r\n            x = _a[_i];\r\n            this.renderEntity(x);\r\n        }\r\n    };\r\n    RenderEngine.prototype.renderEntity = function (entity) {\r\n        var x = new Image();\r\n        x.src = entity.image;\r\n        this.c.drawImage(x, entity.x, entity.y, entity.width, entity.height);\r\n    };\r\n    return RenderEngine;\r\n}());\r\nexports.RenderEngine = RenderEngine;\r\n// var x = new Entity(0,0,800,580, '/images/bg.png');\r\n// var y = new Entity(0,580,800,120, '/images/base.png');\r\n// //var z = new Entity(100,200,55,45, './images/birdup.png');\r\n// var a = ['/images/birdup.png', '/images/birddown.png'];\r\n// var z = new Sprite(100,200,65,45, '/images/birdup.png', a);\r\n// var s  = new Scence(\"start\", [x, y, z]);\r\n// var arr : Entity[] = [x, y, z];\r\n// //var r = new RenderEngine(c, s);\r\n// window.onload = function(){\r\n//   // r.render(arr);\r\n//   // r.render();\r\n// }\r\n\n\n//# sourceURL=webpack://flappy-bird/./src/Renderer.ts?");

/***/ }),

/***/ "./src/images.ts":
/*!***********************!*\
  !*** ./src/images.ts ***!
  \***********************/
/***/ (() => {

eval("var bg = new Image();\r\nbg.src = '/images/bg.png';\r\nvar base = new Image();\r\nbase.src = '/images/base.png';\r\nvar birdup = new Image();\r\nbirdup.src = './images/birdup.png';\r\nvar birddown = new Image();\r\nbirddown.src = './images/birddown.png';\r\n\n\n//# sourceURL=webpack://flappy-bird/./src/images.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/Renderer.ts");
/******/ 	
/******/ })()
;