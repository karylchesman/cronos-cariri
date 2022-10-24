import { User, UserProps } from "../../entities/user";
import { UserRepositoryProtocol } from "../../repositories/interfaces/user-repository-protocol";

export interface IUpdateUserUsecaseResquest {
    id: string;
    name: string;
    email: string;
    password: string;
}

export type IUpdateUserUsecaseResponse = UserProps;

class UpdateUserUsecase {
    constructor(
        private userRequestedUpdate: UserProps,
        private userRepository: UserRepositoryProtocol
    ) { }

    async execute({ id, name, email, password }: IUpdateUserUsecaseResquest): Promise<IUpdateUserUsecaseResponse> {
        const userExists = await this.userRepository.findById(id);

        if (!userExists) {
            throw new Error("Usuário não encontrado.");
        }

        if (this.userRequestedUpdate.id !== userExists.id) {
            throw new Error("Você não tem permissão para realizar esta ação.");
        }

        if (email !== undefined && email !== userExists.email) {
            const emailAlreadyExists = await this.userRepository.find({
                email
            })

            if (emailAlreadyExists.length > 0) {
                throw new Error("Já existe um usuário com este e-mail, por favor escolha outro.");
            }
        }

        const updated_user = new User(Object.assign(userExists, { name, email, password }));
        updated_user.validate();

        if (password !== undefined) updated_user.validatePassword();

        const updated_data = await this.userRepository.update(updated_user.getProps());

        Reflect.deleteProperty(updated_data, "password");

        return updated_data;
    }
}

export { UpdateUserUsecase }