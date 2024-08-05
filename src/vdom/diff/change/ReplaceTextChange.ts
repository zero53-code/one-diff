import IChange from "./IChange";

/**
 * 文本节点的文本替换
 *
 * @author zero53
 */
export default class ReplaceTextChange implements IChange {
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