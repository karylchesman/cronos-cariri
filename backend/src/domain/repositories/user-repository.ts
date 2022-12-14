import { Repository } from "typeorm";
import { AppDataSource } from "../../infra/typeORM/connection";
import { ORMUser } from "../../infra/typeORM/entities/ORMUser";
import { UserProps } from "../entities/user";
import { getWhereObject, ISearchObject } from "../utils/search-object";
import { TUserOrderByFields, TUserSearchProps, UserRepositoryProtocol } from "./interfaces/user-repository-protocol";

class UserRepository implements UserRepositoryProtocol {
    private userRepository: Repository<ORMUser>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(ORMUser);
    }

    async save(user: UserProps) {
        const new_user = this.userRepository.create(user)

        await this.userRepository.save(new_user);

        return new_user;
    }

    async update(user: UserProps) {
        user.updated_at = new Date();

        await this.userRepository.update(String(user.id), user);

        return user;
    }

    async find(user?: Partial<UserProps>) {

        const found_users = await this.userRepository.find({
            where: user
        })

        return found_users;
    }

    async findById(id: string) {
        const user = await this.userRepository.findOne({
            where: {
                id
            }
        })

        if (user) {
            return user;
        }

        return null;
    }

    async search(search_params?: ISearchObject<TUserSearchProps>[] | string, page?: number, limit?: number, order_by?: TUserOrderByFields, order?: "ASC" | "DESC") {

        const query = this.userRepository.createQueryBuilder("users")
            .leftJoinAndSelect("users.person", "person")

        if (search_params !== undefined) {
            if (typeof search_params === "string") {
                query.where(`name LIKE :users_name`, { users_name: `%${search_params}%` });
                query.orWhere(`email LIKE :users_email`, { users_email: `%${search_params}%` });
                query.orWhere(`person.cpf LIKE :person_cpf`, { person_cpf: `%${search_params}%` });
            }

            if (Array.isArray(search_params)) {
                search_params.forEach((item, idx) => {
                    let search_object = getWhereObject(item.operator, item.key, item.value, "users");

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
            let orderByHasJoin = order_by.split(":");

            if (orderByHasJoin.length > 1) {
                query.addOrderBy(`${orderByHasJoin[0]}.${orderByHasJoin[1]}`, order);
            } else {
                query.addOrderBy(`users.${orderByHasJoin[0]}`, order);
            }
        }

        const users_found = await query.getManyAndCount();

        return {
            users: users_found[0],
            registers: users_found[1]
        };
    }

    async deleteById(id: string) {
        await this.userRepository.delete(id);

        return;
    }

}

export { UserRepository }