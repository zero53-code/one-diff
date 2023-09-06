import AbstractVNode from "./AbstractVNode";
import VElementNode from "./VElementNode";

/**
 * 虚拟文本节点
 *
 * @author linwukang
 */
export default class VTextNode extends AbstractVNode {
    private readonly text: string

    private constructor(text: string, parentNode: VElementNode | undefined) {
        super()
        this.text = text
    }

    getText(): string {
        return this.text
    }

    static create(text: string, parentNode: VElementNode | undefined): VTextNode {
        return new VTextNode(text, parentNode)
    }
}