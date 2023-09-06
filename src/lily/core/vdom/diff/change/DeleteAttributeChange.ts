import IChange from "./IChange";

/**
 * 向目标元素删除属性
 *
 * @author linwukang
 */
export default class DeleteAttributeChange implements IChange {
    private readonly targetNode: HTMLElement
    private readonly key: string

    constructor(target: HTMLElement, key: string) {
        this.targetNode = target
        this.key = key
    }

    getTarget() {
        return this.targetNode
    }

    apply(): boolean {
        this.targetNode.removeAttribute(this.key)
        return true
    }
}