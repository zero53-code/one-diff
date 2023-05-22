import { renderTo } from "./vdom/Render";
import { IVElementNode, VElementNode, VNode } from "./vdom/VNode";
import { IChange, RemoveFirstChildNodeChange, RemoveLastChildNodeChange } from "./vdom/diff/Change";
import { propsDiff } from "./vdom/diff/Diff";

// 测试 VNode
function test001() {
    console.log("================TEST001================");
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

    console.log(vnode1);

    let node1 = renderTo(vnode1, document.getElementById("root1") as HTMLElement) as HTMLElement;
    let node2 = renderTo(vnode2, document.getElementById("root2") as HTMLElement) as HTMLElement;

    // 移除最后一个子节点
    let change1: IChange = new RemoveLastChildNodeChange(node1);
    console.log(change1.apply());

    // 移除第一个子节点
    let change2: IChange = new RemoveFirstChildNodeChange(node2);
    console.log(change2.apply());
}

// 测试 propsDiff
function test002() {
    console.log("================TEST002================");
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
    vnode1.addChildTextNode("Node1 我的属性将发生变化");
    vnode2.addChildTextNode("Node2");
    let node1 = renderTo(vnode1, document.getElementById("root1") as HTMLElement) as HTMLElement;
    let node2 = renderTo(vnode2, document.getElementById("root2") as HTMLElement) as HTMLElement;

    setTimeout(() => {
        console.log("================CHANGE================");
        let changes = propsDiff(vnode2, vnode1);
        for (const change of changes) {
            console.log(change);
            change.apply();
        }
    }, 3000)

    
}

test002();