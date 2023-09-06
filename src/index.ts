import {h, renderTo} from "./lily/core/vdom/Render"
import VNode from "./lily/core/vdom/vnode/VNode"
import IChange from "./lily/core/vdom/diff/change/IChange"
import {patch, propsPatch, textNodePatch} from "./lily/core/vdom/diff/Diff"
import RemoveLastChildNodeChange from "./lily/core/vdom/diff/change/RemoveLastChildNodeChange";
import RemoveFirstChildNodeChange from "./lily/core/vdom/diff/change/RemoveFirstChildNodeChange";
import InsertBeforeChildChange from "./lily/core/vdom/diff/change/InsertBeforeChildChange";
import InsertAfterChildChange from "./lily/core/vdom/diff/change/InsertAfterChildChange";
import AbstractVElementNode from "./lily/core/vdom/vnode/AbstractVElementNode";
import VElementNode from "./lily/core/vdom/vnode/VElementNode";
import VTextNode from "./lily/core/vdom/vnode/VTextNode";

// 测试 `VNode`
function testVNode() {
    console.log("================测试 `VNode`================")
    let vnode1: VElementNode = VElementNode.create("div", {class: "DIV1111", style: {color: "red"}})
    vnode1.addChildElementNode("div", {}).addChildTextNode("这是文本节点1")
    vnode1.addChildElementNode("div", {}).addChildTextNode("这是文本节点2")
    vnode1.addChildTextNode("这是文本节点3")
    vnode1.addChildTextNode("这是文本节点4")

    let vnode2: VElementNode = VElementNode.create("div", {class: "DIV2222", style: {color: "green"}})
    vnode2.addChildElementNode("div", {}).addChildTextNode("这是文本节点A")
    vnode2.addChildElementNode("div", {}).addChildTextNode("这是文本节点B")
    vnode2.addChildTextNode("这是文本节点C")
    vnode2.addChildTextNode("这是文本节点D")

    console.log(vnode1)

    let node1 = renderTo(vnode1, document.getElementById("root1") as HTMLElement) as HTMLElement
    let node2 = renderTo(vnode2, document.getElementById("root2") as HTMLElement) as HTMLElement

    // 移除最后一个子节点
    let change1: IChange = new RemoveLastChildNodeChange(vnode1)
    console.log(change1.apply())

    // 移除第一个子节点
    let change2: IChange = new RemoveFirstChildNodeChange(vnode2)
    console.log(change2.apply())
}

function testInsertNode() {
    console.log("================测试 `InsertNode`================")
    let props = {
        class: "DIV1",
        style: {
            color: "red",
            "line-height": "20px",
            "text-align": "center",
            "background-color": "skyblue",
            width: "100px",
            height: "20px",
            margin: "10px",
        }
    }
    let vnodeParent = VElementNode.create("div", {})
    let ch1 = vnodeParent.addChildElementNode("div", props)
    let ch2 = vnodeParent.addChildElementNode("div", props)
    let ch3 = vnodeParent.addChildElementNode("div", props)
    let ch4 = vnodeParent.addChildElementNode("div", props)
    let ch5 = vnodeParent.addChildElementNode("div", props)
    ch1.addChildTextNode("Ch01")
    ch2.addChildTextNode("Ch02")
    ch3.addChildTextNode("Ch03")
    ch4.addChildTextNode("Ch04")
    ch5.addChildTextNode("Ch05")

    let new_ch1 = VElementNode.create("div", props)
    new_ch1.addChildTextNode("new_Ch01")

    let new_ch2 = VElementNode.create("div", props)
    new_ch2.addChildTextNode("new_Ch02")

    renderTo(vnodeParent, document.getElementById("root1") as HTMLElement)

    let insertChange1 = new InsertBeforeChildChange(vnodeParent, ch2, new_ch1)
    let insertChange2 = new InsertAfterChildChange(vnodeParent, ch5, new_ch2)
    let insertChange3 = new InsertAfterChildChange(vnodeParent, ch3, ch5)


    setTimeout(() => {
        insertChange1.apply()
        insertChange2.apply()
        insertChange3.apply()
    }, 1000)

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

// 测试 `patch`
function testPatch01() {
    console.log("================测试 `patch` 01 ================")
    let props = {
        class: "DIV1",
        style: {
            color: "red",
            "font-size": "20px",
            "line-height": "30px",
            "text-align": "center",
            "background-color": "skyblue",
            width: "100px",
            height: "30px",
            margin: "10px",
        }
    }
    let old_vnodeParent = VElementNode.create("div", {})
    let old_ch1 = old_vnodeParent.addChildElementNode("div", {...props, key: 1})
    let old_ch2 = old_vnodeParent.addChildElementNode("div", {...props, key: 2})
    let old_ch3 = old_vnodeParent.addChildElementNode("div", {...props, key: 3})
    let old_ch4 = old_vnodeParent.addChildElementNode("div", {...props, key: 4})
    let old_ch5 = old_vnodeParent.addChildElementNode("div", {...props, key: 5})
    old_ch1.addChildTextNode("Ch01")
    old_ch2.addChildTextNode("Ch02")
    old_ch3.addChildTextNode("Ch03")
    old_ch4.addChildTextNode("Ch04")
    old_ch5.addChildTextNode("Ch05")

    renderTo(old_vnodeParent, document.getElementById("root1") as HTMLElement)

    let new_props = JSON.parse(JSON.stringify(props))
    new_props.style.backgroundColor = "lightgreen"
    new_props.style.width = "150px"
    new_props.style.height = "40px"
    new_props.style.color = "blue"


    let new_vnodeParent = VElementNode.create("div", {})
    new_vnodeParent.setKey(old_vnodeParent.getKey())
    let new_ch2 = new_vnodeParent.addChildElementNode("div", {...new_props, key: 2})
    let new_ch3 = new_vnodeParent.addChildElementNode("div", {...new_props, key: 3})
    let new_ch4 = new_vnodeParent.addChildElementNode("div", {...new_props, key: 4})
    let new_ch5 = new_vnodeParent.addChildElementNode("div", {...new_props, key: 5})
    let new_ch6 = new_vnodeParent.addChildElementNode("div", {...new_props, key: 6})
    let new_ch7 = new_vnodeParent.addChildElementNode("div", {...new_props, key: 7})
    let new_ch8 = new_vnodeParent.addChildElementNode("div", {...new_props, key: 8})
    let new_ch1 = new_vnodeParent.addChildElementNode("div", {...new_props, key: 1})
    new_ch1.addChildTextNode("Ch01")
    new_ch2.addChildTextNode("Ch02")
    new_ch3.addChildTextNode("Ch03")
    new_ch4.addChildTextNode("Ch04")
    new_ch5.addChildTextNode("Ch05")

    new_ch6.addChildTextNode("new_ch06")
    new_ch7.addChildTextNode("new_ch07")
    new_ch8.addChildTextNode("new_ch08")
    // new_ch1.setKey(old_ch1.getKey())
    // new_ch2.setKey(old_ch2.getKey())
    // new_ch3.setKey(old_ch3.getKey())
    // new_ch4.setKey(old_ch4.getKey())
    // new_ch5.setKey(old_ch5.getKey())

    function clickButton() {
        let changes = patch(new_vnodeParent, old_vnodeParent)
        console.log(old_vnodeParent)
        console.log(new_vnodeParent)
        for (const change of changes) {
            change.apply()
        }
    }

    document.getElementById("btn")?.addEventListener(
        "click", (event) => {
            console.log("开始变化")
            clickButton()
        }
    )
}

// 测试 `patch`
function testPatch02() {
    console.log("================测试 `patch` 02 ================")
    let props = {
        class: "DIV1",
        style: {
            color: "red",
            "font-size": "20px",
            "line-height": "30px",
            "text-align": "center",
            "background-color": "skyblue",
            width: "100px",
            height: "30px",
            margin: "10px",
        }
    }
    let old_vnodeParent = h("div", {}, [
        h("div", {...props, key: 1}, h("ch01")),
        h("div", {...props, key: 2}, h("ch02")),
        h("div", {...props, key: 3}, h("ch03")),
        h("div", {...props, key: 4}, h("ch04")),
        h("div", {...props, key: 5}, h("ch05")),
    ]) as VElementNode

    renderTo(old_vnodeParent, document.getElementById("root1") as HTMLElement)

    let new_vnodeParent = h("div", {key: old_vnodeParent.getKey()}, [
        h("div", {...props, key: 1}, h("ch01")),
        h("div", {...props, key: 13}, h("new-ch13")),
        h("div", {...props, key: 2}, h("ch02")),
        h("div", {...props, key: 8}, h("new-ch08")),
        h("div", {...props, key: 11}, h("new-ch11")),
        h("div", {...props, key: 3}, h("ch03")),
        h("div", {...props, key: 9}, h("new-ch09")),
        h("div", {...props, key: 10}, h("new-ch10")),
        h("div", {...props, key: 12}, h("new-ch12")),
    ]) as VElementNode

    function clickButton() {
        let changes = patch(new_vnodeParent, old_vnodeParent)
        console.log(old_vnodeParent)
        console.log(new_vnodeParent)
        let timeout = 1000;
        for (const change of changes) {
            setTimeout(() => {
                change.apply()
            }, timeout)
            timeout += 1000
            // change.apply()
        }
    }

    document.getElementById("btn")?.addEventListener(
        "click", (event) => {
            console.log("开始变化")
            clickButton()
        }
    )
}

// 测试 `patch`
function testPatch03() {
    console.log("================测试 `patch` 03 ================")
    let props = {
        class: "DIV1",
        style: {
            color: "red",
            "font-size": "20px",
            "line-height": "30px",
            "text-align": "center",
            "background-color": "skyblue",
            width: "100px",
            height: "30px",
            margin: "10px",
        }
    }
    let old_vnodeParent = h("div", {}, [
        h("div", {...props, key: 1}, h("ch01")),
        h("div", {...props, key: 2}, h("ch02")),
        h("div", {...props, key: 3}, h("ch03")),
        h("div", {...props, key: 4}, h("ch04")),
        h("div", {...props, key: 5}, h("ch05")),
    ]) as VElementNode

    renderTo(old_vnodeParent, document.getElementById("root1") as HTMLElement)

    let new_vnodeParent = h("div", {key: old_vnodeParent.getKey()}, [
        h("div", {...props, key: 5}, h("ch05")),
        h("div", {...props, key: 4}, h("ch04")),
        h("div", {...props, key: 3}, h("ch03")),
        h("div", {...props, key: 2}, h("ch02")),
        h("div", {...props, key: 1}, h("ch01")),
    ]) as VElementNode

    function clickButton() {
        let changes = patch(new_vnodeParent, old_vnodeParent)
        console.log(old_vnodeParent)
        console.log(new_vnodeParent)
        let timeout = 1000;
        for (const change of changes) {
            setTimeout(() => {
                change.apply()
            }, timeout)
            timeout += 1000
            // change.apply()
        }
    }

    document.getElementById("btn")?.addEventListener(
        "click", (event) => {
            console.log("开始变化")
            clickButton()
        }
    )
}

// testVNode()
// testPropsPatch01()
// testPropsPatch02()
// testTextNodePatch()
// testInsertNode()

// testPatch01()
// testPatch02()
testPatch03()