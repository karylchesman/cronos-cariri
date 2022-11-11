export type PrefixKeys<T, K extends string> = {
    [Property in keyof T as `${K}:${string & Property}`]: T[Property]
}