export type TSearchObjectOperator = "=" | "<>" | "<" | ">" | "<=" | ">=" | "A*" | "*A" | "*A*";

export interface SearchObject<T> {
    alias: string;
    key: keyof T;
    operator: string;
    value: string | number | boolean;
}

export type TOperatorObject = {
    [k: string]: {
        types_allowed: string[],
        alias: string
    }
}