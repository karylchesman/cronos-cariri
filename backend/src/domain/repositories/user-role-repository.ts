import { In, Repository } from "typeorm";
import { AppDataSource } from "../../infra/typeORM/connection";
import { ORMUserRole } from "../../infra/typeORM/entities/ORMUserRole";
import { UserRoleProps } from "../entities/user-role";
import { TUserRolesStoreParams, UserRoleRepositoryProtocol } from "./interfaces/user-role-repository-protocol";

class UserRoleRepository implements UserRoleRepositoryProtocol {
    private userRoleRepository: Repository<ORMUserRole>;

    constructor() {
        this.userRoleRepository = AppDataSource.getRepository(ORMUserRole);
    }

    async store({ user_roles_to_attach, user_roles_ids_to_detach }: TUserRolesStoreParams): Promise<UserRoleProps[]> {
        const result = this.userRoleRepository.manager.transaction(async (transactionManager) => {
            const user_roles_to_save = transactionManager.create(ORMUserRole, user_roles_to_attach);

            const created = await transactionManager.save(ORMUserRole, user_roles_to_save);

            await transactionManager.delete(ORMUserRole, { id: In(user_roles_ids_to_detach) });

            return created;
        })

        return result;
    }

    async find(user_role?: Partial<UserRoleProps>) {

        const found_user_roles = await this.userRoleRepository.find({
            where: user_role
        })

        return found_user_roles;
    }

    async findById(id: string) {
        const user_role = await this.userRoleRepository.findOne({
            where: {
                id
            }
        })

        if (user_role) {
            return user_role;
        }

        return null;
    }
}

export { UserRoleRepository }