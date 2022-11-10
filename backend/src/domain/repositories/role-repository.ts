import { In, Repository } from "typeorm";
import { AppDataSource } from "../../infra/typeORM/connection";
import { ORMRole } from "../../infra/typeORM/entities/ORMRole";
import { RoleProps } from "../entities/role";
import { getWhereString, ISearchObject } from "../utils/search-object";
import { RoleRepositoryProtocol, TRoleOrderByFields } from "./interfaces/role-repository-protocol";

class RoleRepository implements RoleRepositoryProtocol {
    private roleRepository: Repository<ORMRole>;

    constructor() {
        this.roleRepository = AppDataSource.getRepository(ORMRole);
    }

    async save(role: RoleProps) {
        const new_role = this.roleRepository.create(role)

        await this.roleRepository.save(new_role);

        return new_role;
    }

    async update(role: RoleProps) {
        role.updated_at = new Date();

        await this.roleRepository.update(String(role.id), role);

        return role;
    }

    async find(role?: Partial<RoleProps>) {

        const found_roles = await this.roleRepository.find({
            where: role
        })

        return found_roles;
    }

    async search(search_params?: ISearchObject<RoleProps>[] | string, page?: number, limit?: number, order_by?: TRoleOrderByFields, order?: "ASC" | "DESC") {

        const query = this.roleRepository.createQueryBuilder("roles").select("roles");

        if (search_params !== undefined) {
            if (typeof search_params === "string") {
                query.where(`name LIKE :roles_name`, { roles_name: `%${search_params}%` });
            }

            if (Array.isArray(search_params)) {
                search_params.forEach((item, idx) => {
                    let search_object = getWhereString(item.operator, item.key, item.value, "roles");

                    if (idx === 0) {
                        query.where(search_object.where_string, search_object.value_param);
                    } else {
                        query.andWhere(search_object.where_string, search_object.value_param);
                    }
                })
            }
        }

        if (limit !== undefined && page !== undefined) {
            let skip = (page - 1) * limit

            query.skip(skip);
            query.take(limit);
        }

        if (order_by !== undefined && order !== undefined) {
            query.addOrderBy(order_by, order);
        }

        const roles_found = await query.getManyAndCount();

        return {
            roles: roles_found[0],
            registers: roles_found[1]
        };
    }

    async findById(id: string) {
        const role = await this.roleRepository.findOne({
            where: {
                id
            }
        })

        if (role) {
            return role;
        }

        return null;
    }

    async findByIdList(ids: string[]) {
        const roles = await this.roleRepository.find({
            where: {
                id: In(ids)
            }
        })

        return roles;
    }

    async deleteById(id: string) {
        await this.roleRepository.delete(id);

        return;
    }

}

export { RoleRepository }