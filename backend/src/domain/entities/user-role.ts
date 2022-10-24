import { UuidGender } from "../utils/uuid-gender";
import { isEmpty } from "../utils/validators";
import { BaseEntityProps } from "./base-entity";

export interface UserRoleProps extends BaseEntityProps {
    id?: string;
    role_id: string;
    user_id: string;
}

class UserRole {
    private props: UserRoleProps;

    constructor(props: UserRoleProps) {
        if (!props.id) {
            props.id = UuidGender.genderV4();
        }

        this.props = props;
    }

    public validate() {
        isEmpty(this.props.role_id, "Papel não definido.");
        isEmpty(this.props.user_id, "Usuário não definido.");
    }

    public getProps(){
        return this.props;
    }
}

export { UserRole }