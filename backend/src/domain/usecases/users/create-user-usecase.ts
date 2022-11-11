import { EPersonGender, Person } from "../../entities/person";
import { User, UserProps } from "../../entities/user";
import { PersonRepositoryProtocol } from "../../repositories/interfaces/person-repository-protocol";
import { UserRepositoryProtocol } from "../../repositories/interfaces/user-repository-protocol";

export interface ICreateUserUsecaseResquest {
    userIdRequested?: string;
    user: {
        name: string;
        email: string;
        password: string;
        person?: {
            phonenumber1: string;
            gender: EPersonGender;
            cpf: string;
            bith_date: Date;
            address_street: string;
            address_number: string;
            address_district: string;
            address_city: string;
            address_uf: string;
            address_cep: string;
        }
    }
}

export type ICreateUserUsecaseResponse = UserProps;

class CreateUserUsecase {
    constructor(
        private userRepository: UserRepositoryProtocol,
        private personRepository: PersonRepositoryProtocol,
    ) { }

    async execute({ userIdRequested, user }: ICreateUserUsecaseResquest): Promise<ICreateUserUsecaseResponse> {
        const new_user = new User({
            name: user.name,
            email: user.email,
            password: user.password
        });

        new_user.validate();
        new_user.validatePassword();

        const emailAlreadyExists = await this.userRepository.find({
            email: user.email
        })

        if (emailAlreadyExists.length > 0) {
            throw new Error("Já existe um usuário com este e-mail, por favor escolha outro.");
        }

        if (user.person !== undefined) {
            const new_person = new Person({ ...user.person });

            new_person.validate();

            new_user.setPerson(new_person.getProps());

            await this.personRepository.save(new_person.getProps());
        }

        const saved_user = await this.userRepository.save(new_user.getProps());
        saved_user.person = new_user.getProps().person;

        Reflect.deleteProperty(saved_user, "password");

        return saved_user;
    }
}

export { CreateUserUsecase }