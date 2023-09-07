import IResponse from "./IResponse"
import IBinding from "./IBinding"

export default interface IReactive<T extends object> {
    get value(): T
    get binding(): IBinding<T>
    get listener(): IResponse<any>
}