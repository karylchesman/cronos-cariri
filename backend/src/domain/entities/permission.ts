import { UuidGender } from "../utils/uuid-gender";
import { isEmpty, isValidLength } from "../utils/validators";
import { BaseEntityProps } from "./base-entity";

export interface PermssionProps extends BaseEntityProps{
    id?: string;
    name: string;
    identifier: string;
}

class Permssion {
    private props: PermssionProps;

    constructor(props: PermssionProps) {
        if (!props.id) {
            props.id = UuidGender.genderV4();
        }

        this.props = props;
    }

    public validate() {
        isValidLength({ value: this.props.name, min: 3, max: 255, error_message: "Nome para permissão deve conter no mínimo 3 e no máximo 255 carecteres." })
        isEmpty(this.props.identifier, "Identificador inválido.");
    }

    public getProps(){
        return this.props;
    }
}

export { Permssion }