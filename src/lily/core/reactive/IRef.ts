import IWatch from "./IWatch"

export default interface IRef<T extends number | string | symbol | boolean | null | undefined> {
    value: T

    get binding(): IWatch<T>
}

