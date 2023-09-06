interface IReactive<T> {
    value: T
    change(newValue: T, oldValue: T): void

}