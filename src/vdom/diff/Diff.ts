import { Change, IChange, NoChange } from "./Change";

function diff(newValue: any, oldValue: any): IChange {
    return new Change();
}

function numberDiff(oldValue: number, newValue: number): IChange {
    if (oldValue == newValue) {
        return new NoChange();
    }
    else {
        return new class implements IChange {
            addChange(change: IChange): IChange {
                throw new Error("Method not implemented.");
            }
        }
    }
}