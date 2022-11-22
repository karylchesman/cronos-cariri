import dayjs from 'dayjs';

interface IisValidLengthParams {
    value: string;
    min: number;
    max: number;
    error_message: string;
}

export const isNullOrUndefined = (value: string) => {
    if (["undefined", undefined, "null", null].includes(value)) return true;
    return false;
}

export const isString = (value: any, error_message: string) => {
    if (typeof value !== "string") throw new Error(error_message);

    return value;
}

export const isBoolean = (value: any, error_message: string) => {
    if (typeof value !== "boolean") throw new Error(error_message);

    return value;
}

export const isNumber = (value: any, error_message: string) => {
    if (typeof value !== "number") throw new Error(error_message);
    if (Number.isNaN(Number(value))) throw new Error(error_message);
    return value;
}

export const isEmpty = (value: string, error_message: string) => {
    if (typeof value !== "string") throw new Error(error_message);
    if (isNullOrUndefined(value) || value.trim() === "") throw new Error(error_message);

    return value;
}

export const isArray = (value: any, error_message: string) => {
    if (!Array.isArray(value)) throw new Error(error_message);

    return value;
}

export const isValidLength = ({ value, min = 0, max, error_message }: IisValidLengthParams) => {

    if (isNullOrUndefined(value)) {
        throw new Error(error_message);
    }

    if (value === null || value === undefined) throw new Error(error_message);
    if (value.length < min || value.length > max) throw new Error(error_message);

    return value;
}

export const isEmail = (value: string, error_message: string) => {
    if (isNullOrUndefined(value) || value.trim() === "") throw new Error(error_message);

    const emailRegexp = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);

    if (!emailRegexp.test(value)) {
        throw new Error(error_message);
    }

    return value;
}

export const isPhoneNumber = (value: string, error_message: string) => {
    if (isNullOrUndefined(value) || value.trim() === "") throw new Error(error_message);

    const phoneRegexp = new RegExp(/^\(?[1-9]{2}\)?\s?([9]{1})?\s?[0-9]{4}-?[0-9]{4}$/);

    if (!phoneRegexp.exec(value)) {
        throw new Error(error_message);
    }

    return value;
}

export const isCPF = (value: string, error_message: string) => {
    if (isNullOrUndefined(value) || value.trim() === "") throw new Error(error_message);

    const cpfRegexp = new RegExp(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/);

    if (!cpfRegexp.test(value)) {
        throw new Error(error_message);
    }

    return value
}

export const isBloodType = (value: string, error_message: string) => {
    if (isNullOrUndefined(value) || value.trim() === "") throw new Error(error_message);

    const cpfRegexp = new RegExp(/^([ABO]{1})([B+-]{1})([+-]{0,1})$/)

    if (!cpfRegexp.test(value)) {
        throw new Error(error_message);
    }

    return value
}

export const isValidBithDate = (value: Date | string, error_message: string) => {
    let date = dayjs(value);

    if (date.isValid() === false && (dayjs().diff(date, "year")) < 18) throw new Error(error_message);

    return date.toDate();
}

export const isDateAfterToday = (value: Date | string, error_message: string) => {
    let date = dayjs(value);

    if (!date.isAfter(dayjs())) throw new Error(error_message);

    return date.toDate();
}

export const isDateAfter = (value: Date | string, toCompare: Date | string, error_message: string) => {
    let date1 = dayjs(value);
    let date2 = dayjs(toCompare);

    if (!date1.isAfter(date2)) throw new Error(error_message);

    return date1.toDate();
}