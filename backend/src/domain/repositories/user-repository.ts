import { Repository } from "typeorm";
import { AppDataSource } from "../../infra/typeORM/connection";
import { ORMUser } from "../../infra/typeORM/entities/ORMUser";
import { UserProps } from "../entities/user";
import { getWhereString, SearchObject } from "../utils/search-object";
import { UserRepositoryProtocol } from "./interfaces/user-repository-protocol";

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

    async search(search_params?: SearchObject<UserProps>[], page?: number, limit?: number) {

        const query = this.userRepository.createQueryBuilder("users").select("users");

        if (search_params !== undefined) {
            search_params.forEach((item, idx) => {
                let search_object = getWhereString(item.operator, item.key, item.value, "users");

                if (idx === 0) {
                    query.where(search_object.where_string, search_object.value_param);
                } else {
                    query.andWhere(search_object.where_string, search_object.value_param);
                }
            })
        }
        
        if (limit !== undefined && page !== undefined) {
            let skip = (page - 1) * limit

            query.skip(skip);
            query.limit(limit);
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