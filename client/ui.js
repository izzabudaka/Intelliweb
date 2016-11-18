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

	var _Card = __webpack_require__(2);

	var _Card2 = _interopRequireDefault(_Card);

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
	      for (var i = 0; i < this.props.height / 250; i++) {
	        heights.push(React.createElement(
	          "div",
	          { style: { height: "250px" } },
	          React.createElement(window.Card, null)
	        ));
	      }
	      var remainder = this.props.height % 250;
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Card = function (_React$Component) {
	    _inherits(Card, _React$Component);

	    function Card(props) {
	        _classCallCheck(this, Card);

	        return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));
	    }

	    _createClass(Card, [{
	        key: "render",
	        value: function render() {
	            var rootStyle = {
	                width: "180px",
	                height: "230px",
	                borderRadius: "10px",
	                border: "1px solid rgba(0,0,0,0.05)",
	                margin: "10px",
	                background: "white",
	                overflowY: "scroll"
	            };

	            var cardData = [{ type: 2, payload: { url: "https://assets-cdn.github.com/images/modules/open_graph/github-mark.png" } }, { type: 0, payload: { text: "Project X" } }, { type: 1, payload: { title: "Stars", subtitle: "585" } }, { type: 1, payload: { title: "Description", subtitle: "This project is about skjdnakjbdalsbndjabsjdhbasdh dajabssdkbahsdhkasb dhjashjd ashb asjhb jas" } }, { type: 3, payload: { text: "See repo", url: "http://github.com" } }, { type: 3, payload: { text: "Star this", url: "http://github.com" } }];

	            var elements = cardData.map(function (x) {
	                return this.getElement(x.type, x.payload);
	            }.bind(this));

	            return React.createElement(
	                "div",
	                { style: rootStyle },
	                elements
	            );
	        }
	    }, {
	        key: "getElement",
	        value: function getElement(type, payload) {
	            if (type == 0) {
	                return React.createElement(
	                    "h1",
	                    { style: {
	                            margin: "0px",
	                            textAlign: "center",
	                            padding: "5px",
	                            paddingTop: "8px",
	                            paddingBottom: "8px",
	                            fontSize: "11pt",
	                            background: "rgba(0,0,0,0.00)", fontWeight: "400", borderBottom: "1px solid rgba(0,0,0,0.05)"
	                        } },
	                    payload["text"]
	                );
	            } else if (type == 1) {
	                return React.createElement(
	                    "div",
	                    null,
	                    React.createElement(
	                        "h1",
	                        { style: {
	                                margin: "8px",
	                                fontSize: "9pt", fontWeight: "400"
	                            } },
	                        payload["title"]
	                    ),
	                    React.createElement(
	                        "h2",
	                        { style: {
	                                margin: "8px",
	                                fontSize: "8pt",
	                                color: 'gray',
	                                wordWrap: "break-word"
	                            } },
	                        payload["subtitle"]
	                    )
	                );
	            } else if (type == 2) {
	                return React.createElement(
	                    "div",
	                    { style: {
	                            width: "100%", textAlign: "center",
	                            paddingTop: "5px"
	                        } },
	                    React.createElement("img", { style: {
	                            maxHeight: "60px", maxWidth: "60px", display: "inline-block"
	                        }, src: payload["url"] })
	                );
	            } else if (type == 3) {
	                return React.createElement(
	                    "div",
	                    { style: {
	                            marginTop: "5px",
	                            marginBottom: "5px",
	                            marginLeft: "5px",
	                            marginRight: "5px",
	                            borderRadius: "5px",
	                            border: "1px solid rgba(0,0,0,0.05)",
	                            cursor: "pointer"
	                        } },
	                    React.createElement(
	                        "h1",
	                        { style: {
	                                margin: "0px",
	                                textAlign: "center",
	                                padding: "5px",
	                                paddingTop: "8px",
	                                paddingBottom: "8px",
	                                fontSize: "11pt",
	                                background: "rgba(0,0,0,0.00)", fontWeight: "400", borderBottom: "1px solid rgba(0,0,0,0.025)"
	                            } },
	                        payload["text"]
	                    )
	                );
	            }
	        }
	    }]);

	    return Card;
	}(React.Component);

	window.Card = Card;

/***/ }
/******/ ]);