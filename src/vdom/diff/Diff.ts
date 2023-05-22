import { IVNode } from "../VNode";
import { IChange, NoChange } from "./Change";

function diff(newValue: IVNode, oldValue: IVNode): IChange {
    if (newValue === oldValue) {
        return new NoChange(newValue.getNode() as Node);
    }

    throw new Error("not implemented");
}