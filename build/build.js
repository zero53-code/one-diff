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

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst Render_1 = __webpack_require__(/*! ./vdom/Render */ \"./dist/vdom/Render.js\");\nconst VNode_1 = __webpack_require__(/*! ./vdom/VNode */ \"./dist/vdom/VNode.js\");\nconst Change_1 = __webpack_require__(/*! ./vdom/diff/Change */ \"./dist/vdom/diff/Change.js\");\nconst Diff_1 = __webpack_require__(/*! ./vdom/diff/Diff */ \"./dist/vdom/diff/Diff.js\");\nfunction test001() {\n    console.log(\"================TEST001================\");\n    let vnode1 = VNode_1.VElementNode.create(\"div\", { class: \"DIV1111\", style: { color: \"red\" } });\n    vnode1.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点1\");\n    vnode1.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点2\");\n    vnode1.addChildTextNode(\"这是文本节点3\");\n    vnode1.addChildTextNode(\"这是文本节点4\");\n    let vnode2 = VNode_1.VElementNode.create(\"div\", { class: \"DIV2222\", style: { color: \"green\" } });\n    vnode2.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点A\");\n    vnode2.addChildElementNode(\"div\", {}).addChildTextNode(\"这是文本节点B\");\n    vnode2.addChildTextNode(\"这是文本节点C\");\n    vnode2.addChildTextNode(\"这是文本节点D\");\n    console.log(vnode1);\n    let node1 = (0, Render_1.renderTo)(vnode1, document.getElementById(\"root1\"));\n    let node2 = (0, Render_1.renderTo)(vnode2, document.getElementById(\"root2\"));\n    // 移除最后一个子节点\n    let change1 = new Change_1.RemoveLastChildNodeChange(node1);\n    console.log(change1.apply());\n    // 移除第一个子节点\n    let change2 = new Change_1.RemoveFirstChildNodeChange(node2);\n    console.log(change2.apply());\n}\nfunction test002() {\n    console.log(\"================TEST002================\");\n    let vnode1 = VNode_1.VElementNode.create(\"div\", {\n        class: \"DIV1\",\n        \"width\": \"100px\",\n        style: {\n            color: \"red\",\n            \"background-color\": \"blue\"\n        }\n    });\n    let vnode2 = VNode_1.VElementNode.create(\"div\", {\n        class: \"DIV2\",\n        \"v-if\": \"???\",\n        style: {\n            color: \"green\",\n            \"background-color\": \"lightyellow\"\n        }\n    });\n    vnode1.addChildTextNode(\"Node1 我的属性将发生变化\");\n    vnode2.addChildTextNode(\"Node2\");\n    let node1 = (0, Render_1.renderTo)(vnode1, document.getElementById(\"root1\"));\n    let node2 = (0, Render_1.renderTo)(vnode2, document.getElementById(\"root2\"));\n    setTimeout(() => {\n        console.log(\"================CHANGE================\");\n        let changes = (0, Diff_1.propsDiff)(vnode2, vnode1);\n        for (const change of changes) {\n            console.log(change);\n            change.apply();\n        }\n    }, 3000);\n}\ntest002();\n//# sourceMappingURL=index.js.map\n\n//# sourceURL=webpack://lily/./dist/index.js?");

/***/ }),

/***/ "./dist/vdom/Render.js":
/*!*****************************!*\
  !*** ./dist/vdom/Render.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.renderStyles = exports.renderProps = exports.render = exports.renderTo = void 0;\nconst VNode_1 = __webpack_require__(/*! ./VNode */ \"./dist/vdom/VNode.js\");\n/**\n * 将虚拟节点渲染到真实 DOM 元素上\n * @param vnode 需要渲染的虚拟节点\n * @param target 渲染目标\n * @returns 渲染得到的真实 DOM 节点\n */\nfunction renderTo(vnode, target) {\n    return target.appendChild(render(vnode));\n}\nexports.renderTo = renderTo;\n/**\n * 将虚拟节点渲染为真实 DOM 元素\n * @param vnode 需要渲染的虚拟节点\n * @returns 渲染得到的真实 DOM 节点\n */\nfunction render(vnode) {\n    if (vnode instanceof VNode_1.VTextNode) {\n        // 虚拟文本节点\n        let vTextNode = vnode;\n        let textNode = document.createTextNode(vTextNode.getText());\n        vTextNode.node = textNode;\n        return textNode;\n    }\n    else if (vnode instanceof VNode_1.VElementNode) {\n        // 虚拟元素节点\n        let vElement = vnode;\n        let element = document.createElement(vElement.getTagName());\n        renderProps(element, vElement.getTagProps());\n        vElement\n            .getChildVNodes()\n            .map(childNode => render(childNode))\n            .forEach(node => element.appendChild(node));\n        vElement.node = element;\n        return element;\n    }\n    throw new Error('unknown node type');\n}\nexports.render = render;\n/**\n * 向真实 DOM 元素上渲染属性\n * @param element 真实 DOM 元素\n * @param props 需要渲染的属性\n * @returns 真实 DOM 节点\n */\nfunction renderProps(element, props) {\n    for (const key in props) {\n        if (key === 'style') {\n            renderStyles(element, props[key]);\n        }\n        else if (props[key] instanceof Object) {\n            element.setAttribute(key, JSON.stringify(props[key]));\n        }\n        else {\n            element.setAttribute(key, props[key]);\n        }\n    }\n    return element;\n}\nexports.renderProps = renderProps;\n/**\n * 向真实 DOM 元素上渲染样式\n * @param element 真实 DOM 元素\n * @param styles 需要渲染的样式\n * @returns 真实 DOM 节点\n */\nfunction renderStyles(element, styles) {\n    for (const key in styles) {\n        if (Object.prototype.hasOwnProperty.call(styles, key)) {\n            element.style.setProperty(key, styles[key]);\n        }\n    }\n    return element;\n}\nexports.renderStyles = renderStyles;\n//# sourceMappingURL=Render.js.map\n\n//# sourceURL=webpack://lily/./dist/vdom/Render.js?");

/***/ }),

/***/ "./dist/vdom/VNode.js":
/*!****************************!*\
  !*** ./dist/vdom/VNode.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.VTextNode = exports.VElementNode = void 0;\nconst KeyUtil_1 = __webpack_require__(/*! ./util/KeyUtil */ \"./dist/vdom/util/KeyUtil.js\");\nlet keyCounter = new KeyUtil_1.KeyCounter();\n/**\n * 虚拟 DOM 元素类\n */\nclass VElementNode {\n    constructor(name, props, parentNode, childNodes) {\n        this.key = keyCounter.next();\n        this.name = name;\n        this.props = props;\n        this.parentNode = parentNode == undefined\n            ? null\n            : parentNode;\n        this.childNodes = childNodes == undefined\n            ? []\n            : childNodes;\n        this.node = null;\n    }\n    /**\n     * 工厂方法创建一个虚拟节点\n     * @param name 虚拟节点的标签名\n     * @param props 虚拟节点的属性\n     * @returns 新建的虚拟节点\n     */\n    static create(name, props) {\n        let newVNode = new VElementNode(name, props);\n        newVNode.parentNode = null;\n        newVNode.childNodes = [];\n        return newVNode;\n    }\n    getKey() {\n        return this.key;\n    }\n    getNode() {\n        return this.node;\n    }\n    addChildElementNode(name, props) {\n        let newChildNode = VElementNode.create(name, props);\n        newChildNode.parentNode = this;\n        this.childNodes.push(newChildNode);\n        return newChildNode;\n    }\n    addChildTextNode(text) {\n        let newTextNode = VTextNode.create(text, this);\n        this.childNodes.push(newTextNode);\n        return newTextNode;\n    }\n    getTagName() {\n        return this.name;\n    }\n    getTagProps() {\n        return this.props;\n    }\n    getChildVNodes() {\n        // 返回子节点数组的副本，防止在外部修改数组\n        return this.childNodes.slice();\n    }\n    getParentVNode() {\n        return this.parentNode;\n    }\n}\nexports.VElementNode = VElementNode;\n/**\n * 虚拟文本节点\n */\nclass VTextNode {\n    constructor(text, parentNode) {\n        this.key = keyCounter.next();\n        this.text = text;\n        this.parentNode = parentNode;\n        this.node = null;\n    }\n    getKey() {\n        return this.key;\n    }\n    getNode() {\n        return this.node;\n    }\n    getText() {\n        return this.text;\n    }\n    static create(text, parentNode) {\n        return new VTextNode(text, parentNode);\n    }\n    getParentVNode() {\n        return this.parentNode;\n    }\n}\nexports.VTextNode = VTextNode;\n//# sourceMappingURL=VNode.js.map\n\n//# sourceURL=webpack://lily/./dist/vdom/VNode.js?");

/***/ }),

/***/ "./dist/vdom/diff/Change.js":
/*!**********************************!*\
  !*** ./dist/vdom/diff/Change.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DeleteAttributeChange = exports.AddAttributeChange = exports.RemoveFirstChildNodeChange = exports.RemoveLastChildNodeChange = exports.AppendChildNodeChange = exports.ReplaceNodeChange = exports.NoChange = void 0;\nconst Render_1 = __webpack_require__(/*! ../Render */ \"./dist/vdom/Render.js\");\n/**\n * 无变化\n */\nclass NoChange {\n    constructor(target) {\n        this.target = target;\n    }\n    getTarget() {\n        return this.target;\n    }\n    apply() {\n        return true;\n    }\n}\nexports.NoChange = NoChange;\n/**\n * 节点替换\n */\nclass ReplaceNodeChange {\n    constructor(targetNode, newNode) {\n        this.targetNode = targetNode;\n        this.newNode = newNode;\n    }\n    getTarget() {\n        return this.targetNode;\n    }\n    apply() {\n        if (this.targetNode.parentNode != null) {\n            this.targetNode.parentNode.replaceChild(this.newNode, this.targetNode);\n            return true;\n        }\n        return false;\n    }\n}\nexports.ReplaceNodeChange = ReplaceNodeChange;\n/**\n * 向最后添加一个子节点\n */\nclass AppendChildNodeChange {\n    constructor(targetNode, newChildNode) {\n        this.targetNode = targetNode;\n        this.newChildNode = newChildNode;\n    }\n    getTarget() {\n        return this.targetNode;\n    }\n    apply() {\n        this.targetNode.appendChild((0, Render_1.render)(this.newChildNode));\n        return true;\n    }\n}\nexports.AppendChildNodeChange = AppendChildNodeChange;\n/**\n * 移除最后一个子节点\n */\nclass RemoveLastChildNodeChange {\n    constructor(targetNode) {\n        this.targetNode = targetNode;\n    }\n    getTarget() {\n        return this.targetNode;\n    }\n    apply() {\n        if (this.targetNode.lastChild != null) {\n            this.targetNode.removeChild(this.targetNode.lastChild);\n            return true;\n        }\n        return false;\n    }\n}\nexports.RemoveLastChildNodeChange = RemoveLastChildNodeChange;\n/**\n * 移除第一个子节点\n */\nclass RemoveFirstChildNodeChange {\n    constructor(targetNode) {\n        this.targetNode = targetNode;\n    }\n    getTarget() {\n        return this.targetNode;\n    }\n    apply() {\n        if (this.targetNode.firstChild != null) {\n            this.targetNode.removeChild(this.targetNode.firstChild);\n            return true;\n        }\n        return false;\n    }\n}\nexports.RemoveFirstChildNodeChange = RemoveFirstChildNodeChange;\n//////////////////////////\n/**\n * 向目标对象添加属性\n */\nclass AddAttributeChange {\n    constructor(target, key, value) {\n        this.targetNode = target;\n        this.key = key;\n        this.value = value;\n    }\n    getTarget() {\n        return this.targetNode;\n    }\n    apply() {\n        (0, Render_1.renderProps)(this.targetNode, { [this.key]: this.value });\n        return true;\n    }\n}\nexports.AddAttributeChange = AddAttributeChange;\n/**\n * 向目标对象删除属性\n */\nclass DeleteAttributeChange {\n    constructor(target, key) {\n        this.targetNode = target;\n        this.key = key;\n    }\n    getTarget() {\n        return this.targetNode;\n    }\n    apply() {\n        this.targetNode.removeAttribute(this.key);\n        return true;\n    }\n}\nexports.DeleteAttributeChange = DeleteAttributeChange;\n//# sourceMappingURL=Change.js.map\n\n//# sourceURL=webpack://lily/./dist/vdom/diff/Change.js?");

/***/ }),

/***/ "./dist/vdom/diff/Diff.js":
/*!********************************!*\
  !*** ./dist/vdom/diff/Diff.js ***!
  \********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.propsDiff = exports.diff = void 0;\nconst Change_1 = __webpack_require__(/*! ./Change */ \"./dist/vdom/diff/Change.js\");\nfunction diff(newNode, oldNode) {\n    if (newNode === oldNode) {\n        return [new Change_1.NoChange(newNode.getNode())];\n    }\n    throw new Error(\"not implemented\");\n}\nexports.diff = diff;\nfunction* propsDiff(newVNode, oldVNode) {\n    let oldNode = oldVNode.getNode();\n    let newProps = newVNode.getTagProps();\n    let oldProps = oldVNode.getTagProps();\n    for (const key in newProps) {\n        if (oldProps.hasOwnProperty(key)) {\n            // 新的 props 有，旧的 props 也有的属性 key\n            let newValue = newProps[key];\n            let oldValue = oldProps[key];\n            if (typeof newValue !== typeof oldValue) {\n                yield new Change_1.AddAttributeChange(oldNode, key, newValue);\n            }\n            else if (newValue === oldValue) {\n                // 不发生变化\n                // yield new NoChange(oldProps);\n            }\n            else {\n                yield new Change_1.AddAttributeChange(oldNode, key, newValue);\n            }\n        }\n        else {\n            // 新的 props 有，旧的 props 没有的属性 key\n            yield new Change_1.AddAttributeChange(oldNode, key, newProps[key]);\n        }\n    }\n    for (const key in oldProps) {\n        if (!newProps.hasOwnProperty(key)) {\n            // 旧的 props 有，新的 props 没有的属性 key\n            yield new Change_1.DeleteAttributeChange(oldNode, key);\n        }\n    }\n    return;\n}\nexports.propsDiff = propsDiff;\n//# sourceMappingURL=Diff.js.map\n\n//# sourceURL=webpack://lily/./dist/vdom/diff/Diff.js?");

/***/ }),

/***/ "./dist/vdom/util/KeyUtil.js":
/*!***********************************!*\
  !*** ./dist/vdom/util/KeyUtil.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.KeyCounter = void 0;\nclass KeyCounter {\n    constructor() {\n        this.count = 0;\n    }\n    next() {\n        return this.count++;\n    }\n}\nexports.KeyCounter = KeyCounter;\n//# sourceMappingURL=KeyUtil.js.map\n\n//# sourceURL=webpack://lily/./dist/vdom/util/KeyUtil.js?");

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