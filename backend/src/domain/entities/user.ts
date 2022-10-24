import { UuidGender } from "../utils/uuid-gender";
import { isEmail, isValidLength } from "../utils/validators";
import { BaseEntityProps } from "./base-entity";
import { hashSync } from 'bcrypt';
import { PersonProps } from "./person";

export interface UserProps extends BaseEntityProps {
    id?: string;
    name: string;
    email: string;
    password: string;
    person_id?: string;
    person?: PersonProps | undefined;
    permissions?: string[];
    roles?: string[];
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
    }

    getProps() {
        this.props.password && this.hashPassword();
        return this.props;
    }

    setPerson(person: PersonProps) {
        this.props.person = person;
        this.props.person_id = person.id;
    }

    setRoles(roles: string[]) {
        this.props.roles = roles;
    }

    setPermissions(permissions: string[]) {
        this.props.permissions = permissions;
    }
}

export { User }