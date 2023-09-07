import IEventEmitter from "./IEventEmitter";
import EventType from "./EventType";
import IEvent from "./IEvent";

export default class Event implements IEvent {
    private readonly eventEmitter: IEventEmitter
    private readonly eventType: EventType

    constructor(eventEmitter: IEventEmitter, eventType: EventType) {
        this.eventEmitter = eventEmitter;
        this.eventType = eventType;
    }

    emit(...args: any[]): void {
        this.eventEmitter.emit(this.eventType, args)
    }
}