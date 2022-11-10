import { isString } from "./validators";

export type TSearchObjectOperator = "=" | "<>" | "<" | ">" | "<=" | ">=" | "A*" | "*A" | "*A*";

export interface ISearchObject<T> {
    key: keyof T;
    operator: TSearchObjectOperator;
    value: string;
}

export function getWhereObject(app_operator: TSearchObjectOperator, key: string, value: string, default_alias?: string) {
    let keyHasJoin = key.split(":");

    const genderWhereString = (operator: string) => {
        if (keyHasJoin.length > 1) return `${keyHasJoin[0]}.${keyHasJoin[1]} ${operator} :${keyHasJoin[0]}_${keyHasJoin[1]}`;
        return `${default_alias}.${key} ${operator} :${default_alias}_${keyHasJoin[0]}`;
    }

    const genderWhereParamName = () => {
        if (keyHasJoin.length > 1) return `${keyHasJoin[0]}_${keyHasJoin[1]}`;
        return `${default_alias}_${keyHasJoin[0]}`
    }

    switch (app_operator) {
        case "=":
            return { where_string: genderWhereString("="), value_param: { [genderWhereParamName()]: value } };
        case "<>":
            return { where_string: genderWhereString("!="), value_param: { [genderWhereParamName()]: value } };
        case "<":
            return { where_string: genderWhereString("<"), value_param: { [genderWhereParamName()]: value } };
        case ">":
            return { where_string: genderWhereString(">"), value_param: { [genderWhereParamName()]: value } };
        case "<=":
            return { where_string: genderWhereString("<="), value_param: { [genderWhereParamName()]: value } };
        case ">=":
            return { where_string: genderWhereString(">="), value_param: { [genderWhereParamName()]: value } };
        case "A*":
            return { where_string: genderWhereString("LIKE"), value_param: { [genderWhereParamName()]: `${value}%` } };
        case "*A":
            return { where_string: genderWhereString("LIKE"), value_param: { [genderWhereParamName()]: `%${value}` } };
        case "*A*":
            return { where_string: genderWhereString("LIKE"), value_param: { [genderWhereParamName()]: `%${value}%` } };
    }
}

export function isValidSearchKey(key: any, keys: string[]) {
    isString(key, "Chave de busca inválida.");

    if (!keys.includes(key)) throw new Error("Chave de busca inválida.");

    return key;
}

export function isValidSearchOperator(operator: any) {
    isString(operator, "Operador de busca inválido.");
    if (!["=", "<>", "<", ">", "<=", ">=", "A*", "*A", "*A*"].includes(operator)) throw new Error("Operador de busca inválido.");
    return operator;
}

export function isValidSearchValue(value: any) {
    if (
        typeof value !== "string"
        && typeof value !== "number"
        && typeof value !== "boolean"
    ) {
        throw new Error("Valor de busca inválido.")
    }

    return value;
}