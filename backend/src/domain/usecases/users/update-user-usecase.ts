import { EUserRoles, User, UserProps } from "../../entities/user";
import { PersonRepositoryProtocol } from "../../repositories/interfaces/person-repository-protocol";
import { UserRepositoryProtocol } from "../../repositories/interfaces/user-repository-protocol";

export interface IUpdateUserUsecaseResquest {
    id: string;
    name: string;
    email: string;
    password: string;
    role: EUserRoles;
}

export type IUpdateUserUsecaseResponse = UserProps;

class UpdateUserUsecase {
    constructor(
        private userRequestedUpdate: UserProps,
        private userRepository: UserRepositoryProtocol,
        private personRepository: PersonRepositoryProtocol
    ) { }

    async execute({ id, name, email, password, role }: IUpdateUserUsecaseResquest): Promise<IUpdateUserUsecaseResponse> {
        const userExists = await this.userRepository.findById(id);

        if (!userExists) {
            throw new Error("Usuário não encontrado.");
        }

        if (this.userRequestedUpdate.id !== userExists.id && this.userRequestedUpdate.role !== EUserRoles["Administrador"]) {
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

        const updated_user = new User(Object.assign(userExists, { name, email, password, role }));
        updated_user.validate();

        if (password !== undefined) updated_user.validatePassword();

        if (userExists.person_id) {
            const person_data = await this.personRepository.findById(userExists.person_id);

            if (person_data) {
                await this.personRepository.update(Object.assign(person_data, { name, email }));
            }
        }

        const updated_data = await this.userRepository.update(updated_user.getProps());

        Reflect.deleteProperty(updated_data, "password");

        return updated_data;
    }
}

export { UpdateUserUsecase }