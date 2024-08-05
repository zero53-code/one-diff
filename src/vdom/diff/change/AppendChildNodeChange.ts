import {render} from "../../Render";
import IChange from "./IChange";
import IVNode from "../../vnode/IVNode";
import VElementNode from "../../vnode/VElementNode";

/**
 * 向最后添加一个子节点
 *
 * @author zero53
 */
export default class AppendChildNodeChange implements IChange {
    private readonly targetNode: HTMLElement
    private readonly newChildNode: IVNode

    constructor(target: VElementNode, newChildNode: IVNode) {
        this.targetNode = target.getNode() as HTMLElement
        this.newChildNode = newChildNode
    }

    getTarget(): HTMLElement {
        return this.targetNode
    }

    apply(): boolean {
        this.targetNode.appendChild(render(this.newChildNode))
        return true
    }

}