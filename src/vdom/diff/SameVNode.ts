import IVNode from "../vnode/IVNode"
import VElementNode from "../vnode/VElementNode"
import VTextNode from "../vnode/VTextNode"

/**
 * 判断两个虚拟节点是否为同样的节点
 * 同样的节点的依据：
 * - 两个虚拟节点的 `key` 相同
 * - 两个虚拟节点为 {@link VElementNode} 时，标签名相同
 * - 两个虚拟节点都为虚拟文本节点
 * @param vNode1 虚拟节点 1
 * @param vNode2 虚拟节点 2
 * @returns 相同返回 `ture`，不同返回 `false`
 * 
 * @author zero53
 */
export function sameVNode(vNode1: IVNode, vNode2: IVNode): boolean {
    return vNode1.getKey() === vNode2.getKey() 
        && (
            ( vNode1 instanceof VElementNode 
                && vNode2 instanceof VElementNode 
                && vNode1.getTagName() === vNode2.getTagName()
            )
        || 
            ( vNode1 instanceof VTextNode
                && vNode2 instanceof VTextNode
            )
        )
}