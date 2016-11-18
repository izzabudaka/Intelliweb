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

	var _Card = __webpack_require__(1);

	var _Card2 = _interopRequireDefault(_Card);

	var _Stash = __webpack_require__(13);

	var _Stash2 = _interopRequireDefault(_Stash);

	var _Navigator = __webpack_require__(2);

	var _Navigator2 = _interopRequireDefault(_Navigator);

	var _CardBar = __webpack_require__(3);

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
	                overflowY: "scroll",
	                display: "inline-block",
	                position: "relative"
	            };

	            // let cardData = [
	            //     {type:2,payload:{url:"https://assets-cdn.github.com/images/modules/open_graph/github-mark.png",icon:true}},
	            //     {type:0,payload:{text:"Project X"}},
	            //     {type:1,payload:{title:"Stars",subtitle:"585"}},
	            //     {type:1,payload:{title:"Forks",subtitle:"111"}},
	            //     {type:1,payload:{title:"Description",subtitle:"This project is about skjdnakjbdalsbndjabsjdhbasdh dajabssdkbahsdhkasb dhjashjd ashb asjhb jas"}},
	            //     {type:3,payload:{text:"See repo", url:"http://github.com"}},
	            //     {type:2,payload:{url:"http://i2.mirror.co.uk/incoming/article8075004.ece/ALTERNATES/s615b/Harambe.jpg",icon:false}},
	            // ];

	            var elements = this.props.data.map(function (x) {
	                return Card.getElement(x.type, x.payload);
	            }.bind(this));

	            return React.createElement(
	                "div",
	                { style: rootStyle },
	                elements,
	                React.createElement(
	                    "span",
	                    { style: {
	                            display: "inline-block",
	                            position: "absolute",
	                            top: "5px", right: "0px", width: "30px", height: "30px", textAlign: "center", cursor: "pointer"
	                        }, onClick: this.stash.bind(this) },
	                    "\u2606"
	                )
	            );
	        }
	    }, {
	        key: "stash",
	        value: function stash(e) {
	            e.target.remove();
	            if (window.stashed_items == undefined) {
	                window.stashed_items = [this.props.data];
	            } else {
	                window.stashed_items.push(this.props.data);
	            }
	        }
	    }, {
	        key: "onURLClicked",
	        value: function onURLClicked(url) {
	            this.props.onURLClicked(url);
	        }
	    }], [{
	        key: "hashCode",
	        value: function hashCode(str) {
	            if (str == undefined) return;
	            return str.split('').reduce(function (prevHash, currVal) {
	                return (prevHash << 5) - prevHash + currVal.charCodeAt(0);
	            }, 0);
	        }
	    }, {
	        key: "getElement",
	        value: function getElement(type, payload) {
	            var _this2 = this;

	            var key = Card.hashCode(JSON.stringify(payload));
	            if (type == 0) {
	                return React.createElement(
	                    "h1",
	                    { key: key, style: {
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
	                    { key: key },
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
	            } else if (type == 2 && payload["icon"] == true) {
	                return React.createElement(
	                    "div",
	                    { key: key, style: {
	                            width: "100%", textAlign: "center",
	                            paddingTop: "5px"
	                        } },
	                    React.createElement("img", { style: {
	                            maxHeight: "60px", maxWidth: "60px", display: "inline-block"
	                        }, src: payload["url"] })
	                );
	            } else if (type == 2) {
	                return React.createElement(
	                    "div",
	                    { key: key, style: {
	                            width: "100%", textAlign: "center",
	                            marginBottom: "5px"
	                        } },
	                    React.createElement("img", { style: {
	                            width: "180px", maxWidth: "180px", display: "inline-block"
	                        }, src: payload["url"] })
	                );
	            } else if (type == 3) {
	                return React.createElement(
	                    "div",
	                    { key: key, style: {
	                            marginTop: "5px",
	                            marginBottom: "5px",
	                            marginLeft: "5px",
	                            marginRight: "5px",
	                            borderRadius: "5px",
	                            border: "1px solid rgba(0,0,0,0.05)",
	                            cursor: "pointer"
	                        }, onClick: function onClick() {
	                            return _this2.onURLClicked(payload["url"]);
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
	                        payload["name"]
	                    )
	                );
	            }
	        }
	    }]);

	    return Card;
	}(React.Component);

	window.Card = Card;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Navigator = function (_React$Component) {
	  _inherits(Navigator, _React$Component);

	  function Navigator(props) {
	    _classCallCheck(this, Navigator);

	    return _possibleConstructorReturn(this, (Navigator.__proto__ || Object.getPrototypeOf(Navigator)).call(this, props));
	  }

	  _createClass(Navigator, [{
	    key: "render",
	    value: function render() {
	      var rootStyle = {
	        position: "relative", width: "100%", height: "100%"
	      };
	      var inputHolderStyle = {
	        position: "absolute",
	        left: "100px", top: "6px", bottom: "11px", right: "100px",
	        borderRadius: "10px", border: "1px solid rgba(0,0,0,0.03)"
	      };
	      var inputStyle = {
	        width: "100%",
	        height: "100%",
	        background: "rgba(0,0,0,0.03)",
	        paddingRight: "10px"
	      };
	      console.log("rendering:" + this.props.url);
	      return React.createElement(
	        "div",
	        { style: rootStyle },
	        React.createElement(
	          "div",
	          { style: inputHolderStyle },
	          React.createElement("input", { style: inputStyle, defaultValue: this.props.url })
	        ),
	        React.createElement(
	          "span",
	          { style: {
	              display: "inline-block",
	              position: "absolute", fontSize: "15pt",
	              top: "5px", right: "15px", width: "30px", height: "30px", textAlign: "center", cursor: "pointer",
	              borderRadius: "5px", border: "1px solid rgba(0,0,0,0.05)"
	            }, onClick: this.openStash.bind(this) },
	          "\u2606"
	        )
	      );
	    }
	  }, {
	    key: "openStash",
	    value: function openStash() {
	      this.props.openStash();
	    }
	  }]);

	  return Navigator;
	}(React.Component);

	window.Navigator = Navigator;

/***/ },
/* 3 */
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
	      var _this2 = this;

	      var rootStyle = {
	        height: this.props.height + "px"
	      };
	      var heights = [];
	      console.log(this.props.height / 250);
	      // for(var i = 0; i < this.props.height / 250;i++){
	      //   heights.push(<div style={{width:"100%",overflow:"scroll"}}><div style={{height:"250px",width:"750px"}}>
	      //     <window.Card onURLClicked={(url)=>this.props.onURLClicked(url)}/>
	      //     <window.Card onURLClicked={(url)=>this.props.onURLClicked(url)}/>
	      //     <window.Card onURLClicked={(url)=>this.props.onURLClicked(url)}/>
	      //   </div></div>)
	      // }
	      // let remainder = (this.props.height % 250);
	      // if(remainder > 0) heights.push(<div style={{height:remainder+"px"}}/>);
	      // this.props.loaded(this);
	      for (var i = 0; i < this.props.height / 250; i++) {
	        var cards = [];
	        if (this.props.buckets[i] != undefined) {
	          this.props.buckets[i].forEach(function (data) {
	            return cards.push(React.createElement(window.Card, { data: data, onURLClicked: function onURLClicked(url) {
	                return _this2.props.onURLClicked(url);
	              } }));
	          });
	        }
	        heights.push(React.createElement(
	          "div",
	          { style: { width: "100%", overflow: "scroll" } },
	          React.createElement(
	            "div",
	            { style: { height: "250px", width: "1500px" } },
	            cards
	          )
	        ));
	      }

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
	        // console.log(ReactDOM.findDOMNode(this).scrollTop);
	        // console.log(value);
	        ReactDOM.findDOMNode(this).scrollTop = value + "px";
	      }
	    }
	  }]);

	  return CardBar;
	}(React.Component);

	window.CardBar = CardBar;

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Stash = function (_React$Component) {
	  _inherits(Stash, _React$Component);

	  function Stash(props) {
	    _classCallCheck(this, Stash);

	    return _possibleConstructorReturn(this, (Stash.__proto__ || Object.getPrototypeOf(Stash)).call(this, props));
	  }

	  _createClass(Stash, [{
	    key: "render",
	    value: function render() {
	      var rootStyle = {};
	      var items = window.stashed_items.map(function (item) {
	        return React.createElement(window.Card, { data: item });
	      });
	      return React.createElement(
	        "div",
	        { style: rootStyle },
	        items
	      );
	    }
	  }]);

	  return Stash;
	}(React.Component);

	window.Stash = Stash;

/***/ }
/******/ ]);