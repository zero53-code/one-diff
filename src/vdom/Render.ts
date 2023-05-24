/**
 * @author linwukang
 */

import { IVNode, VElementNode, VTextNode } from "./VNode";

/**
 * 将虚拟节点渲染到真实 DOM 元素上
 * @param vnode 需要渲染的虚拟节点
 * @param target 渲染目标
 * @returns 渲染得到的真实 DOM 节点
 * 
 * @author linwukang
 */
export function renderTo(vnode: IVNode, target: HTMLElement): Node {
    return target.appendChild(render(vnode));
}

/**
 * 将虚拟节点渲染为真实 DOM 元素
 * @param vnode 需要渲染的虚拟节点
 * @returns 渲染得到的真实 DOM 节点
 * 
 * @author linwukang
 */
export function render(vnode: IVNode): Node {
    if (vnode instanceof VTextNode) {
        // 虚拟文本节点
        let vTextNode: VTextNode = vnode as VTextNode;
        let textNode: Text = document.createTextNode(vTextNode.getText());
        vTextNode.node = textNode;
        return textNode;
    }
    else if (vnode instanceof VElementNode) {
        // 虚拟元素节点
        let vElement: VElementNode = vnode as VElementNode;
        let element = document.createElement(vElement.getTagName());
        renderProps(element, vElement.getTagProps());

        vElement
            .getChildren()
            .map(childNode => render(childNode))
            .forEach(node => element.appendChild(node))


        vElement.node = element;
        return element
    }
    throw new Error('unknown node type');
}

/**
 * 向真实 DOM 元素上渲染属性
 * @param element 真实 DOM 元素
 * @param props 需要渲染的属性
 * @returns 真实 DOM 节点
 * 
 * @author linwukang
 */
export function renderProps(element: HTMLElement, props: any): Node {
    for (const key in props) {
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
    return element;
}

/**
 * 向真实 DOM 元素上渲染样式
 * @param element 真实 DOM 元素
 * @param styles 需要渲染的样式
 * @returns 真实 DOM 节点
 * 
 * @author linwukang
 */
export function renderStyles(element: HTMLElement, styles: any): Node {
    for (const key in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, key)) {
            element.style.setProperty(key, styles[key]);
        }
    }
    return element;
}