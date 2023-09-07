export default interface IResponse<T> {
    (prop: string | symbol, value: T): void
}