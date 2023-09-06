/**
 * @author linwukang
 */

import {KeyCounter} from "../util/KeyUtil"
import AbstractVElementNode from "./AbstractVElementNode";
import VTextNode from "./VTextNode";

let keyCounter = new KeyCounter()

/**
 * 虚拟节点
 *
 * @author linwukang
 */
type VNode =
    | AbstractVElementNode     // 虚拟 DOM 元素节点
    | VTextNode     // 文本节点

export default VNode

