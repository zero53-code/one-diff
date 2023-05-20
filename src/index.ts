import { IVElement, VElement, VNode } from "./vdom/VNode";

let vnode1: VNode = VElement.create("div1", {})
vnode1.addChildElementNode("div2", {})
vnode1.addChildTextNode("这是文本节点")

console.log(vnode1);