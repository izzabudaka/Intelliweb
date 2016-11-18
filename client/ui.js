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

	var _CardBar = __webpack_require__(1);

	var _CardBar2 = _interopRequireDefault(_CardBar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CardBar = function (_React$Component) {
	  _inherits(CardBar, _React$Component);

	  function CardBar(props) {
	    _classCallCheck(this, CardBar);

	    return _possibleConstructorReturn(this, (CardBar.__proto__ || Object.getPrototypeOf(CardBar)).call(this, props));
	  }

	  _createClass(CardBar, [{
	    key: "render",
	    value: function render() {
	      var rootStyle = {
	        height: this.props.height + "px"
	      };
	      console.log(this.props.height);
	      var heights = [];
	      for (var i = 0; i < this.props.height / 200; i++) {
	        heights.push(React.createElement("div", { style: { height: "200px", borderBottom: "1px solid lightgray" } }));
	      }
	      var remainder = this.props.height % 200;
	      if (remainder > 0) heights.push(React.createElement("div", { style: { height: remainder + "px" } }));
	      this.props.loaded(this);
	      return React.createElement(
	        "div",
	        { style: { overflowY: "scroll" } },
	        React.createElement(
	          "div",
	          { style: rootStyle },
	          heights
	        )
	      );
	    }
	  }, {
	    key: "updateScrollPosition",
	    value: function updateScrollPosition(value) {
	      if (ReactDOM.findDOMNode(this) != undefined) {
	        console.log(ReactDOM.findDOMNode(this).scrollTop);
	        console.log(value);
	        ReactDOM.findDOMNode(this).scrollTop = value + "px";
	      }
	    }
	  }]);

	  return CardBar;
	}(React.Component);

	window.CardBar = CardBar;

/***/ }
/******/ ]);