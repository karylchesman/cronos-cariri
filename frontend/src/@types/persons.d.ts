export export enum EPersonGender {
    "Masculino" = "Masculino",
    "Feminino" = "Feminino"
}

export interface IPerson {
    id?: string;
    name: string;
    email: string;
    phonenumber1: string;
    phonenumber2?: string;
    gender: EPersonGender;
    cpf: string;
    rg?: string;
    bith_date: Date;
    blood_type?: string;
    address_street: string;
    address_number: string;
    address_district: string;
    address_city: string;
    address_uf: string;
    address_cep: string;
    created_at: Date;
    updated_at: Date;
}
