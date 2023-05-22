import { IVNode, render, renderTo } from "../VNode";

/**
 * 变化接口
 * 用于记录对象和值的变化
 */
interface IChange {
    /**
     * 添加新的变化并返回，该操作不会修改自身
     * @param change 新增的变化
     * @returns 新增后的变化
     */
    // addChange(change: IChange): IChange;

    /**
     * 获取目标真实 DOM 节点
     */
    getTargetNode(): Node;

    /**
     * 执行变化，修改真实 DOM
     */
    apply(): boolean;
}

/**
 * 无变化
 */
export class NoChange implements IChange {
    targetNode: Node;
    constructor(targetNode: Node) {
        this.targetNode = targetNode;
    }

    getTargetNode(): Node {
        return this.targetNode;
    }

    apply(): boolean {
        return true;
    }
}

/**
 * 节点替换
 */
export class ReplaceNodeChange implements IChange {
    targetNode: Node;
    newNode: Node;
    constructor(targetNode: Node, newNode: Node) {
        this.targetNode = targetNode;
        this.newNode = newNode;
    }
    getTargetNode(): Node {
        return this.targetNode;
    }
    apply(): boolean {
        if (this.targetNode.parentNode != null) {
            this.targetNode.parentNode.replaceChild(this.newNode, this.targetNode);
            return true;
        }
        return false;
    }
}

/**
 * 向最后添加一个子节点
 */
export class AppendChildNodeChange implements IChange {
    targetNode: Node;
    newChildNode: IVNode;

    constructor(targetNode: Node, newChildNode: IVNode) {
        this.targetNode = targetNode;
        this.newChildNode = newChildNode;
    }

    getTargetNode(): Node {
        return this.targetNode;
    }
    apply(): boolean {
        this.targetNode.appendChild(render(this.newChildNode));
        return true;
    }

}

/**
 * 移除最后一个子节点
 */
export class RemoveLastChildNodeChange implements IChange {
    targetNode: HTMLElement;
    constructor(targetNode: HTMLElement) {
        this.targetNode = targetNode;
    }

    getTargetNode(): Node {
        return this.targetNode;
    }
    
    apply(): boolean {
        if (this.targetNode.lastChild != null) {
            this.targetNode.removeChild(this.targetNode.lastChild)
            return true;
        }
        
        return false;
    }
        
}

/**
 * 移除第一个子节点
 */
export class RemoveFirstChildNodeChange implements IChange {
    targetNode: HTMLElement;
    constructor(targetNode: HTMLElement) {
        this.targetNode = targetNode;
    }

    getTargetNode(): Node {
        return this.targetNode;
    }

    apply(): boolean {
        if (this.targetNode.firstChild != null) {
            this.targetNode.removeChild(this.targetNode.firstChild)
            return true;
        }
        
        return false;
    }
}



export {
    IChange,
}