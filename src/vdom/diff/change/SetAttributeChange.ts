import {renderProps} from "../../Render";
import IChange from "./IChange";
import VElementNode from "../../vnode/VElementNode";

/**
 * 向目标元素添加或修改属性
 *
 * @author zero53
 */
export default class SetAttributeChange implements IChange {
    private readonly targetNode: HTMLElement
    private readonly key: string
    private readonly value: any

    constructor(target: VElementNode, key: string, value: any) {
        let node = target.getNode()
        if (node != null) {
            this.targetNode = node
            this.key = key
            this.value = value
        } else {
            throw new Error(target + "不是一个已被渲染的虚拟元素节点")
        }
    }

    getTarget() {
        return this.targetNode
    }

    apply(): boolean {
        renderProps(this.targetNode, {[this.key]: this.value})
        return true
    }
}