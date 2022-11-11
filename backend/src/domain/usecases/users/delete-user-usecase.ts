import { PersonRepositoryProtocol } from "../../repositories/interfaces/person-repository-protocol";
import { UserRepositoryProtocol } from "../../repositories/interfaces/user-repository-protocol";

class DeleteUserUsecase {
    constructor(
        private userRepository: UserRepositoryProtocol,
        private personRepository: PersonRepositoryProtocol
    ) { }

    async execute(id: string): Promise<void> {

        const userExists = await this.userRepository.findById(id);

        if (!userExists) {
            throw new Error("Usuário não encontrado.");
        }

        if (userExists.person_id) {
            await this.personRepository.deleteById(userExists.person_id);
        }

        await this.userRepository.deleteById(String(userExists.id));

        return;
    }
}

export { DeleteUserUsecase }