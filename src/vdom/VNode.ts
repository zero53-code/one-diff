/**
 * 虚拟节点
 */
type VNode = 
    | IVElement     // 虚拟 DOM 元素节点
    | VTextNode     // 文本节点

export {VNode};

/**
 * 虚拟节点接口
 */
export interface IVNode {
    /**
     * 获取父节点
     */
    getParentNode(): IVElement | null;
}


/**
 * 虚拟 DOM 元素接口
 */
export interface IVElement extends IVNode {
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
    getChildNodes(): VNode[];
    
    /**
     * 向虚拟 DOM 元素中创建并添加子节点到数组 childNodes 中，
     * 并将子节点的父节点设置为 this
     * @param name 子节点标签名
     * @param props 子节点属性
     */
    addChildElementNode(name: string, props: Record<string, any>): void;
    
    /**
     * 向虚拟 DOM 文本节点中创建并添加子节点到数组 childNodes 中，
     * @param text 文本内容
     */
    addChildTextNode(text: string): void;
}

/**
 * 虚拟 DOM 元素类
 */
export class VElement implements IVElement {
    name: string;
    props: Record<string, any>;
    childNodes: VNode[];
    parentNode: IVElement | null;

    protected constructor(
        name: string, 
        props: Record<string, any>);

    protected constructor(
        name: string, 
        props: Record<string, any>,
        parentNode?: IVElement | null,
        childNodes?: IVElement[]) {
        this.name = name;
        this.props = props;
        this.parentNode = parentNode == undefined 
                            ? null 
                            : parentNode;
        this.childNodes = childNodes == undefined 
                            ? []
                            : childNodes;
    }

    /**
     * 工厂方法创建一个虚拟节点
     * @param name 虚拟节点的标签名
     * @param props 虚拟节点的属性
     * @returns 新建的虚拟节点
     */
    static create(
        name: string, 
        props: Record<string, any>): VElement {
        let newVNode: VElement = new VElement(name, props)
        newVNode.parentNode = null 
        newVNode.childNodes = []
        return newVNode;
    }

    addChildElementNode(
        name: string, 
        props: Record<string, any>): void {
        let newChildNode: VElement = VElement.create(name, props);
        newChildNode.parentNode = this;
        this.childNodes.push(newChildNode);
    }

    addChildTextNode(text: string): void {
        let newTextNode: VNode = VTextNode.create(text, this);
        this.childNodes.push(newTextNode);
    }
    
    getTagName(): string {
        return this.name;
    }
    
    getTagProps(): Record<string, any> {
        return this.props;
    }
    
    getChildNodes(): VNode[] {
        // 返回子节点数组的副本，防止在外部修改数组
        return this.childNodes.slice();
    }

    getParentNode(): IVElement | null {
        return this.parentNode;
    }
}

/**
 * 虚拟文本节点
 */
export class VTextNode implements IVNode {
    text: string;
    parentNode: VElement | null;

    private constructor(text: string, parentNode: VElement) {
        this.text = text;
        this.parentNode = parentNode;
    }
    
    getText(): string {
        return this.text;
    }

    static create(text: string, parentNode: VElement): VTextNode {
        return new VTextNode(text, parentNode);
    }

    getParentNode(): IVElement | null {
        return this.parentNode;
    }
}