import { UuidGender } from "../utils/uuid-gender";
import { isValidLength } from "../utils/validators";
import { BaseEntityProps } from "./base-entity";

export interface RoleProps extends BaseEntityProps {
    id?: string;
    name: string;
}

class Role {
    private props: RoleProps;

    constructor(props: RoleProps) {
        if (!props.id) {
            props.id = UuidGender.genderV4();
        }

        this.props = props;
    }

    public validate() {
        isValidLength({ value: this.props.name, min: 3, max: 255, error_message: "Nome para o tipo de perfil deve conter no mínimo 3 e no máximo 255 carecteres." })
    }

    public getProps(){
        return this.props;
    }
}

export { Role }