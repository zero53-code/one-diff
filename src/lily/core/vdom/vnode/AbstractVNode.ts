import IVNode from "./IVNode";
import {KeyType} from "../util/KeyUtil";

import AbstractVElementNode from "./AbstractVElementNode";

/**
 * 抽象 DOM 虚拟节点
 * 定义了通用的属性和方法
 *
 * @author linwukang
 */
export default abstract class AbstractVNode implements IVNode {
    /**
     * 父虚拟节点属性
     * 类型只能是 AbstractVElementNode 的派生类或者null
     */
    protected parentVNode: AbstractVElementNode | null = null
    /**
     * key 属性，虚拟节点的唯一表示
     */
    protected key: KeyType
    /**
     * 真实 DOM 节点
     * 未对虚拟节点进行渲染时为 null
     * 对虚拟节点进行渲染后为对应的真实 DOM 节点
     */
    node: Node | null = null
    /**
     * 是否为注释
     */
    protected comment: boolean = false

    protected constructor() {
        // this.key = keyCounter.next()
        this.key = undefined
    }

    protected setParentVNode(parentVNode: AbstractVElementNode) {
        this.parentVNode = parentVNode
    }

    public getParentVNode(): AbstractVElementNode | null {
        return this.parentVNode
    }

    public getKey(): KeyType {
        return this.key
    }

    setKey(key: KeyType): void {
        this.key = key
    }

    public getNode(): Node | null {
        return this.node
    }

    public isComment(): boolean {
        return this.comment
    }
}