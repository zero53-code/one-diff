import {KeyType} from "../util/KeyUtil";

import AbstractVElementNode from "./AbstractVElementNode";

/**
 * 虚拟节点接口
 *
 * @author linwukang
 */
export default interface IVNode {
    /**
     * 获取父虚拟节点
     */
    getParentVNode(): AbstractVElementNode | null

    /**
     * 设置父虚拟节点
     */

    // setParentVNode(parentVNode: AbstractVElementNode): void
    /**
     * 获取 Key
     */
    getKey(): KeyType

    /**
     * 设置 Key
     */
    setKey(key: KeyType): void

    /**
     * 获取渲染后的真实 DOM 节点，若未渲染则返回 null
     */
    getNode(): Node | null

    /**
     * 是否为注释
     */
    isComment(): boolean
}