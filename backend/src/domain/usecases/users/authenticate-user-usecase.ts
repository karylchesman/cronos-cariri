import { compare } from "bcrypt";
import { UserProps } from "../../entities/user";
import { UserRepositoryProtocol } from "../../repositories/interfaces/user-repository-protocol";
import { TokenGender } from "../../utils/token-gender";
import { isEmpty } from "../../utils/validators";

export type IAuthenticateUserUsecaseRequest = {
    email: string;
    password: string;
}

export type IAuthenticateUserUsecaseResponse = {
    user: UserProps
    token: {
        access_token: string;
        expires_in: Date;
    }
};

class AuthenticateUserUsecase {
    constructor(private userRepository: UserRepositoryProtocol) { }

    async execute({ email, password }: IAuthenticateUserUsecaseRequest): Promise<IAuthenticateUserUsecaseResponse> {

        isEmpty(email, "Preencha o e-mail corretamente.");
        isEmpty(password, "Preencha a senha corretamente.");

        const [userExists] = await this.userRepository.find({ email });

        if (!userExists) {
            throw new Error("E-mail ou senha inválidos.");
        }

        const passwordMatch = await compare(password, userExists.password);

        if (!passwordMatch) {
            throw new Error("E-mail  ou senha inválidos.");
        }

        Reflect.deleteProperty(userExists, "password");

        const token = TokenGender.getSessionToken({
            user_id: userExists.id ? userExists.id : ""
        })

        return {
            user: userExists,
            token
        };
    }
}

export { AuthenticateUserUsecase }