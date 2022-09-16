import { UuidGender } from "../utils/uuid-gender";
import { isCPF, isEmail, isEmpty, isPhoneNumber, isValidBithDate, isValidLength } from "../utils/validators";
import { BaseEntity } from "./base-entity";

export enum EPersonGender {
    "Masculino" = "Masculino",
    "Feminino" = "Feminino"
}

class Person extends BaseEntity {
    private id?: string;
    private name: string;
    private email: string;
    private phonenumber1: string;
    private phonenumber2?: string;
    private gender: string;
    private cpf: string;
    private rg?: string;
    private bith_date: Date;
    private blood_type?: string;
    private address_street: string;
    private address_number: string;
    private address_district: string;
    private address_city: string;
    private address_uf: string;
    private address_cep: string;

    constructor(person: Person) {
        super(person.created_at, person.updated_at);

        this.id = person.id ? person.id : UuidGender.genderV4();
        this.name = isValidLength({ value: person.name, min: 3, max: 255, error_message: "O nome deve conter no mínimo 3 no máximo 255 caracteres." });
        this.email = isEmail(person.email, "O e-mail deve conter formato válido.");
        this.phonenumber1 = isPhoneNumber(person.phonenumber1, "O número de contato 1 deve conter formato válido.");
        this.phonenumber2 = person.phonenumber2 ? isPhoneNumber(person.phonenumber2, "O número de contato 2 deve conter formato válido.") : person.phonenumber2;
        this.gender = isEmpty(person.gender, "O sexo deve estar preenchido corretamente.");
        this.cpf = isCPF(person.cpf, "O e-mail deve conter formato válido.");
        this.rg = person.rg ? isEmpty(person.rg, "O e-mail deve conter formato válido.") : person.rg;
        this.bith_date = isValidBithDate(person.bith_date, "Data de nascimento inválida.");
        this.blood_type = person.blood_type ? isEmpty(person.blood_type, "O tipo de sangue deve estar preenchido corretamente.") : person.blood_type;
        this.address_street = isValidLength({ value: person.address_street, min: 2, max: 255, error_message: "O nome da rua deve conter no mínimo 2 no máximo 255 caracteres." });
        this.address_number = isValidLength({ value: person.address_number, min: 2, max: 255, error_message: "O número da residência deve conter no mínimo 2 no máximo 255 caracteres." });
        this.address_district = isValidLength({ value: person.address_district, min: 2, max: 255, error_message: "O nome do bairro deve conter no mínimo 2 no máximo 255 caracteres." });
        this.address_city = isValidLength({ value: person.address_city, min: 2, max: 255, error_message: "O nome da cidade deve conter no mínimo 2 no máximo 255 caracteres." });
        this.address_uf = isValidLength({ value: person.address_uf, min: 2, max: 2, error_message: "O UF do estado deve conter 2 caracteres." });
        this.address_cep = isValidLength({ value: person.address_cep, min: 8, max: 8, error_message: "O CEP deve conter 8 caracteres." });
    }
}

export { Person }