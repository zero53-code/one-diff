import IChange from "./IChange";

/**
 * 无变化
 *
 * @author linwukang
 */
export default class NoChange implements IChange {
    private readonly target: any

    constructor(target: any) {
        this.target = target
    }

    getTarget(): any {
        return this.target
    }

    apply(): boolean {
        return true
    }
}