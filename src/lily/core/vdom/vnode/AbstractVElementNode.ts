import AbstractVNode from "./AbstractVNode";
import VElementNode from "./VElementNode";
import VTextNode from "./VTextNode";
import VNode from "./VNode";

/**
 * 虚拟 DOM 元素接口
 *
 * @author linwukang
 */
export default abstract class AbstractVElementNode extends AbstractVNode {
    /**
     * 获取节点的标签名称
     */
    public abstract getTagName(): string

    /**
     * 获取节点的所有属性
     */
    public abstract getTagProps(): Record<string, any>

    /**
     * 获取子节点数组
     */
    public abstract getChildren(): VNode[]

    /**
     * 向虚拟 DOM 元素中创建并添加子节点到数组 childNodes 中，
     * 并将子节点的父节点设置为 this
     * @param name 子节点标签名
     * @param props 子节点属性
     */
    public abstract addChildElementNode(name: string, props: Record<string, any>): VElementNode

    /**
     * 向虚拟 DOM 文本节点中创建并添加子节点到数组 childNodes 中，
     * @param text 文本内容
     * @returns 新的虚拟文本节点 {@link VTextNode}
     */
    public abstract addChildTextNode(text: string): VTextNode

    public getNode(): HTMLElement | null {
        return this.node as HTMLElement | null
    }
}