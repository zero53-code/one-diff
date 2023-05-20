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
    /**
     * 获取 Key
     */
    // getKey(): Number;
    /**
     * 设置 Key
     */
    // setKey(key: number): void;
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
    addChildElementNode(name: string, props: Record<string, any>): VElement;
    
    /**
     * 向虚拟 DOM 文本节点中创建并添加子节点到数组 childNodes 中，
     * @param text 文本内容
     */
    addChildTextNode(text: string): VTextNode;
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
        props: Record<string, any>): VElement {
        let newChildNode: VElement = VElement.create(name, props);
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

/**
 * 将虚拟节点渲染到真实 DOM 元素上
 * @param vnode 需要渲染的虚拟节点
 * @param target 渲染目标
 * @returns 渲染得到的真实 DOM 节点
 */
export function render(vnode: IVNode, target: HTMLElement): Node {
    // 清空目标元素的内容
    // target.innerHTML = '';

    if (vnode instanceof VTextNode) {
        // 虚拟文本节点
        let vTextNode: VTextNode = vnode as VTextNode;
        let textNode: Text = document.createTextNode(vTextNode.text);
        target.appendChild(textNode);
        return textNode;
    }
    else if (vnode instanceof VElement) {
        // 虚拟元素节点
        let vElement: VElement = vnode as VElement;
        let element = document.createElement(vElement.getTagName());
        renderProps(element, vElement.getTagProps());
        target.appendChild(element);

        for(let childNode of vElement.childNodes) {
            render(childNode, element);
        }

        return element
    }
    throw new Error('unknown node type');
}

function renderProps(element: HTMLElement, props: any): Node {
    for (const key in props) {
        if (Object.prototype.hasOwnProperty.call(props, key)) {
            if (key === 'style') {
                renderStyles(element, props[key]);
            }
            else if (props[key] instanceof Object) {
                element.setAttribute(key, JSON.stringify(props[key]));
            }
            else {
                element.setAttribute(key, props[key]);
            }
        }
    }
    return element;
}

function renderStyles(element: HTMLElement, styles: any): Node {
    for (const key in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, key)) {
            element.style.setProperty(key, styles[key]);
        }
    }
    return element;
}