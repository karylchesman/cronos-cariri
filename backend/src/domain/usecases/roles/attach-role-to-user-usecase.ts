import { UserRole, UserRoleProps } from "../../entities/user-role";
import { RoleRepositoryProtocol } from "../../repositories/interfaces/role-repository-protocol";
import { UserRepositoryProtocol } from "../../repositories/interfaces/user-repository-protocol";
import { UserRoleRepositoryProtocol } from "../../repositories/interfaces/user-role-repository-protocol";

export interface IAttachRoleToUserUsecaseResquest {
    user_id: string;
    roles_ids: string[];
}

export type IAttachRoleToUserUsecaseResponse = UserRoleProps[];

class AttachRoleToUserUsecase {
    constructor(
        private roleRepository: RoleRepositoryProtocol,
        private userRepository: UserRepositoryProtocol,
        private userRoleRepository: UserRoleRepositoryProtocol,
    ) { }

    async execute({ user_id, roles_ids }: IAttachRoleToUserUsecaseResquest): Promise<IAttachRoleToUserUsecaseResponse> {
        const userExits = await this.userRepository.findById(user_id);

        if (!userExits) {
            throw new Error("Usuário inválido ou não encontrado.");
        }

        const userRolesOfUser = await this.userRoleRepository.find({
            user_id,
        });

        let rolesIds = userRolesOfUser.map(item => item.role_id);

        const userRolesCreated: UserRoleProps[] = [];

        for await (let role_id of roles_ids) {
            if (rolesIds.includes(role_id)) continue;

            const roleExists = await this.roleRepository.findById(role_id);

            if (!roleExists) throw new Error("Um dos perfis de acesso não foi encontrado ou é inválido.");

            const new_user_role = new UserRole({ role_id, user_id });
            new_user_role.validate();
            
            const userRoleCreated = await this.userRoleRepository.save(new_user_role.getProps());

            userRolesCreated.push(userRoleCreated);
        }

        return userRolesCreated;
    }
}

export { AttachRoleToUserUsecase }