export default interface IBinding<T> {
    (o: T, prop: string | symbol, newValue: any, oldValue: any, receiver?: any): void
}