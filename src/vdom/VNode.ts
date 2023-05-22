import { KeyCounter, KeyType } from "./util/KeyUtil";
let keyCounter = new KeyCounter();

/**
 * 虚拟节点
 */
type VNode = 
    | IVElementNode     // 虚拟 DOM 元素节点
    | VTextNode     // 文本节点

export {VNode};

/**
 * 虚拟节点接口
 */
export interface IVNode {
    /**
     * 获取父虚拟节点
     */
    getParentVNode(): IVElementNode | null;
    /**
     * 获取 Key
     */
    getKey(): KeyType;

    /**
     * 获取渲染后的真实 DOM 节点，若未渲染则返回 null
     */
    getNode(): Node | null;
}

/**
 * 虚拟 DOM 元素接口
 */
export interface IVElementNode extends IVNode {
    /**
     * 获取节点的标签名称
     */
    getTagName(): string;

    /**
     * 获取节点的所有属性
     */
    getTagProps(): Record<string, any>;

    /**
     * 获取子节点数组
     */
    getChildVNodes(): VNode[];
    
    /**
     * 向虚拟 DOM 元素中创建并添加子节点到数组 childNodes 中，
     * 并将子节点的父节点设置为 this
     * @param name 子节点标签名
     * @param props 子节点属性
     */
    addChildElementNode(name: string, props: Record<string, any>): VElementNode;
    
    /**
     * 向虚拟 DOM 文本节点中创建并添加子节点到数组 childNodes 中，
     * @param text 文本内容
     */
    addChildTextNode(text: string): VTextNode;
}

/**
 * 虚拟 DOM 元素类
 */
export class VElementNode implements IVElementNode {
    private name: string;
    private props: Record<string, any>;
    private childNodes: VNode[];
    private parentNode: IVElementNode | null;
    node: Node | null;
    private key: KeyType = keyCounter.next();

    protected constructor(
        name: string, 
        props: Record<string, any>);

    protected constructor(
        name: string, 
        props: Record<string, any>,
        parentNode?: IVElementNode | null,
        childNodes?: IVElementNode[]) {
        this.name = name;
        this.props = props;
        this.parentNode = parentNode == undefined 
                            ? null 
                            : parentNode;
        this.childNodes = childNodes == undefined 
                            ? []
                            : childNodes;
        this.node = null;
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
        let newVNode: VElementNode = new VElementNode(name, props)
        newVNode.parentNode = null 
        newVNode.childNodes = []
        return newVNode;
    }

    getKey(): KeyType {
        return this.key;
    }

    getNode(): Node | null {
        return this.node;
    }

    addChildElementNode(
        name: string, 
        props: Record<string, any>): VElementNode {
        let newChildNode: VElementNode = VElementNode.create(name, props);
        newChildNode.parentNode = this;
        this.childNodes.push(newChildNode);
        return newChildNode;
    }

    addChildTextNode(text: string): VTextNode {
        let newTextNode: VNode = VTextNode.create(text, this);
        this.childNodes.push(newTextNode);
        return newTextNode;
    }
    
    getTagName(): string {
        return this.name;
    }
    
    getTagProps(): Record<string, any> {
        return this.props;
    }
    
    getChildVNodes(): VNode[] {
        // 返回子节点数组的副本，防止在外部修改数组
        return this.childNodes.slice();
    }

    getParentVNode(): IVElementNode | null {
        return this.parentNode;
    }
}

/**
 * 虚拟文本节点
 */
export class VTextNode implements IVNode {
    private text: string;
    private parentNode: VElementNode | null;
    node: Node | null;
    private key: KeyType = keyCounter.next();

    private constructor(text: string, parentNode: VElementNode) {
        this.text = text;
        this.parentNode = parentNode;
        this.node = null;
    }

    getKey(): KeyType {
        return this.key;
    }

    getNode(): Node | null {
        return this.node;
    }
    
    getText(): string {
        return this.text;
    }

    static create(text: string, parentNode: VElementNode): VTextNode {
        return new VTextNode(text, parentNode);
    }

    getParentVNode(): IVElementNode | null {
        return this.parentNode;
    }
}

