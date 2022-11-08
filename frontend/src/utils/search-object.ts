export type TSearchObjectOperator = "=" | "<" | ">" | "<=" | "=>" | "A*" | "*A" | "*A*";

export interface SearchObject<T> {
    alias: string;
    key: keyof T;
    operator: string;
    value: string;
}