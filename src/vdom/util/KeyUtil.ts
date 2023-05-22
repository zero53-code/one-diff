export type KeyType = number;

export class KeyCounter {
    private count: KeyType = 0;
    next(): KeyType {
        return this.count++;
    }
}