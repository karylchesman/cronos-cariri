import { Repository } from "typeorm";
import { AppDataSource } from "../../infra/typeORM/connection";
import { ORMUserRole } from "../../infra/typeORM/entities/ORMUserRole";
import { UserRoleProps } from "../entities/user-role";
import { UserRoleRepositoryProtocol } from "./interfaces/user-role-repository-protocol";

class UserRoleRepository implements UserRoleRepositoryProtocol {
    private userRoleRepository: Repository<ORMUserRole>;

    constructor() {
        this.userRoleRepository = AppDataSource.getRepository(ORMUserRole);
    }

    async save(user_role: UserRoleProps) {
        const new_user_role = this.userRoleRepository.create(user_role)

        await this.userRoleRepository.save(new_user_role);

        return new_user_role;
    }

    async update(user_role: UserRoleProps) {
        user_role.updated_at = new Date();

        await this.userRoleRepository.update(String(user_role.id), user_role);

        return user_role;
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

    async deleteById(id: string) {
        await this.userRoleRepository.delete(id);

        return;
    }

}

export { UserRoleRepository }