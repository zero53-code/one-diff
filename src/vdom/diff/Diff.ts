import { IVNode, VElementNode, VTextNode } from "../VNode";
import { getAllElementAttributes } from "../util/ElementUtil";
import { AddAttributeChange, DeleteAttributeChange, IChange, NoChange } from "./Change";

export function diff(newNode: IVNode, oldNode: IVNode): IChange[] {
    if (newNode === oldNode) {
        return [new NoChange(newNode.getNode() as Node)];
    }

    throw new Error("not implemented");
}

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
                yield new AddAttributeChange(oldNode, key, newValue);
            }
            else if (newValue === oldValue) {
                // 不发生变化
                // yield new NoChange(oldProps);
            }
            else {
                yield new AddAttributeChange(oldNode, key, newValue);
            }
        }
        else {
            // 新的 props 有，旧的 props 没有的属性 key
            yield new AddAttributeChange(oldNode, key, newProps[key]);
        }
    }

    for (const key in oldProps) {
        if (!newProps.hasOwnProperty(key)) {
            // 旧的 props 有，新的 props 没有的属性 key
            yield new DeleteAttributeChange(oldNode, key);
        }
    }

    return;
}
