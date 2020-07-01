webpackHotUpdate("static/development/pages/signup.js",{

/***/ "./pages/services/rest.js":
/*!********************************!*\
  !*** ./pages/services/rest.js ***!
  \********************************/
/*! exports provided: post */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"post\", function() { return post; });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./error */ \"./pages/services/error.js\");\n\n\nvar instance = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({\n  baseURL: 'http://localhost:1323'\n});\nvar post = function post(url, data) {\n  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, data)[\"catch\"](_error__WEBPACK_IMPORTED_MODULE_1__[\"catchAxiosError\"]);\n};\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports_1 = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports_1;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9zZXJ2aWNlcy9yZXN0LmpzP2IzNDYiXSwibmFtZXMiOlsiaW5zdGFuY2UiLCJheGlvcyIsImNyZWF0ZSIsImJhc2VVUkwiLCJwb3N0IiwidXJsIiwiZGF0YSIsImNhdGNoQXhpb3NFcnJvciJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFHQSxJQUFNQSxRQUFRLEdBQUdDLDRDQUFLLENBQUNDLE1BQU4sQ0FBYTtBQUM1QkMsU0FBTyxFQUFFO0FBRG1CLENBQWIsQ0FBakI7QUFJTyxJQUFNQyxJQUFJLEdBQUcsU0FBUEEsSUFBTyxDQUFDQyxHQUFELEVBQU1DLElBQU4sRUFBZTtBQUNqQyxTQUFPTCw0Q0FBSyxDQUFDRyxJQUFOLENBQVdDLEdBQVgsRUFBZ0JDLElBQWhCLFdBQTRCQyxzREFBNUIsQ0FBUDtBQUNELENBRk0iLCJmaWxlIjoiLi9wYWdlcy9zZXJ2aWNlcy9yZXN0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xuaW1wb3J0IHsgY2F0Y2hBeGlvc0Vycm9yIH0gZnJvbSBcIi4vZXJyb3JcIjtcblxuXG5jb25zdCBpbnN0YW5jZSA9IGF4aW9zLmNyZWF0ZSh7XG4gIGJhc2VVUkw6ICdodHRwOi8vbG9jYWxob3N0OjEzMjMnXG59KTtcblxuZXhwb3J0IGNvbnN0IHBvc3QgPSAodXJsLCBkYXRhKSA9PiB7XG4gIHJldHVybiBheGlvcy5wb3N0KHVybCwgZGF0YSkuY2F0Y2goY2F0Y2hBeGlvc0Vycm9yKVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/services/rest.js\n");

/***/ })

})