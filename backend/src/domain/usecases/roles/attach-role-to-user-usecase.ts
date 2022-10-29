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

        let rolesIdsOfUser = userRolesOfUser.map(item => item.role_id);
        
        let rolesIdsToAttach = roles_ids.filter(item => {
            if (!rolesIdsOfUser.includes(item)) {
                return item;
            }
        })

        let userRolesIdsToDetach = userRolesOfUser.filter(item => {
            if (roles_ids.includes(item.role_id)) {
                return item;
            }
        }).map(item => item.id);

        const userRolesCreated: UserRoleProps[] = [];

        for await (let role_id of rolesIdsToAttach) {
            const roleExists = await this.roleRepository.findById(role_id);

            if (!roleExists) throw new Error("Um dos perfis de acesso não foi encontrado ou é inválido.");

            const new_user_role = new UserRole({ role_id, user_id });
            new_user_role.validate();

            const userRoleCreated = await this.userRoleRepository.save(new_user_role.getProps());

            userRolesCreated.push(userRoleCreated);
        }

        for await (let user_role_id of userRolesIdsToDetach) {
            if (user_role_id) {
                await this.userRoleRepository.deleteById(user_role_id);
            }
        }

        return userRolesCreated;
    }
}

export { AttachRoleToUserUsecase }