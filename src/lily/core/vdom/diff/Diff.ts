/**
 * @author linwukang
 */

import VNode from "../vnode/VNode"
import IChange from "./change/IChange"
import { sameVNode } from "./SameVNode"
import { KeyType } from "../util/KeyUtil"
import ReplaceNodeChange from "./change/ReplaceNodeChange"
import ReplaceTextChange from "./change/ReplaceTextChange"
import InsertBeforeChildChange from "./change/InsertBeforeChildChange"
import InsertAfterChildChange from "./change/InsertAfterChildChange"
import RemoveChildChange from "./change/RemoveChildChange"
import SetAttributeChange from "./change/SetAttributeChange"
import DeleteAttributeChange from "./change/DeleteAttributeChange"
import IVNode from "../vnode/IVNode"
import VElementNode from "../vnode/VElementNode"
import VTextNode from "../vnode/VTextNode"

export function* patch(newNode: IVNode, oldNode: IVNode): Generator<IChange> {
    if (!sameVNode(newNode, oldNode)) {
        yield new ReplaceNodeChange(oldNode.getNode() as Node, newNode)
        return
    }

    if (newNode instanceof VTextNode && oldNode instanceof VTextNode) {
        yield* textNodePatch(newNode, oldNode)
        return
    }
    
    if (newNode instanceof VElementNode && oldNode instanceof VElementNode) {
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
    let keyToOldIdx: undefined | Map<KeyType, number> = undefined
    let idxInOld: undefined | number = undefined
    let movedIdx: Set<number> = new Set()

    while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
        let newStartVNode = newChildren[newStartIdx]    // 新前虚拟节点
        let newEndVNode = newChildren[newEndIdx]        // 新后虚拟节点
        let oldStartVNode = oldChildren[oldStartIdx]    // 旧前虚拟节点
        let oldEndVNode = oldChildren[oldEndIdx]        // 旧后虚拟节点

        if (movedIdx.has(newStartIdx)) {
            newStartIdx++
        }
        else if (movedIdx.has(newEndIdx)) {
            newEndIdx--
        }
        else if (movedIdx.has(oldStartIdx)) {
            oldStartIdx++
        }
        else if (movedIdx.has(oldEndIdx)) { 
            oldEndIdx--
        }
        else if (sameVNode(newStartVNode, oldStartVNode)) {
            // 新前-旧前 命中
            console.log("新前-旧前 命中")
            // console.log(newStartIdx, oldStartIdx);
            // console.log(newStartVNode, oldStartVNode);

            yield* patch(newStartVNode, oldStartVNode)

            newStartIdx++
            oldStartIdx++
        }
        else if (sameVNode(newEndVNode, oldEndVNode)) {
            // 新后-旧后 命中
            console.log("新后-旧后 命中")

            yield* patch(newEndVNode, oldEndVNode)

            newEndIdx--
            oldEndIdx--
        }
        else if (sameVNode(newStartVNode, oldEndVNode)) {
            // 新前-旧后 命中
            console.log("新前-旧后 命中")

            yield new InsertBeforeChildChange(oldVNode, oldStartVNode, oldEndVNode)
            yield* patch(newStartVNode, oldEndVNode)

            newStartIdx++
            oldEndIdx--
        }
        else if (sameVNode(newEndVNode, oldStartVNode)) {
            // 新后-旧前 命中
            console.log("新后-旧前 命中")

            yield new InsertAfterChildChange(oldVNode, oldEndVNode, oldStartVNode)
            yield* patch(newEndVNode, oldStartVNode)

            newEndIdx--
            oldStartIdx++
        }
        else {
            console.log("未命中")

            if (keyToOldIdx === undefined) {
                keyToOldIdx = createKeyToOldIdx(oldChildren, oldStartIdx, oldEndIdx)
            }
            else {
                idxInOld = keyToOldIdx.get(newStartVNode.getKey())
                if (idxInOld === undefined) {
                    yield new InsertBeforeChildChange(oldVNode, oldStartVNode, newStartVNode)
                    newStartIdx++
                }
                else {
                    let nodeToMove = oldChildren[idxInOld]
                    yield new InsertBeforeChildChange(oldVNode, oldStartVNode, nodeToMove)
                    yield* patch(newStartVNode, nodeToMove)
                    movedIdx.add(idxInOld)
                    newStartIdx++
                }
            }
        }
    }   // while end

    if (oldStartIdx > oldEndIdx) {
        let before = oldChildren[newStartIdx]
        for (let index = newStartIdx; index <= newEndIdx; index++) {
            yield new InsertAfterChildChange(oldVNode, before, newChildren[index])
            before = newChildren[index]
        }
    }
    else if (newStartIdx > newEndIdx) {
        for (let index = oldStartIdx; index <= oldEndIdx; index++) {
            yield new RemoveChildChange(oldVNode, oldChildren[index]);
        }
    }
}

/**
 * 从子节点的 key 映射到 index
 * @param oldChildren 子节点数组
 * @param startIdx 开始下标
 * @param endIdx 结束下标
 * @returns key 到 index 的 Map 集合
 */
function createKeyToOldIdx(oldChildren: VNode[], startIdx: number, endIdx: number): Map<KeyType, number> {
    let keyToOldIdx = new Map<KeyType, number>()
    for (let index = startIdx; index <= endIdx; index++) {
        const key = oldChildren[index].getKey()
        if (key !== undefined) {
            keyToOldIdx.set(key, index)
        }
    }
    return keyToOldIdx
}