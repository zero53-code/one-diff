export default interface IBinding<T> {
    /**
     * @param o 
     */
    (o: T, prop: string | symbol, newValue: any, oldValue: any, receiver?: any): void
}