import IRef from "./IRef";
import IWatch from "./IWatch";

export default class Ref<T extends number | string | symbol | boolean | null | undefined> implements IRef<T> {
    get value(): T {
        return this._value
    }

    set value(v: T) {
        this._value = v
    }
    private _value: T

    get binding(): IWatch<T> {
        return this._binding
    }
    private readonly _binding: IWatch<T>

    constructor(value: T, binding: IWatch<T>) {
        this._value = value
        const that = this
        Object.defineProperty(this, "value", {
            get(): any {
                return this._value
            },
            set(v: T) {
                that._value = v
                binding(this._value)
            }
        })
        this._binding = binding
    }
}