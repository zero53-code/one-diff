export type KeyType = number | string | undefined

export class KeyCounter {
    private count: number = 0
    next(): KeyType {
        return this.count++
    }
}