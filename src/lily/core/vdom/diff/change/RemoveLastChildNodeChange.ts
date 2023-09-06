import IChange from "./IChange";
import VElementNode from "../../vnode/VElementNode";

/**
 * 移除最后一个子节点
 *
 * @author linwukang
 */
export default class RemoveLastChildNodeChange implements IChange {
    private readonly targetNode: HTMLElement

    constructor(targetNode: VElementNode) {
        this.targetNode = targetNode.getNode() as HTMLElement
    }

    getTarget(): HTMLElement {
        return this.targetNode
    }

    apply(): boolean {
        if (this.targetNode.lastChild != null) {
            this.targetNode.removeChild(this.targetNode.lastChild)
            return true
        }

        return false
    }

}