import IChange from "./IChange";
import VElementNode from "../../vnode/VElementNode";

/**
 * 移除第一个子节点
 *
 * @author zero53
 */
export default class RemoveFirstChildNodeChange implements IChange {
    private readonly targetNode: HTMLElement

    constructor(target: VElementNode) {
        this.targetNode = target.getNode() as HTMLElement
    }

    getTarget(): Node {
        return this.targetNode
    }

    apply(): boolean {
        if (this.targetNode.firstChild != null) {
            this.targetNode.removeChild(this.targetNode.firstChild)
            return true
        }

        return false
    }
}