import { Repository } from "typeorm";
import { AppDataSource } from "../../infra/typeORM/connection";
import { ORMPerson } from "../../infra/typeORM/entities/ORMPerson";
import { PersonProps } from "../entities/person";
import { SearchObject } from "../utils/search-object";
import { PersonRepositoryProtocol } from "./interfaces/person-repository-protocol";

class PersonRepository implements PersonRepositoryProtocol {
    private personRepository: Repository<ORMPerson>;

    constructor() {
        this.personRepository = AppDataSource.getRepository(ORMPerson);
    }

    async save(person: PersonProps) {
        const new_person = this.personRepository.create(person)

        await this.personRepository.save(new_person);

        return new_person;
    }

    async update(person: PersonProps) {
        person.updated_at = new Date();

        await this.personRepository.update(String(person.id), person);

        return person;
    }

    async find(person?: Partial<PersonProps>) {

        const found_persons = await this.personRepository.find({
            where: person
        })

        return found_persons;
    }

    async findById(id: string) {
        const person = await this.personRepository.findOne({
            where: {
                id
            }
        })

        if (person) {
            return person;
        }

        return null;
    }

    async search(search_params?: SearchObject<PersonProps>[], page?: number, limit?: number) {
        return {
            persons: [],
            registers: 0
        };
    }

    async deleteById(id: string) {
        await this.personRepository.delete(id);

        return;
    }

}

export { PersonRepository }