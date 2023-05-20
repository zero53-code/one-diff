/**
 * 变化接口
 * 用于记录对象和值的变化
 */
interface IChange {
    /**
     * 添加新的变化并返回，该操作不会修改自身
     * @param change 新增的变化
     * @returns 新增后的变化
     */
    addChange(change: IChange): IChange;
}

/**
 * 通用变化类
 */
class Change implements IChange {
    change: IChange | null;
    constructor(change?: IChange) {
        this.change = change == undefined ? null : change;
    }

    addChange(change: IChange): IChange {
        if (this.change == null) {
            return new Change(change);
        } else {
            return this.change.addChange(change);
        }
    }

}

/**
 * 没有变化
 */
class NoChange implements IChange {
    addChange(change: IChange): IChange {
        return change;
    }

}

class ValueChange implements IChange {
    from: any;
    to: any;
    

    addChange(change: IChange): IChange {
        throw new Error("Method not implemented.");
    }
}


export {
    IChange,
    Change,
    NoChange
}