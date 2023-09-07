import EventType from "./EventType"

export default interface ITypedEventEmitter<T> {
    addListener(event: EventType, listener: ITypedListener<T>): void

    emit(event: EventType, arg: T): void
}

export interface ITypedListener<T> {
    (arg: T): void
}