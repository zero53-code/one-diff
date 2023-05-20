/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/index.js":
/*!***********************!*\
  !*** ./dist/index.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst VNode_1 = __webpack_require__(/*! ./vdom/VNode */ \"./dist/vdom/VNode.js\");\r\nlet vnode1 = VNode_1.VElement.create(\"div\", { class: \"DIV1\", style: { color: \"red\" } });\r\nvnode1.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点\");\r\nvnode1.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点\");\r\nvnode1.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点\");\r\nvnode1.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点\");\r\nvnode1.addChildTextNode(\"这是文本节点1\");\r\nvnode1.addChildTextNode(\"这是文本节点2\");\r\nvnode1.addChildTextNode(\"这是文本节点3\");\r\nvnode1.addChildTextNode(\"这是文本节点4\");\r\nconsole.log(vnode1);\r\n(0, VNode_1.render)(vnode1, document.getElementById(\"root\"));\r\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://lily/./dist/index.js?");

/***/ }),

/***/ "./dist/vdom/VNode.js":
/*!****************************!*\
  !*** ./dist/vdom/VNode.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.render = exports.VTextNode = exports.VElement = void 0;\r\n/**\r\n * 虚拟 DOM 元素类\r\n */\r\nclass VElement {\r\n    constructor(name, props, parentNode, childNodes) {\r\n        this.name = name;\r\n        this.props = props;\r\n        this.parentNode = parentNode == undefined\r\n            ? null\r\n            : parentNode;\r\n        this.childNodes = childNodes == undefined\r\n            ? []\r\n            : childNodes;\r\n    }\r\n    /**\r\n     * 工厂方法创建一个虚拟节点\r\n     * @param name 虚拟节点的标签名\r\n     * @param props 虚拟节点的属性\r\n     * @returns 新建的虚拟节点\r\n     */\r\n    static create(name, props) {\r\n        let newVNode = new VElement(name, props);\r\n        newVNode.parentNode = null;\r\n        newVNode.childNodes = [];\r\n        return newVNode;\r\n    }\r\n    addChildElementNode(name, props) {\r\n        let newChildNode = VElement.create(name, props);\r\n        newChildNode.parentNode = this;\r\n        this.childNodes.push(newChildNode);\r\n        return newChildNode;\r\n    }\r\n    addChildTextNode(text) {\r\n        let newTextNode = VTextNode.create(text, this);\r\n        this.childNodes.push(newTextNode);\r\n        return newTextNode;\r\n    }\r\n    getTagName() {\r\n        return this.name;\r\n    }\r\n    getTagProps() {\r\n        return this.props;\r\n    }\r\n    getChildNodes() {\r\n        // 返回子节点数组的副本，防止在外部修改数组\r\n        return this.childNodes.slice();\r\n    }\r\n    getParentNode() {\r\n        return this.parentNode;\r\n    }\r\n}\r\nexports.VElement = VElement;\r\n/**\r\n * 虚拟文本节点\r\n */\r\nclass VTextNode {\r\n    constructor(text, parentNode) {\r\n        this.text = text;\r\n        this.parentNode = parentNode;\r\n    }\r\n    getText() {\r\n        return this.text;\r\n    }\r\n    static create(text, parentNode) {\r\n        return new VTextNode(text, parentNode);\r\n    }\r\n    getParentNode() {\r\n        return this.parentNode;\r\n    }\r\n}\r\nexports.VTextNode = VTextNode;\r\n/**\r\n * 将虚拟节点渲染到真实 DOM 元素上\r\n * @param vnode 需要渲染的虚拟节点\r\n * @param target 渲染目标\r\n * @returns 渲染得到的真实 DOM 节点\r\n */\r\nfunction render(vnode, target) {\r\n    // 清空目标元素的内容\r\n    // target.innerHTML = '';\r\n    if (vnode instanceof VTextNode) {\r\n        // 虚拟文本节点\r\n        let vTextNode = vnode;\r\n        let textNode = document.createTextNode(vTextNode.text);\r\n        target.appendChild(textNode);\r\n        return textNode;\r\n    }\r\n    else if (vnode instanceof VElement) {\r\n        // 虚拟元素节点\r\n        let vElement = vnode;\r\n        let element = document.createElement(vElement.getTagName());\r\n        renderProps(element, vElement.getTagProps());\r\n        target.appendChild(element);\r\n        for (let childNode of vElement.childNodes) {\r\n            render(childNode, element);\r\n        }\r\n        return element;\r\n    }\r\n    throw new Error('unknown node type');\r\n}\r\nexports.render = render;\r\nfunction renderProps(element, props) {\r\n    for (const key in props) {\r\n        if (Object.prototype.hasOwnProperty.call(props, key)) {\r\n            if (key === 'style') {\r\n                renderStyles(element, props[key]);\r\n            }\r\n            else if (props[key] instanceof Object) {\r\n                element.setAttribute(key, JSON.stringify(props[key]));\r\n            }\r\n            else {\r\n                element.setAttribute(key, props[key]);\r\n            }\r\n        }\r\n    }\r\n    return element;\r\n}\r\nfunction renderStyles(element, styles) {\r\n    for (const key in styles) {\r\n        if (Object.prototype.hasOwnProperty.call(styles, key)) {\r\n            element.style.setProperty(key, styles[key]);\r\n        }\r\n    }\r\n    return element;\r\n}\r\n//# sourceMappingURL=VNode.js.map\n\n//# sourceURL=webpack://lily/./dist/vdom/VNode.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/index.js");
/******/ 	
/******/ })()
;