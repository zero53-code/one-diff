import VNode from "../../vnode/VNode";
import {render} from "../../Render";
import IChange from "./IChange";
import VElementNode from "../../vnode/VElementNode";

/**
 * 插入到子节点之前
 *
 * @author zero53
 */
export default class InsertBeforeChildChange implements IChange {
    private readonly targetNode: HTMLElement
    private readonly targetChildVNode: VNode
    private readonly insertVNode: VNode

    constructor(target: VElementNode, targetChildVNode: VNode, insertVNode: VNode) {
        this.targetNode = target.getNode() as HTMLElement
        this.targetChildVNode = targetChildVNode
        this.insertVNode = insertVNode
    }

    getTarget(): Node {
        return this.targetNode
    }

    apply(): boolean {
        let insertNode = this.insertVNode.getNode()

        if (insertNode == null) {
            insertNode = render(this.insertVNode)
        }
        this.targetNode.insertBefore(insertNode, this.targetChildVNode.getNode() as Node)

        return true
    }
}