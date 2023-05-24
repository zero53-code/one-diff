/**
 * @author linwukang
 */
import { render, renderProps } from "../Render"
import { IVNode } from "../VNode"

/**
 * 变化接口
 * 用于记录对象和值的变化
 * 
 * @author linwukang
 */
export interface IChange {
    /**
     * 添加新的变化并返回，该操作不会修改自身
     * @param change 新增的变化
     * @returns 新增后的变化
     */
    // addChange(change: IChange): IChange

    /**
     * 获取目标对象
     */
    getTarget(): Node

    /**
     * 执行变化，修改真实 DOM
     */
    apply(): boolean
}

/**
 * 无变化
 * 
 * @author linwukang
 */
export class NoChange implements IChange {
    private target: any
    constructor(target: any) {
        this.target = target
    }

    getTarget(): any {
        return this.target
    }

    apply(): boolean {
        return true
    }
}

/**
 * 节点替换
 * 
 * @author linwukang
 */
export class ReplaceNodeChange implements IChange {
    private targetNode: Node
    private newNode: IVNode
    constructor(targetNode: Node, newNode: IVNode) {
        this.targetNode = targetNode
        this.newNode = newNode
    }
    getTarget(): Node {
        return this.targetNode
    }
    apply(): boolean {
        if (this.targetNode.parentNode != null) {
            this.targetNode.parentNode.replaceChild(
                render(this.newNode), 
                this.targetNode)
            return true
        }
        return false
    }
}

/**
 * 文本节点的文本替换
 * 
 * @author linwukang
 */
export class ReplaceTextChange implements IChange {
    target: Text
    text: string
    constructor(target: Text, text: string) {
        this.target = target
        this.text = text
    }


    getTarget(): Text {
        return this.target
    }
    apply(): boolean {
        this.target.nodeValue = this.text
        return true
    }

}


/**
 * 向最后添加一个子节点
 * 
 * @author linwukang
 */
export class AppendChildNodeChange implements IChange {
    private targetNode: Node
    private newChildNode: IVNode

    constructor(targetNode: Node, newChildNode: IVNode) {
        this.targetNode = targetNode
        this.newChildNode = newChildNode
    }

    getTarget(): Node {
        return this.targetNode
    }
    apply(): boolean {
        this.targetNode.appendChild(render(this.newChildNode))
        return true
    }

}

/**
 * 移除最后一个子节点
 * 
 * @author linwukang
 */
export class RemoveLastChildNodeChange implements IChange {
    private targetNode: HTMLElement
    constructor(targetNode: HTMLElement) {
        this.targetNode = targetNode
    }

    getTarget(): Node {
        return this.targetNode
    }
    
    apply(): boolean {
        if (this.targetNode.lastChild != null) {
            this.targetNode.removeChild(this.targetNode.lastChild)
            return true
        }
        
        return false
    }
        
}

/**
 * 移除第一个子节点
 * 
 * @author linwukang
 */
export class RemoveFirstChildNodeChange implements IChange {
    private targetNode: HTMLElement
    constructor(targetNode: HTMLElement) {
        this.targetNode = targetNode
    }

    getTarget(): Node {
        return this.targetNode
    }

    apply(): boolean {
        if (this.targetNode.firstChild != null) {
            this.targetNode.removeChild(this.targetNode.firstChild)
            return true
        }
        
        return false
    }
}


//////////////////////////

/**
 * 向目标元素添加或修改属性
 * 
 * @author linwukang
 */
export class SetAttributeChange implements IChange {
    private targetNode: HTMLElement
    private key: string
    private value: any
    constructor(target: HTMLElement, key: string, value: any) {
        this.targetNode = target
        this.key = key
        this.value = value
    }

    getTarget() {
        return this.targetNode
    }
    apply(): boolean {
        renderProps(this.targetNode, { [this.key]: this.value })
        return true
    }
}

/**
 * 向目标元素删除属性
 * 
 * @author linwukang
 */
export class DeleteAttributeChange implements IChange {
    private targetNode: HTMLElement
    private key: string
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