import IReactive from "./IReactive"
import IResponse from "./IResponse"
import IBinding from "./IBinding"

export default class ProxyReactive<T extends object> implements IReactive<T>{
    private readonly _binding: IBinding<T>
    private readonly _listener: IResponse<any>
    private readonly proxyObject: T


    constructor(value: T, binding: IBinding<T>) {
        this._binding = binding
        this._listener = (prop, v) => {
            Reflect.set(this.proxyObject, prop, v)
            console.log("listener: ", this.proxyObject)
        }

        this.proxyObject = new Proxy<T>(value, {
            get(target, prop, receiver) {
                return Reflect.get(target, prop, receiver)
            },
            set(target, prop, v, receiver) {
                const oldValue = Reflect.get(target, prop, receiver)
                const result = Reflect.set(target, prop, v, receiver)
                const newValue = Reflect.get(target, prop, receiver)

                binding(target, prop, newValue, oldValue, receiver)

                return result
            }
        })
    }

    get binding(): IBinding<T> {
        return this._binding
    }

    get listener(): IResponse<any> {
        return this._listener
    }

    get value(): T {
        return this.proxyObject
    }
}