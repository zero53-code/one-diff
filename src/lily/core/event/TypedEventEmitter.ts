import EventType from "./EventType";
import ITypedEventEmitter, {ITypedListener} from "./ITypedEventEmitter";

export default class TypedEventEmitter<T> implements ITypedEventEmitter<T> {
    private readonly listeners: { [key: EventType]: ITypedListener<T>[] } = {}

    addListener(event: EventType, listener: ITypedListener<T>): void {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        this.listeners[event].push(listener)
    }

    emit(event: EventType, arg: T): void {
        let eventListeners = this.listeners[event]
        if (!!eventListeners) {
            for (const eventListener of eventListeners) {
                eventListener.apply(null, [arg])
            }
        }
    }
}