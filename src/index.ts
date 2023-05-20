import { IVElement, VElement, VNode, render } from "./vdom/VNode";

let vnode1: VNode = VElement.create("div", {class: "DIV222", style: {color: "red"}})
vnode1.addChildElementNode("div", {}).addChildTextNode("这是文本节点")
vnode1.addChildElementNode("div", {}).addChildTextNode("这是文本节点")
vnode1.addChildElementNode("div", {}).addChildTextNode("这是文本节点")
vnode1.addChildElementNode("div", {}).addChildTextNode("这是文本节点")
vnode1.addChildTextNode("这是文本节点1")
vnode1.addChildTextNode("这是文本节点2")
vnode1.addChildTextNode("这是文本节点3")
vnode1.addChildTextNode("这是文本节点4")

console.log(vnode1);

render(vnode1, document.getElementById("root") as HTMLElement);
