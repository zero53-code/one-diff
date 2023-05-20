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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst VNode_1 = __webpack_require__(/*! ./vdom/VNode */ \"./dist/vdom/VNode.js\");\nlet vnode1 = VNode_1.VElement.create(\"div\", { class: \"DIV222\", style: { color: \"red\" } });\nvnode1.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点\");\nvnode1.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点\");\nvnode1.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点\");\nvnode1.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点\");\nvnode1.addChildTextNode(\"这是文本节点1\");\nvnode1.addChildTextNode(\"这是文本节点2\");\nvnode1.addChildTextNode(\"这是文本节点3\");\nvnode1.addChildTextNode(\"这是文本节点4\");\nconsole.log(vnode1);\n(0, VNode_1.render)(vnode1, document.getElementById(\"root\"));\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://lily/./dist/index.js?");

/***/ }),

/***/ "./dist/vdom/VNode.js":
/*!****************************!*\
  !*** ./dist/vdom/VNode.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.render = exports.VTextNode = exports.VElement = void 0;\n/**\n * 虚拟 DOM 元素类\n */\nclass VElement {\n    constructor(name, props, parentNode, childNodes) {\n        this.name = name;\n        this.props = props;\n        this.parentNode = parentNode == undefined\n            ? null\n            : parentNode;\n        this.childNodes = childNodes == undefined\n            ? []\n            : childNodes;\n    }\n    /**\n     * 工厂方法创建一个虚拟节点\n     * @param name 虚拟节点的标签名\n     * @param props 虚拟节点的属性\n     * @returns 新建的虚拟节点\n     */\n    static create(name, props) {\n        let newVNode = new VElement(name, props);\n        newVNode.parentNode = null;\n        newVNode.childNodes = [];\n        return newVNode;\n    }\n    addChildElementNode(name, props) {\n        let newChildNode = VElement.create(name, props);\n        newChildNode.parentNode = this;\n        this.childNodes.push(newChildNode);\n        return newChildNode;\n    }\n    addChildTextNode(text) {\n        let newTextNode = VTextNode.create(text, this);\n        this.childNodes.push(newTextNode);\n        return newTextNode;\n    }\n    getTagName() {\n        return this.name;\n    }\n    getTagProps() {\n        return this.props;\n    }\n    getChildNodes() {\n        // 返回子节点数组的副本，防止在外部修改数组\n        return this.childNodes.slice();\n    }\n    getParentNode() {\n        return this.parentNode;\n    }\n}\nexports.VElement = VElement;\n/**\n * 虚拟文本节点\n */\nclass VTextNode {\n    constructor(text, parentNode) {\n        this.text = text;\n        this.parentNode = parentNode;\n    }\n    getText() {\n        return this.text;\n    }\n    static create(text, parentNode) {\n        return new VTextNode(text, parentNode);\n    }\n    getParentNode() {\n        return this.parentNode;\n    }\n}\nexports.VTextNode = VTextNode;\n/**\n * 将虚拟节点渲染到真实 DOM 元素上\n * @param vnode 需要渲染的虚拟节点\n * @param target 渲染目标\n * @returns 渲染得到的真实 DOM 节点\n */\nfunction render(vnode, target) {\n    // 清空目标元素的内容\n    // target.innerHTML = '';\n    if (vnode instanceof VTextNode) {\n        // 虚拟文本节点\n        let vTextNode = vnode;\n        let textNode = document.createTextNode(vTextNode.text);\n        target.appendChild(textNode);\n        return textNode;\n    }\n    else if (vnode instanceof VElement) {\n        // 虚拟元素节点\n        let vElement = vnode;\n        let element = document.createElement(vElement.getTagName());\n        renderProps(element, vElement.getTagProps());\n        target.appendChild(element);\n        for (let childNode of vElement.childNodes) {\n            render(childNode, element);\n        }\n        return element;\n    }\n    throw new Error('unknown node type');\n}\nexports.render = render;\nfunction renderProps(element, props) {\n    for (const key in props) {\n        if (Object.prototype.hasOwnProperty.call(props, key)) {\n            if (key === 'style') {\n                renderStyles(element, props[key]);\n            }\n            else if (props[key] instanceof Object) {\n                element.setAttribute(key, JSON.stringify(props[key]));\n            }\n            else {\n                element.setAttribute(key, props[key]);\n            }\n        }\n    }\n    return element;\n}\nfunction renderStyles(element, styles) {\n    for (const key in styles) {\n        if (Object.prototype.hasOwnProperty.call(styles, key)) {\n            element.style.setProperty(key, styles[key]);\n        }\n    }\n    return element;\n}\n//# sourceMappingURL=VNode.js.map\n\n//# sourceURL=webpack://lily/./dist/vdom/VNode.js?");

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