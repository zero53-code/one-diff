import { renderTo } from "./vdom/Render"
import { AbstractVElementNode, VElementNode, VNode, VTextNode } from "./vdom/VNode"
import { IChange, RemoveFirstChildNodeChange, RemoveLastChildNodeChange } from "./vdom/diff/Change"
import { propsPatch, textNodePatch } from "./vdom/diff/Diff"

// 测试 `VNode`
function testVNode() {
    console.log("================测试 `VNode`================")
    let vnode1: VNode = VElementNode.create("div", {class: "DIV1111", style: {color: "red"}})
    vnode1.addChildElementNode("div", {}).addChildTextNode("这是文本节点1")
    vnode1.addChildElementNode("div", {}).addChildTextNode("这是文本节点2")
    vnode1.addChildTextNode("这是文本节点3")
    vnode1.addChildTextNode("这是文本节点4")

    let vnode2: VNode = VElementNode.create("div", {class: "DIV2222", style: {color: "green"}})
    vnode2.addChildElementNode("div", {}).addChildTextNode("这是文本节点A")
    vnode2.addChildElementNode("div", {}).addChildTextNode("这是文本节点B")
    vnode2.addChildTextNode("这是文本节点C")
    vnode2.addChildTextNode("这是文本节点D")

    console.log(vnode1)

    let node1 = renderTo(vnode1, document.getElementById("root1") as HTMLElement) as HTMLElement
    let node2 = renderTo(vnode2, document.getElementById("root2") as HTMLElement) as HTMLElement

    // 移除最后一个子节点
    let change1: IChange = new RemoveLastChildNodeChange(node1)
    console.log(change1.apply())

    // 移除第一个子节点
    let change2: IChange = new RemoveFirstChildNodeChange(node2)
    console.log(change2.apply())
}

// 测试 `propsPatch`
function testPropsPatch01() {
    console.log("================测试 `propsPatch` 01================")
    let vnode1 = VElementNode.create("div", 
        {
            class: "DIV1", 
            "width": "100px",
            style: {
                color: "red",
                "background-color": "blue"
            }
        })
    let vnode2 = VElementNode.create("div", 
    {
        class: "DIV2",
        "v-if": "???", 
        style: {
            color: "green",
            "background-color": "lightyellow"
        }
    })
    vnode1.addChildTextNode("Node1 我的属性将发生变化")
    vnode2.addChildTextNode("Node2")
    let node1 = renderTo(vnode1, document.getElementById("root1") as HTMLElement) as HTMLElement
    let node2 = renderTo(vnode2, document.getElementById("root2") as HTMLElement) as HTMLElement

    setTimeout(() => {
        console.log("================CHANGE================")
        let changes = propsPatch(vnode2, vnode1)
        for (const change of changes) {
            console.log(change)
            change.apply()
        }
    }, 3000)

    
}

// 测试 `propsPatch`
function testPropsPatch02() {
    console.log("================测试 `propsPatch` 02================")
    let props = {
        class: "DIV1", 
        style: {
            color: "red",
            "background-color": "blue",
            width: "100px",
            height: "100px",
            margin: "10px",
        }
    }
    let vnode1 = VElementNode.create("div", props)
    let vnode2 = VElementNode.create("div", props)
    let vnode3 = VElementNode.create("div", props)
    let vnode4 = VElementNode.create("div", props)
    vnode1.addChildTextNode("Node1")
    vnode2.addChildTextNode("Node2")
    vnode3.addChildTextNode("Node3")
    vnode4.addChildTextNode("Node4")
    let node1 = renderTo(vnode1, document.getElementById("root1") as HTMLElement) as HTMLElement
    let node2 = renderTo(vnode2, document.getElementById("root1") as HTMLElement) as HTMLElement
    let node3 = renderTo(vnode3, document.getElementById("root1") as HTMLElement) as HTMLElement
    let node4 = renderTo(vnode4, document.getElementById("root1") as HTMLElement) as HTMLElement

    setTimeout(() => {
        console.log("================CHANGE================")

        let changedProps = {
            class: "DIV1", 
            style: {
                color: "blue",
                "background-color": "#f0f0f0",
                width: "120px",
                height: "120px",
                margin: "10px",
            }
        }
        let changedVNode = VElementNode.create("div", changedProps)

        console.log("changedVNode: ", changedVNode)

        let changes1 = propsPatch(changedVNode, vnode1)
        let changes2 = propsPatch(changedVNode, vnode2)
        let changes3 = propsPatch(changedVNode, vnode3)
        let changes4 = propsPatch(changedVNode, vnode4)
        for (const change of changes1) {
            console.log(change)
            change.apply()
        }
        for (const change of changes2) {
            change.apply()
        }
        for (const change of changes3) {
            change.apply()
        }
        for (const change of changes4) {
            change.apply()
        }
    }, 3000)

    
}

// 测试 `textNodePatch`
function testTextNodePatch() {
    let node1 = VElementNode.create("div", {})
    let node2 = VElementNode.create("div", {})
    let textVNode1 = node1.addChildTextNode("Text Node 1")
    let textVNode2 = node2.addChildTextNode("Text Node 2: 我将替换为 Text Node 1")

    renderTo(node1, document.getElementById("root1") as HTMLElement)
    renderTo(node2, document.getElementById("root2") as HTMLElement)

    let changes = textNodePatch(textVNode1, textVNode2)
    setTimeout(() => {
        for (const change of changes) {
            console.log(change)
            change.apply()
        }
    }, 5000)
}

testPropsPatch02()