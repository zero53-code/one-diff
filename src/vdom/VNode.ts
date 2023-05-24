/**
 * @author linwukang
 */

import { KeyCounter, KeyType } from "./util/KeyUtil";
let keyCounter = new KeyCounter();

/**
 * 虚拟节点
 * 
 * @author linwukang
 */
type VNode = 
    | AbstractVElementNode     // 虚拟 DOM 元素节点
    | VTextNode     // 文本节点

export {VNode};

/**
 * 虚拟节点接口
 * 
 * @author linwukang
 */
export interface IVNode {
    /**
     * 获取父虚拟节点
     */
    getParentVNode(): AbstractVElementNode | null;
    /**
     * 获取 Key
     */
    getKey(): KeyType;

    /**
     * 获取渲染后的真实 DOM 节点，若未渲染则返回 null
     */
    getNode(): Node | null;

    /**
     * 是否为注释
     */
    isComment(): boolean;
}

/**
 * 抽象 DOM 虚拟节点
 * 定义了通用的属性和方法
 * 
 * @author linwukang
 */
export abstract class AbstractVNode implements IVNode {
    /**
     * 父虚拟节点属性
     * 类型只能是 AbstractVElementNode 的派生类或者null
     */
    protected parentVNode: AbstractVElementNode | null = null;
    /**
     * key 属性，虚拟节点的唯一表示
     */
    protected key: KeyType;
    /**
     * 真实 DOM 节点
     * 未对虚拟节点进行渲染时为 null
     * 对虚拟节点进行渲染后为对应的真实 DOM 节点
     */
    node: Node | null = null;
    /**
     * 是否为注释
     */
    protected comment: boolean = false;

    protected constructor() {
        this.key = keyCounter.next();
    }

    protected setParentVNode(parentVNode: AbstractVElementNode) {
        this.parentVNode = parentVNode;
    }

    public getParentVNode(): AbstractVElementNode | null {
        return this.parentVNode;
    }

    public getKey(): number {
        return this.key;
    }

    public getNode(): Node | null {
        return this.node;
    }

    public isComment(): boolean {
        return this.comment;
    }
}

/**
 * 虚拟 DOM 元素接口
 * 
 * @author linwukang
 */
export abstract class AbstractVElementNode extends AbstractVNode {
    /**
     * 获取节点的标签名称
     */
    public abstract getTagName(): string;

    /**
     * 获取节点的所有属性
     */
    public abstract getTagProps(): Record<string, any>;

    /**
     * 获取子节点数组
     */
    public abstract getChildren(): VNode[];
    
    /**
     * 向虚拟 DOM 元素中创建并添加子节点到数组 childNodes 中，
     * 并将子节点的父节点设置为 this
     * @param name 子节点标签名
     * @param props 子节点属性
     */
    public abstract addChildElementNode(name: string, props: Record<string, any>): VElementNode;
    
    /**
     * 向虚拟 DOM 文本节点中创建并添加子节点到数组 childNodes 中，
     * @param text 文本内容
     * @returns 新的虚拟文本节点 {@link VTextNode}
     */
    public abstract addChildTextNode(text: string): VTextNode;
}

/**
 * 虚拟 DOM 元素类
 * 
 * @author linwukang
 */
export class VElementNode extends AbstractVElementNode {
    private tagName: string;
    private props: Record<string, any>;
    private childNodes: VNode[];
    // private parentNode: AbstractVElementNode | null;
    // node: Node | null;
    // private key: KeyType = keyCounter.next();

    protected constructor(
        tagName: string, 
        props: Record<string, any>);

    protected constructor(
        tagName: string, 
        props: Record<string, any>,
        parentNode?: AbstractVElementNode | null,
        childNodes?: AbstractVElementNode[]) {
        super();
        
        this.tagName = tagName;
        this.props = props;
        super.parentVNode = parentNode != undefined ? parentNode : null
        this.childNodes = childNodes == undefined ? [] : childNodes;
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
        return new VElementNode(name, props);
    }

    addChildElementNode(
        name: string, 
        props: Record<string, any>): VElementNode {
        let newChildNode: VElementNode = VElementNode.create(name, props);
        newChildNode.setParentVNode(this);
        this.childNodes.push(newChildNode);
        return newChildNode;
    }

    addChildTextNode(text: string): VTextNode {
        let newTextNode: VNode = VTextNode.create(text, this);
        this.childNodes.push(newTextNode);
        return newTextNode;
    }
    
    getTagName(): string {
        return this.tagName;
    }
    
    getTagProps(): Record<string, any> {
        return this.props;
    }
    
    getChildren(): VNode[] {
        // 返回子节点数组的副本，防止在外部修改数组
        return this.childNodes.slice();
    }
}

/**
 * 虚拟文本节点
 * 
 * @author linwukang
 */
export class VTextNode extends AbstractVNode {
    private text: string;

    private constructor(text: string, parentNode: VElementNode) {
        super()
        this.text = text;
    }

    getText(): string {
        return this.text;
    }

    static create(text: string, parentNode: VElementNode): VTextNode {
        return new VTextNode(text, parentNode);
    }
}

