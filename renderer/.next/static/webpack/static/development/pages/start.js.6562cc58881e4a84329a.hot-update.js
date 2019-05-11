webpackHotUpdate("static\\development\\pages\\start.js",{

/***/ "./pages/start.js":
/*!************************!*\
  !*** ./pages/start.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _default; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "../node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "../node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "../node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "../node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/assertThisInitialized */ "../node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "../node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "../node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! styled-jsx/style */ "../node_modules/styled-jsx/style.js");
/* harmony import */ var styled_jsx_style__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(styled_jsx_style__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);











var _default =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(_default, _Component);

  function _default() {
    var _getPrototypeOf2;

    var _this;

    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, _default);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, (_getPrototypeOf2 = Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(_default)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "state", {
      input: '',
      message: null
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "handleMessage", function (event, message) {
      // receive a message from the main process and save it in the local state
      _this.setState({
        message: message
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "handleChange", function (event) {
      _this.setState({
        input: event.target.value
      });
    });

    Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_6__["default"])(Object(_babel_runtime_corejs2_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__["default"])(_this), "handleSubmit", function (event) {
      event.preventDefault();
      global.ipcRenderer.send('message', _this.state.input);

      _this.setState({
        message: null
      });
    });

    return _this;
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(_default, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // start listening the channel message
      global.ipcRenderer.on('message', this.handleMessage);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // stop listening the channel message
      global.ipcRenderer.removeListener('message', this.handleMessage);
    }
  }, {
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("div", {
        className: "jsx-1912268166"
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("h1", {
        className: "jsx-1912268166"
      }, "Hello Electron!"), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("img", {
        src: "/static/manasymbols/UB.svg",
        alt: "static test",
        className: "jsx-1912268166"
      }), this.state.message && react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("p", {
        className: "jsx-1912268166"
      }, this.state.message), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("form", {
        onSubmit: this.handleSubmit,
        className: "jsx-1912268166"
      }, react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement("input", {
        type: "text",
        onChange: this.handleChange,
        className: "jsx-1912268166"
      })), react__WEBPACK_IMPORTED_MODULE_8___default.a.createElement(styled_jsx_style__WEBPACK_IMPORTED_MODULE_7___default.a, {
        id: "1912268166"
      }, "h1.jsx-1912268166{color:red;font-size:50px;}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcTWFya1xcRGVza3RvcFxcY29kZVxcbXRnYS1wYXRod2F5XFxyZW5kZXJlclxccGFnZXNcXHN0YXJ0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRDb0IsQUFHdUIsVUFDSyxlQUNqQiIsImZpbGUiOiJDOlxcVXNlcnNcXE1hcmtcXERlc2t0b3BcXGNvZGVcXG10Z2EtcGF0aHdheVxccmVuZGVyZXJcXHBhZ2VzXFxzdGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIHN0YXRlID0ge1xyXG4gICAgaW5wdXQ6ICcnLFxyXG4gICAgbWVzc2FnZTogbnVsbFxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xyXG4gICAgLy8gc3RhcnQgbGlzdGVuaW5nIHRoZSBjaGFubmVsIG1lc3NhZ2VcclxuICAgIGdsb2JhbC5pcGNSZW5kZXJlci5vbignbWVzc2FnZScsIHRoaXMuaGFuZGxlTWVzc2FnZSlcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50ICgpIHtcclxuICAgIC8vIHN0b3AgbGlzdGVuaW5nIHRoZSBjaGFubmVsIG1lc3NhZ2VcclxuICAgIGdsb2JhbC5pcGNSZW5kZXJlci5yZW1vdmVMaXN0ZW5lcignbWVzc2FnZScsIHRoaXMuaGFuZGxlTWVzc2FnZSlcclxuICB9XHJcblxyXG4gIGhhbmRsZU1lc3NhZ2UgPSAoZXZlbnQsIG1lc3NhZ2UpID0+IHtcclxuICAgIC8vIHJlY2VpdmUgYSBtZXNzYWdlIGZyb20gdGhlIG1haW4gcHJvY2VzcyBhbmQgc2F2ZSBpdCBpbiB0aGUgbG9jYWwgc3RhdGVcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBtZXNzYWdlIH0pXHJcbiAgfVxyXG5cclxuICBoYW5kbGVDaGFuZ2UgPSBldmVudCA9PiB7XHJcbiAgICB0aGlzLnNldFN0YXRlKHsgaW5wdXQ6IGV2ZW50LnRhcmdldC52YWx1ZSB9KVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlU3VibWl0ID0gZXZlbnQgPT4ge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgZ2xvYmFsLmlwY1JlbmRlcmVyLnNlbmQoJ21lc3NhZ2UnLCB0aGlzLnN0YXRlLmlucHV0KVxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IG1lc3NhZ2U6IG51bGwgfSlcclxuICB9XHJcblxyXG4gIHJlbmRlciAoKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8ZGl2PlxyXG4gICAgICAgIDxoMT5IZWxsbyBFbGVjdHJvbiE8L2gxPlxyXG4gICAgICAgIDxpbWcgc3JjPScvc3RhdGljL21hbmFzeW1ib2xzL1VCLnN2ZycgYWx0PVwic3RhdGljIHRlc3RcIi8+XHJcbiAgICAgICAge3RoaXMuc3RhdGUubWVzc2FnZSAmJiA8cD57dGhpcy5zdGF0ZS5tZXNzYWdlfTwvcD59XHJcblxyXG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT0ndGV4dCcgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfSAvPlxyXG4gICAgICAgIDwvZm9ybT5cclxuXHJcbiAgICAgICAgPHN0eWxlIGpzeD57YFxyXG4gICAgICAgICAgaDEge1xyXG4gICAgICAgICAgICBjb2xvcjogcmVkO1xyXG4gICAgICAgICAgICBmb250LXNpemU6IDUwcHg7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgYH08L3N0eWxlPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIClcclxuICB9XHJcbn0iXX0= */\n/*@ sourceURL=C:\\Users\\Mark\\Desktop\\code\\mtga-pathway\\renderer\\pages\\start.js */"));
    }
  }]);

  return _default;
}(react__WEBPACK_IMPORTED_MODULE_8__["Component"]);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ })

})
//# sourceMappingURL=start.js.6562cc58881e4a84329a.hot-update.js.map