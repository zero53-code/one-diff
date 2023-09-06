import VNode from "../../vnode/VNode";
import IChange from "./IChange";
import VElementNode from "../../vnode/VElementNode";

/**
 * 移除子节点
 *
 * @author linwukang
 */
export default class RemoveChildChange implements IChange {
    private readonly targetNode: HTMLElement
    private readonly childNode: Node

    constructor(target: VElementNode, childNode: VNode) {
        this.targetNode = target.getNode() as HTMLElement
        this.childNode = childNode.getNode() as Node
    }

    getTarget(): Node {
        return this.targetNode
    }

    apply(): boolean {
        this.targetNode.removeChild(this.childNode)
        return true
    }
}