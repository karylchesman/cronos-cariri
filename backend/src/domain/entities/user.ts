import { UuidGender } from "../utils/uuid-gender";
import { isEmail, isEmpty, isValidLength } from "../utils/validators";
import { BaseEntity } from "./base-entity";
import { hashSync } from 'bcrypt';

export enum EUserRoles {
    "Administrador" = "Administrador",
    "Funcionário" = "Funcionário",
    "Esportista" = "Esportista"
}

class User extends BaseEntity {
    private id?: string;
    private name: string;
    private email: string;
    private password: string;
    private role: EUserRoles;
    private person_id?: string;

    constructor(user: User) {
        super(user.created_at, user.updated_at);

        this.id = user.id ? user.id : UuidGender.genderV4();
        this.name = isValidLength({ value: user.name, min: 3, max: 255, error_message: "O nome deve conter no mínimo 3 e no máximo 255 caracteres." });
        this.email = isEmail(user.email, "O e-mail deve conter formato válido.");
        this.person_id = user.person_id ? isEmpty(user.person_id, "O e-mail deve conter formato válido.") : user.person_id;

        this.password = user.password;
        this.validatePassword();
        this.role = user.role;
        this.validateRole();
    }

    private validatePassword() {
        const passwordValid = isValidLength({ value: this.password, min: 6, max: 255, error_message: "A senha deve conter no mínimo 6 e no máximo 255 caracteres." });

        const passwordHash = hashSync(passwordValid, 8);

        this.password = passwordHash;
    }

    private validateRole() {
        if (!EUserRoles[this.role]) throw new Error("Tipo de permissão inválida.");
    }
}

export { User }