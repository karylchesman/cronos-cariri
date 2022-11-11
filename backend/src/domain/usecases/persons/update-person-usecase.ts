import { EPersonGender, Person, PersonProps } from "../../entities/person";
import { UserProps } from "../../entities/user";
import { PersonRepositoryProtocol } from "../../repositories/interfaces/person-repository-protocol";

export type IUpdatePersonUsecaseRequest = {
    id: string;
    phonenumber1: string;
    phonenumber2?: string;
    gender: EPersonGender;
    cpf: string;
    rg?: string;
    bith_date: Date;
    blood_type?: string;
    address_street: string;
    address_number: string;
    address_district: string;
    address_city: string;
    address_uf: string;
    address_cep: string;
};

export type IUpdatePersonUsecaseResponse = PersonProps;

class UpdatePersonUsecase {
    constructor(
        private userRequestedUpdate: UserProps,
        private personRepository: PersonRepositoryProtocol
    ) { }

    async execute(data: IUpdatePersonUsecaseRequest): Promise<IUpdatePersonUsecaseResponse> {

        const personExists = await this.personRepository.findById(data.id);

        if (!personExists) {
            throw new Error("Dados da pessoa não encontrados.");
        }

        if (
            this.userRequestedUpdate.person_id !== undefined
            && this.userRequestedUpdate.person_id !== personExists.id
            && this.userRequestedUpdate.permissions !== undefined
            && (!this.userRequestedUpdate.permissions.map(item => item.identifier).some(perm => perm === "USER_ADMIN_UPDATE"))
        ) {
            throw new Error("Você não tem permissão para realizar esta ação.");
        }

        const person_to_update = new Person(Object.assign(personExists, { ...data }));
        person_to_update.validate();

        const person_updated = await this.personRepository.update(person_to_update.getProps());

        return person_updated;
    }
}

export { UpdatePersonUsecase }