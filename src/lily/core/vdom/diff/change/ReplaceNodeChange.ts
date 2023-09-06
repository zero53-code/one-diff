import {render} from "../../Render";
import IChange from "./IChange";
import IVNode from "../../vnode/IVNode";

/**
 * 节点替换
 *
 * @author linwukang
 */
export default class ReplaceNodeChange implements IChange {
    private readonly targetNode: Node
    private readonly newNode: IVNode

    constructor(targetNode: Node, newNode: IVNode) {
        this.targetNode = targetNode
        this.newNode = newNode
    }

    getTarget(): Node {
        return this.targetNode
    }

    apply(): boolean {
        if (this.targetNode.parentNode != null) {
            let node = this.newNode.getNode()

            this.targetNode.parentNode.replaceChild(
                node == null ? render(this.newNode) : node,
                this.targetNode)
            return true
        }
        return false
    }
}