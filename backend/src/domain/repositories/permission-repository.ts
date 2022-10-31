import { In, Repository } from "typeorm";
import { AppDataSource } from "../../infra/typeORM/connection";
import { ORMPermission } from "../../infra/typeORM/entities/ORMPermission";
import { PermissionProps } from "../entities/permission";
import { getWhereString, SearchObject } from "../utils/search-object";
import { PermissionRepositoryProtocol, TPermissionOrderByFields } from "./interfaces/permission-repository-protocol";

class PermissionRepository implements PermissionRepositoryProtocol {
    private permissionRepository: Repository<ORMPermission>;

    constructor() {
        this.permissionRepository = AppDataSource.getRepository(ORMPermission);
    }

    async save(permission: PermissionProps) {
        const new_permission = this.permissionRepository.create(permission)

        await this.permissionRepository.save(new_permission);

        return new_permission;
    }

    async update(permission: PermissionProps) {
        permission.updated_at = new Date();

        await this.permissionRepository.update(String(permission.id), permission);

        return permission;
    }

    async find(permission?: Partial<PermissionProps>) {

        const found_permissions = await this.permissionRepository.find({
            where: permission
        })

        return found_permissions;
    }

    async search(search_params?: SearchObject<PermissionProps>[] | string, page?: number, limit?: number, order_by?: TPermissionOrderByFields, order?: "ASC" | "DESC") {

        const query = this.permissionRepository.createQueryBuilder("permissions").select("permissions");

        if (search_params !== undefined) {
            if (typeof search_params === "string") {
                query.where(`name LIKE :permission_name`, { permission_name: `%${search_params}%` });
            }

            if (Array.isArray(search_params)) {
                search_params.forEach((item, idx) => {
                    let search_object = getWhereString(item.operator, item.key, item.value, "permissions");

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

        const permissions_found = await query.getManyAndCount();

        return {
            permissions: permissions_found[0],
            registers: permissions_found[1]
        };
    }

    async findById(id: string) {
        const permission = await this.permissionRepository.findOne({
            where: {
                id
            }
        })

        if (permission) {
            return permission;
        }

        return null;
    }

    async findByIdList(ids: string[]) {
        const permissions = await this.permissionRepository.find({
            where: {
                id: In(ids)
            }
        })

        return permissions;
    }

    async deleteById(id: string) {
        await this.permissionRepository.delete(id);

        return;
    }

}

export { PermissionRepository }