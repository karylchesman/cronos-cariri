import { UserProps } from "../../entities/user";
import { PersonRepositoryProtocol } from "../../repositories/interfaces/person-repository-protocol";
import { UserRepositoryProtocol } from "../../repositories/interfaces/user-repository-protocol";

export type IGetUserUsecaseResponse = UserProps;

class GetUserUsecase {
    constructor(
        private userRepository: UserRepositoryProtocol,
        private personRepository: PersonRepositoryProtocol
    ) { }

    async execute(id: string): Promise<IGetUserUsecaseResponse> {
        
        const userExists = await this.userRepository.findById(id);

        if (!userExists) {
            throw new Error("Usuário não encontrado.");
        }

        if (userExists.person_id) {
            const person_data = await this.personRepository.findById(userExists.person_id);

            if (person_data) {
                userExists.person = person_data
            }
        }

        Reflect.deleteProperty(userExists, "password");

        return userExists;
    }
}

export { GetUserUsecase }