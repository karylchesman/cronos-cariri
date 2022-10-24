import { UuidGender } from "../utils/uuid-gender";
import { isCPF, isEmail, isEmpty, isPhoneNumber, isValidBithDate, isValidLength } from "../utils/validators";
import { BaseEntityProps } from "./base-entity";

export enum EPersonGender {
    "Masculino" = "Masculino",
    "Feminino" = "Feminino"
}

export interface PersonProps extends BaseEntityProps {
    id?: string;
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
}

class Person {
    private props: PersonProps;

    constructor(props: PersonProps) {
        if (!props.id) {
            props.id = UuidGender.genderV4();
        }

        this.props = props;
    }

    public validate() {
        isPhoneNumber(this.props.phonenumber1, "O número de contato 1 deve conter formato válido.");
        this.props.phonenumber2 && isPhoneNumber(this.props.phonenumber2, "O número de contato 2 deve conter formato válido.");
        isCPF(this.props.cpf, "O e-mail deve conter formato válido.");
        this.props.rg && isEmpty(this.props.rg, "O e-mail deve conter formato válido.");
        isValidBithDate(this.props.bith_date, "Data de nascimento inválida.");
        this.props.blood_type && isEmpty(this.props.blood_type, "O tipo de sangue deve estar preenchido corretamente.");
        isValidLength({ value: this.props.address_street, min: 2, max: 255, error_message: "O nome da rua deve conter no mínimo 2 no máximo 255 caracteres." });
        isValidLength({ value: this.props.address_number, min: 2, max: 255, error_message: "O número da residência deve conter no mínimo 2 no máximo 255 caracteres." });
        isValidLength({ value: this.props.address_district, min: 2, max: 255, error_message: "O nome do bairro deve conter no mínimo 2 no máximo 255 caracteres." });
        isValidLength({ value: this.props.address_city, min: 2, max: 255, error_message: "O nome da cidade deve conter no mínimo 2 no máximo 255 caracteres." });
        isValidLength({ value: this.props.address_uf, min: 2, max: 2, error_message: "O UF do estado deve conter 2 caracteres." });
        isValidLength({ value: this.props.address_cep, min: 8, max: 8, error_message: "O CEP deve conter 8 caracteres." });

        this.validateGender();
    }

    private validateGender() {
        if (!EPersonGender[this.props.gender]) throw new Error("O sexo deve estar preenchido corretamente.")
    }

    getProps() {
        return this.props;
    }
}

export { Person }