webpackJsonp([6],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(266);


/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(41);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _wxjs = __webpack_require__(188);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by dxc on 2016/10/29.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var WopLoginExamples = function (_Component) {
	    _inherits(WopLoginExamples, _Component);
	
	    function WopLoginExamples() {
	        _classCallCheck(this, WopLoginExamples);
	
	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }
	
	    WopLoginExamples.prototype.render = function render() {
	        return _react2.default.createElement(
	            _wxjs.WxLogin,
	            {
	                url: 'http://21.net.fangstar.net/wx-base/',
	                app_key: 'abc123',
	                is_get_user_info: true,
	                userInfo: function userInfo(user) {
	                    console.log(user);
	                }
	            },
	            _react2.default.createElement(
	                'div',
	                null,
	                '\u5FAE\u4FE1\u767B\u5F55\u6210\u529F\uFF01'
	            )
	        );
	    };
	
	    return WopLoginExamples;
	}(_react.Component);
	
	_reactDom2.default.render(_react2.default.createElement(WopLoginExamples, null), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=7.WxLogin.js.map