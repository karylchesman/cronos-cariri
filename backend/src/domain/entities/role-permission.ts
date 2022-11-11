import { UuidGender } from "../utils/uuid-gender";
import { isEmpty } from "../utils/validators";
import { BaseEntityProps } from "./base-entity";

export interface RolePermissionProps extends BaseEntityProps {
    id?: string;
    role_id: string;
    permission_id: string;
}

class RolePermission {
    private props: RolePermissionProps;

    constructor(props: RolePermissionProps) {
        if (!props.id) {
            props.id = UuidGender.genderV4();
        }

        this.props = props;
    }

    public validate() {
        isEmpty(this.props.role_id, "Tipo de perfil não definido.");
        isEmpty(this.props.permission_id, "Permissão não definida.");
    }

    public getProps(){
        return this.props;
    }
}

export { RolePermission }