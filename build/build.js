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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst VNode_1 = __webpack_require__(/*! ./vdom/VNode */ \"./dist/vdom/VNode.js\");\nconst Change_1 = __webpack_require__(/*! ./vdom/diff/Change */ \"./dist/vdom/diff/Change.js\");\nlet vnode1 = VNode_1.VElement.create(\"div\", { class: \"DIV1111\", style: { color: \"red\" } });\nvnode1.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点1\");\nvnode1.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点2\");\nvnode1.addChildTextNode(\"这是文本节点3\");\nvnode1.addChildTextNode(\"这是文本节点4\");\nlet vnode2 = VNode_1.VElement.create(\"div\", { class: \"DIV2222\", style: { color: \"green\" } });\nvnode2.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点A\");\nvnode2.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点B\");\nvnode2.addChildTextNode(\"这是文本节点C\");\nvnode2.addChildTextNode(\"这是文本节点D\");\nconsole.log(vnode1);\nlet node1 = (0, VNode_1.renderTo)(vnode1, document.getElementById(\"root1\"));\nlet node2 = (0, VNode_1.renderTo)(vnode2, document.getElementById(\"root2\"));\n// 移除最后一个子节点\nlet change1 = new Change_1.RemoveLastChildNodeChange(node1);\nconsole.log(change1.apply());\n// 移除第一个子节点\nlet change2 = new Change_1.RemoveFirstChildNodeChange(node2);\nconsole.log(change2.apply());\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://lily/./dist/index.js?");

/***/ }),

/***/ "./dist/vdom/VNode.js":
/*!****************************!*\
  !*** ./dist/vdom/VNode.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.render = exports.renderTo = exports.VTextNode = exports.VElement = void 0;\n/**\n * 虚拟 DOM 元素类\n */\nclass VElement {\n    constructor(name, props, parentNode, childNodes) {\n        this.name = name;\n        this.props = props;\n        this.parentNode = parentNode == undefined\n            ? null\n            : parentNode;\n        this.childNodes = childNodes == undefined\n            ? []\n            : childNodes;\n        this.node = null;\n    }\n    /**\n     * 工厂方法创建一个虚拟节点\n     * @param name 虚拟节点的标签名\n     * @param props 虚拟节点的属性\n     * @returns 新建的虚拟节点\n     */\n    static create(name, props) {\n        let newVNode = new VElement(name, props);\n        newVNode.parentNode = null;\n        newVNode.childNodes = [];\n        return newVNode;\n    }\n    getNode() {\n        return this.node;\n    }\n    addChildElementNode(name, props) {\n        let newChildNode = VElement.create(name, props);\n        newChildNode.parentNode = this;\n        this.childNodes.push(newChildNode);\n        return newChildNode;\n    }\n    addChildTextNode(text) {\n        let newTextNode = VTextNode.create(text, this);\n        this.childNodes.push(newTextNode);\n        return newTextNode;\n    }\n    getTagName() {\n        return this.name;\n    }\n    getTagProps() {\n        return this.props;\n    }\n    getChildVNodes() {\n        // 返回子节点数组的副本，防止在外部修改数组\n        return this.childNodes.slice();\n    }\n    getParentVNode() {\n        return this.parentNode;\n    }\n}\nexports.VElement = VElement;\n/**\n * 虚拟文本节点\n */\nclass VTextNode {\n    constructor(text, parentNode) {\n        this.text = text;\n        this.parentNode = parentNode;\n        this.node = null;\n    }\n    getNode() {\n        return this.node;\n    }\n    getText() {\n        return this.text;\n    }\n    static create(text, parentNode) {\n        return new VTextNode(text, parentNode);\n    }\n    getParentVNode() {\n        return this.parentNode;\n    }\n}\nexports.VTextNode = VTextNode;\n/**\n * 将虚拟节点渲染到真实 DOM 元素上\n * @param vnode 需要渲染的虚拟节点\n * @param target 渲染目标\n * @returns 渲染得到的真实 DOM 节点\n */\nfunction renderTo(vnode, target) {\n    return target.appendChild(render(vnode));\n}\nexports.renderTo = renderTo;\n/**\n * 将虚拟节点渲染为真实 DOM 元素\n * @param vnode 需要渲染的虚拟节点\n * @returns 渲染得到的真实 DOM 节点\n */\nfunction render(vnode) {\n    if (vnode instanceof VTextNode) {\n        // 虚拟文本节点\n        let vTextNode = vnode;\n        let textNode = document.createTextNode(vTextNode.text);\n        vTextNode.node = textNode;\n        return textNode;\n    }\n    else if (vnode instanceof VElement) {\n        // 虚拟元素节点\n        let vElement = vnode;\n        let element = document.createElement(vElement.getTagName());\n        renderProps(element, vElement.getTagProps());\n        vElement\n            .childNodes\n            .map(childNode => render(childNode))\n            .forEach(node => element.appendChild(node));\n        vElement.node = element;\n        return element;\n    }\n    throw new Error('unknown node type');\n}\nexports.render = render;\nfunction renderProps(element, props) {\n    for (const key in props) {\n        if (Object.prototype.hasOwnProperty.call(props, key)) {\n            if (key === 'style') {\n                renderStyles(element, props[key]);\n            }\n            else if (props[key] instanceof Object) {\n                element.setAttribute(key, JSON.stringify(props[key]));\n            }\n            else {\n                element.setAttribute(key, props[key]);\n            }\n        }\n    }\n    return element;\n}\nfunction renderStyles(element, styles) {\n    for (const key in styles) {\n        if (Object.prototype.hasOwnProperty.call(styles, key)) {\n            element.style.setProperty(key, styles[key]);\n        }\n    }\n    return element;\n}\n//# sourceMappingURL=VNode.js.map\n\n//# sourceURL=webpack://lily/./dist/vdom/VNode.js?");

/***/ }),

/***/ "./dist/vdom/diff/Change.js":
/*!**********************************!*\
  !*** ./dist/vdom/diff/Change.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.RemoveFirstChildNodeChange = exports.RemoveLastChildNodeChange = exports.AppendChildNodeChange = exports.ReplaceNodeChange = exports.NoChange = void 0;\nconst VNode_1 = __webpack_require__(/*! ../VNode */ \"./dist/vdom/VNode.js\");\n/**\n * 无变化\n */\nclass NoChange {\n    constructor(targetNode) {\n        this.targetNode = targetNode;\n    }\n    getTargetNode() {\n        return this.targetNode;\n    }\n    apply() {\n        return true;\n    }\n}\nexports.NoChange = NoChange;\n/**\n * 节点替换\n */\nclass ReplaceNodeChange {\n    constructor(targetNode, newNode) {\n        this.targetNode = targetNode;\n        this.newNode = newNode;\n    }\n    getTargetNode() {\n        return this.targetNode;\n    }\n    apply() {\n        if (this.targetNode.parentNode != null) {\n            this.targetNode.parentNode.replaceChild(this.newNode, this.targetNode);\n            return true;\n        }\n        return false;\n    }\n}\nexports.ReplaceNodeChange = ReplaceNodeChange;\n/**\n * 向最后添加一个子节点\n */\nclass AppendChildNodeChange {\n    constructor(targetNode, newChildNode) {\n        this.targetNode = targetNode;\n        this.newChildNode = newChildNode;\n    }\n    getTargetNode() {\n        return this.targetNode;\n    }\n    apply() {\n        this.targetNode.appendChild((0, VNode_1.render)(this.newChildNode));\n        return true;\n    }\n}\nexports.AppendChildNodeChange = AppendChildNodeChange;\n/**\n * 移除最后一个子节点\n */\nclass RemoveLastChildNodeChange {\n    constructor(targetNode) {\n        this.targetNode = targetNode;\n    }\n    getTargetNode() {\n        return this.targetNode;\n    }\n    apply() {\n        if (this.targetNode.lastChild != null) {\n            this.targetNode.removeChild(this.targetNode.lastChild);\n            return true;\n        }\n        return false;\n    }\n}\nexports.RemoveLastChildNodeChange = RemoveLastChildNodeChange;\n/**\n * 移除第一个子节点\n */\nclass RemoveFirstChildNodeChange {\n    constructor(targetNode) {\n        this.targetNode = targetNode;\n    }\n    getTargetNode() {\n        return this.targetNode;\n    }\n    apply() {\n        if (this.targetNode.firstChild != null) {\n            this.targetNode.removeChild(this.targetNode.firstChild);\n            return true;\n        }\n        return false;\n    }\n}\nexports.RemoveFirstChildNodeChange = RemoveFirstChildNodeChange;\n//# sourceMappingURL=Change.js.map\n\n//# sourceURL=webpack://lily/./dist/vdom/diff/Change.js?");

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