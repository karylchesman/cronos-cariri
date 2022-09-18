import { UuidGender } from "../utils/uuid-gender";
import { isEmail, isEmpty, isValidLength } from "../utils/validators";
import { BaseEntityProps } from "./base-entity";
import { hashSync } from 'bcrypt';
import { Person, PersonProps } from "./person";

export enum EUserRoles {
    "Administrador" = "Administrador",
    "Funcionário" = "Funcionário",
    "Esportista" = "Esportista"
}

export interface UserProps extends BaseEntityProps {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: EUserRoles;
    person_id?: string;
    person?: PersonProps | undefined;
}

class User {
    private props: UserProps;

    constructor(props: UserProps) {
        if (!props.id) {
            props.id = UuidGender.genderV4();
        }

        this.props = props;
    }

    private hashPassword() {
        const passwordHash = hashSync(this.props.password, 8);

        this.props.password = passwordHash;
    }

    public validatePassword() {
        isValidLength({ value: this.props.password, min: 6, max: 255, error_message: "A senha deve conter no mínimo 6 e no máximo 255 caracteres." });
    }

    public validate() {
        isValidLength({ value: this.props.name, min: 3, max: 255, error_message: "O nome deve conter no mínimo 3 e no máximo 255 caracteres." });
        isEmail(this.props.email, "O e-mail deve conter formato válido.");
        if (!EUserRoles[this.props.role]) throw new Error("Tipo de permissão inválida.");
    }

    getProps() {
        this.props.password && this.hashPassword();
        return this.props;
    }
}

export { User }