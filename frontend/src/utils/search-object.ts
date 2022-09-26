export type TSearchObjectOperator = "=" | "<" | ">" | "<=" | "=>" | "A*" | "*A" | "*A*";

export interface SearchObject<T> {
    key: keyof T;
    operator: TSearchObjectOperator;
    value: string;
}