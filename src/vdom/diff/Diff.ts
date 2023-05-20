import { IVNode } from "../VNode";
import { Change, IChange, NoChange } from "./Change";

function diff(newValue: IVNode, oldValue: IVNode): IChange {
    return new Change();
}