import AbstractVNode from "./AbstractVNode";
import VElementNode from "./VElementNode";

/**
 * 虚拟文本节点
 *
 * @author zero53
 */
export default class VTextNode extends AbstractVNode {
    private readonly text: string

    private constructor(text: string, parentNode: VElementNode | undefined) {
        super()
        this.text = text
    }

    /**
     * 获取文本字符串
     * @returns 返回文本的字符串
     */
    getText(): string {
        return this.text
    }

    static create(text: string, parentNode: VElementNode | undefined): VTextNode {
        return new VTextNode(text, parentNode)
    }
}