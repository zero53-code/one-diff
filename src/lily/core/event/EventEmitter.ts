import IEventEmitter from "./IEventEmitter";
import EventType from "./EventType";

export default class EventEmitter implements IEventEmitter {
    private readonly listeners: {[key: EventType]: Function[]} = {};

    addListener(event: EventType, listener: Function): void {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }
        this.listeners[event].push(listener)
    }

    emit(event: EventType, ...args: any[]): void {
        let eventListeners = this.listeners[event]
        if (!!eventListeners) {
            for (const eventListener of eventListeners) {
                eventListener.apply(null, args)
            }
        }
    }
}