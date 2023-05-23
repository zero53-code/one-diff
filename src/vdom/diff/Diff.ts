import { IVNode, VElementNode, VTextNode } from "../VNode";
import { SetAttributeChange, DeleteAttributeChange, IChange, NoChange, ReplaceNodeChange, ReplaceTextChange } from "./Change";

export function sameVNode(a: IVNode, b: IVNode): boolean {
    return a === b 
        || a.getKey() === b.getKey() 
        || (
            a instanceof VElementNode 
            && b instanceof VElementNode 
            && a.getTagName() === b.getTagName()
            );
}


export function* diff(newNode: IVNode, oldNode: IVNode): Generator<IChange> {
    if (newNode === oldNode || newNode.getKey() === oldNode.getKey()) {
        return;
    }
    
    if (sameVNode(newNode, oldNode)) {
        yield new ReplaceNodeChange(oldNode.getNode() as Node, newNode);
        return;
    }

    if (newNode instanceof VTextNode && oldNode instanceof VTextNode) {
        yield* textNodeDiff(newNode, oldNode)
        return;
    }
    
    if (newNode instanceof VElementNode && oldNode instanceof VElementNode) {

    }

    throw new Error("not implemented");
}

/**
 * 比较两个虚拟节点属性的变化，并返回 Change 的序列
 * Change 序列中的 Change 对象的目标是旧的虚拟节点所对应的真实 DOM 节点
 * @param newVNode 新的虚拟节点
 * @param oldVNode 旧的虚拟节点。必须是已渲染的节点，即 `oldVNode.getNode()` 不为 `null`
 * @returns Change 序列
 */
export function* propsDiff(newVNode: VElementNode, oldVNode: VElementNode): Generator<IChange> {
    let oldNode = oldVNode.getNode() as HTMLElement;

    let newProps = newVNode.getTagProps();
    let oldProps = oldVNode.getTagProps();
    
    for (const key in newProps) {
        if (oldProps.hasOwnProperty(key)) {
            // 新的 props 有，旧的 props 也有的属性 key
            let newValue: any = newProps[key];
            let oldValue: any = oldProps[key];
            if (typeof newValue !== typeof oldValue) {
                yield new SetAttributeChange(oldNode, key, newValue);
            }
            else if (newValue === oldValue) {
                // 不发生 Change 
                // yield new NoChange(oldProps);
            }
            else {
                yield new SetAttributeChange(oldNode, key, newValue);
            }
        }
        else {
            // 新的 props 有，旧的 props 没有的属性 key
            yield new SetAttributeChange(oldNode, key, newProps[key]);
        }
    }

    for (const key in oldProps) {
        if (!newProps.hasOwnProperty(key)) {
            // 旧的 props 有，新的 props 没有的属性 key
            // 删除操作
            yield new DeleteAttributeChange(oldNode, key);
        }
    }

    return;
}

/**
 * 比较两个虚拟文本节点的变化，并返回 Change 的序列
 * Change 序列中的 Change 对象的目标是旧的虚拟文本节点所对应的真实 DOM 节点
 * @param newTextVNode 新的虚拟文本节点
 * @param oldTextVNode 旧的虚拟文本节点。必须是已渲染的节点，即 `oldTextVNode.getNode()` 不为 `null`
 * @returns Change 序列
 */
export function* textNodeDiff(newTextVNode: VTextNode, oldTextVNode: VTextNode): Generator<IChange> {
    if (newTextVNode.getText() === oldTextVNode.getText()) {
        return;
    }
    else {
        yield new ReplaceTextChange(oldTextVNode.getNode() as Text, newTextVNode.getText());
        return;
    }
}

export function* childNodeDiff(newVNode: VElementNode, oldVNode: VElementNode): Generator<IChange> {
    let newChildren = newVNode.getChildren();
    let oldChildren = oldVNode.getChildren();
    
}