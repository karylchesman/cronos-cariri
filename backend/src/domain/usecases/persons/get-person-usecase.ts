import { PersonProps } from "../../entities/person";
import { PersonRepositoryProtocol } from "../../repositories/interfaces/person-repository-protocol";

export type IGetPersonUsecaseResponse = PersonProps;

class GetPersonUsecase {
    constructor(private personRepository: PersonRepositoryProtocol) { }

    async execute(id: string): Promise<IGetPersonUsecaseResponse> {

        const personExists = await this.personRepository.findById(id);

        if (!personExists) {
            throw new Error("Dados da pessoa não encontrados.");
        }

        return personExists;
    }
}

export { GetPersonUsecase }