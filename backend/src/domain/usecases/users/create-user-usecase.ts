import { EUserRoles, User, UserProps } from "../../entities/user";
import { UserRepositoryProtocol } from "../../repositories/interfaces/user-repository-protocol";

export interface ICreateUserUsecaseResquest {
    name: string;
    email: string;
    password: string;
    role: EUserRoles;
}

export type ICreateUserUsecaseResponse = UserProps;


class CreateUserUsecase {
    constructor(private userRepository: UserRepositoryProtocol) { }

    async execute({ name, email, password, role }: ICreateUserUsecaseResquest): Promise<ICreateUserUsecaseResponse> {
        const new_user = new User({ name, email, password, role });

        new_user.validate();
        new_user.validatePassword();

        const emailAlreadyExists = await this.userRepository.find({
            email
        })

        if (emailAlreadyExists.length > 0) {
            throw new Error("Já existe um usuário com este e-mail, por favor escolha outro.");
        }

        const saved_user = await this.userRepository.save(new_user.getProps());

        Reflect.deleteProperty(saved_user, "password");

        return saved_user;
    }
}

export { CreateUserUsecase }