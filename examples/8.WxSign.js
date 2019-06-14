webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(267);


/***/ }),

/***/ 267:
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
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by dxc on 2016/10/30.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */
	
	
	var WopSignExamples = function (_Component) {
	    _inherits(WopSignExamples, _Component);
	
	    function WopSignExamples() {
	        _classCallCheck(this, WopSignExamples);
	
	        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	    }
	
	    WopSignExamples.prototype.render = function render() {
	        return _react2.default.createElement(
	            _wxjs.WxSign,
	            {
	                url: 'http://21.net.fangstar.net/wx-base/',
	                wx_app_id: 'wx5f069426b7e49373',
	                debug: true,
	                ready: function ready(wx) {
	                    // wx.xxx
	                    console.log('微信签名完成');
	                }
	            },
	            _react2.default.createElement(
	                'div',
	                null,
	                '\u5FAE\u4FE1\u7B7E\u540D\u5B8C\u6210\uFF01'
	            )
	        );
	    };
	
	    return WopSignExamples;
	}(_react.Component);
	
	_reactDom2.default.render(_react2.default.createElement(WopSignExamples, null), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=8.WxSign.js.map