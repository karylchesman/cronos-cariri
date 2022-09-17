export type TSearchObjectOperator = "=" | "<" | ">" | "<=" | "=>" | "A*" | "*A" | "*A*";

export interface SearchObject<T> {
    key: keyof T;
    operator: TSearchObjectOperator;
    value: string;
}

export function getWhereString(app_operator: TSearchObjectOperator, key: string, value: string, alias: string) {
    switch (app_operator) {
        case "=":
            return { where_string: `${key} = :${alias}_${key}`, value_param: { [`users_${key}`]: value } };
        case "<":
            return { where_string: `${key} < :${alias}_${key}`, value_param: { [`users_${key}`]: value } };
        case ">":
            return { where_string: `${key} > :${alias}_${key}`, value_param: { [`users_${key}`]: value } };
        case "<=":
            return { where_string: `${key} <= :${alias}_${key}`, value_param: { [`users_${key}`]: value } };
        case "=>":
            return { where_string: `${key} => :${alias}_${key}`, value_param: { [`users_${key}`]: value } };
        case "A*":
            return { where_string: `${key} LIKE :${alias}_${key}`, value_param: { [`users_${key}`]: `${value}%` } };
        case "*A":
            return { where_string: `${key} LIKE :${alias}_${key}`, value_param: { [`users_${key}`]: `%${value}` } };
        case "*A*":
            return { where_string: `${key} LIKE :${alias}_${key}`, value_param: { [`users_${key}`]: `%${value}%` } };
    }
}