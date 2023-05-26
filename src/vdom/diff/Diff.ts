/**
 * @author linwukang
 */

import { IVNode, VElementNode, VTextNode } from "../VNode"
import { SetAttributeChange, DeleteAttributeChange, IChange, NoChange, ReplaceNodeChange, ReplaceTextChange } from "./Change"
import { sameVNode } from "./SameVNode"


export function* patch(newNode: IVNode, oldNode: IVNode): Generator<IChange> {
    console.log("===============0");

    if (!sameVNode(newNode, oldNode)) {
        console.log("===============1");
        yield new ReplaceNodeChange(oldNode.getNode() as Node, newNode)
        return
    }

    if (newNode instanceof VTextNode && oldNode instanceof VTextNode) {
        console.log("===============1");
        yield* textNodePatch(newNode, oldNode)
        return
    }
    
    if (newNode instanceof VElementNode && oldNode instanceof VElementNode) {
        console.log("===============3");
        yield* propsPatch(newNode, oldNode)
        yield* childNodePatch(newNode, oldNode)
        return
    }

    throw new Error("not implemented")
}

/**
 * 比较两个虚拟节点属性的变化，并返回 {@link IChange} 的序列
 * {@link IChange} 序列中的 {@link IChange} 对象的目标是旧的虚拟节点所对应的真实 DOM 节点
 * @param newVNode 新的虚拟节点
 * @param oldVNode 旧的虚拟节点。必须是已渲染的节点，即 `oldVNode.getNode()` 不为 `null`
 * @returns 序列 {@link Generator<IChange>}
 * 
 * @author linwukang
 */
export function* propsPatch(newVNode: VElementNode, oldVNode: VElementNode): Generator<IChange> {
    let oldNode = oldVNode.getNode() as HTMLElement

    let newProps = newVNode.getTagProps()
    let oldProps = oldVNode.getTagProps()
    
    for (const prop in newProps) {
        if (oldProps.hasOwnProperty(prop)) {
            // 新的 props 有，旧的 props 也有的属性 prop
            let newValue: any = newProps[prop]
            let oldValue: any = oldProps[prop]
            if (typeof newValue !== typeof oldValue) {
                yield new SetAttributeChange(oldVNode, prop, newValue)
            }
            else if (newValue === oldValue) {
                // 不发生 Change 
                // yield new NoChange(oldProps)
            }
            else {
                yield new SetAttributeChange(oldVNode, prop, newValue)
            }
        }
        else {
            // 新的 props 有，旧的 props 没有的属性 prop
            yield new SetAttributeChange(oldVNode, prop, newProps[prop])
        }
    }

    for (const key in oldProps) {
        if (!newProps.hasOwnProperty(key)) {
            // 旧的 props 有，新的 props 没有的属性 key
            // 删除操作
            yield new DeleteAttributeChange(oldNode, key)
        }
    }

    return
}

/**
 * 比较两个虚拟文本节点的变化，并返回 {@link IChange} 的序列
 * {@link IChange} 序列中的 {@link IChange} 对象的目标是旧的虚拟文本节点所对应的真实 DOM 节点
 * @param newTextVNode 新的虚拟文本节点
 * @param oldTextVNode 旧的虚拟文本节点。必须是已渲染的节点，即 `oldTextVNode.getNode()` 不为 `null`
 * @returns 序列 {@link Generator<IChange>}
 * 
 * @author linwukang
 */
export function* textNodePatch(newTextVNode: VTextNode, oldTextVNode: VTextNode): Generator<IChange> {
    if (newTextVNode.getText() === oldTextVNode.getText()) {
        return
    }
    else {
        yield new ReplaceTextChange(oldTextVNode.getNode() as Text, newTextVNode.getText())
        return
    }
}

export function* childNodePatch(newVNode: VElementNode, oldVNode: VElementNode): Generator<IChange> {
    let newChildren = newVNode.getChildren()
    let oldChildren = oldVNode.getChildren()
    
    let newStartIdx = 0                     // 新前
    let newEndIdx = newChildren.length - 1  // 新后
    let oldStartIdx = 0                     // 旧前
    let oldEndIdx = oldChildren.length - 1  // 旧后

    while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
        let newStartVNode = newChildren[newStartIdx]    // 新前虚拟节点
        let newEndVNode = newChildren[newEndIdx]        // 新后虚拟节点
        let oldStartVNode = newChildren[oldStartIdx]    // 旧前虚拟节点
        let oldEndVNode = newChildren[oldEndIdx]        // 旧后虚拟节点

        if (sameVNode(newStartVNode, oldStartVNode)) {
            // 新前-旧前 命中
            console.log("新前-旧前 命中")

            

            newStartIdx++
            oldStartIdx++
        }
        else if (sameVNode(newEndVNode, oldEndVNode)) {
            // 新后-旧后 命中
            console.log("新后-旧后 命中")
            newEndIdx--
            oldEndIdx--
        }
        else if (sameVNode(newStartVNode, oldEndVNode)) {
            // 新前-旧后 命中
            console.log("新前-旧后 命中")
            newStartIdx++
            oldEndIdx--
        }
        else if (sameVNode(newEndVNode, oldStartVNode)) {
            // 新后-旧前 命中
            console.log("新后-旧前 命中")
            newEndIdx--
            oldStartIdx++
        }
        else {
            console.log("未命中")
        }
    }
}