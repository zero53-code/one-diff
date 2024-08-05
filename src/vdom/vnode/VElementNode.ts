import AbstractVElementNode from "./AbstractVElementNode";

import VTextNode from "./VTextNode";
import VNode from "./VNode";

/**
 * 虚拟 DOM 元素类
 *
 * @author zero53
 */
export default class VElementNode extends AbstractVElementNode {
    private readonly tagName: string
    private readonly props: Record<string, any>
    private readonly childNodes: VNode[]
    // private parentNode: AbstractVElementNode | null
    // node: Node | null
    // private key: KeyType = keyCounter.next()

    protected constructor(
        tagName: string,
        props: Record<string, any>)

    protected constructor(
        tagName: string,
        props: Record<string, any>,
        parentNode?: AbstractVElementNode | null,
        childNodes?: AbstractVElementNode[]) {
        super()

        this.tagName = tagName
        this.props = props
        this.parentVNode = parentNode != undefined ? parentNode : null
        this.childNodes = childNodes == undefined ? [] : childNodes
        this.node = null

        for (let propName in props) {
            if (propName === 'key') {
                this.key = props[propName]
                delete props.key
                break
            }
        }
    }

    /**
     * 工厂方法创建一个虚拟节点
     * @param name 虚拟节点的标签名
     * @param props 虚拟节点的属性
     * @returns 新建的虚拟节点
     */
    static create(
        name: string,
        props: Record<string, any>): VElementNode {
        return new VElementNode(name, props)
    }

    addChildElementNode(
        name: string,
        props: Record<string, any>): VElementNode {
        let newChildNode: VElementNode = VElementNode.create(name, props)
        newChildNode.setParentVNode(this)
        this.childNodes.push(newChildNode)
        return newChildNode
    }

    addChildTextNode(text: string): VTextNode {
        let newTextNode: VNode = VTextNode.create(text, this)
        this.childNodes.push(newTextNode)
        return newTextNode
    }

    getTagName(): string {
        return this.tagName
    }

    getTagProps(): Record<string, any> {
        return this.props
    }

    getChildren(): VNode[] {
        return this.childNodes
    }
}