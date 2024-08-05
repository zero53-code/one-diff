export default interface IWatch<T> {
    (newValue: T): void
}