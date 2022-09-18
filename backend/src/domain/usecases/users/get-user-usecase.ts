import { EUserRoles, User, UserProps } from "../../entities/user";
import { UserRepositoryProtocol } from "../../repositories/interfaces/user-repository-protocol";

export type IGetUserUsecaseResponse = UserProps;

class GetUserUsecase {
    constructor(private userRepository: UserRepositoryProtocol) { }

    async execute(id: string): Promise<IGetUserUsecaseResponse> {

        const userExists = await this.userRepository.findById(id);

        if (!userExists) {
            throw new Error("Usuário não encontrado.");
        }

        Reflect.deleteProperty(userExists, "password");

        return userExists;
    }
}

export { GetUserUsecase }