import EventType from "./EventType";

/**
 * 事件触发器接口
 */
export default interface IEventEmitter {
    /**
     * 添加事件监听器
     * @param event 事件类型
     * @param listener 监听器
     */
    addListener(event: EventType, listener: Function): void

    /**
     * 触发事件
     * @param event 事件类型
     * @param args 监听器实参
     */
    emit(event: EventType, ...args: any[]): void
}