import { PersonProps } from "../../entities/person";

interface PersonRepositoryProtocol {
    save: (person: PersonProps) => Promise<PersonProps>;
    update: (person: PersonProps) => Promise<PersonProps>;
    find: (person?: Partial<PersonProps>) => Promise<PersonProps[]>;
    findById: (id: string) => Promise<PersonProps | null>;
    deleteById: (id: string) => Promise<void>;
}

export { PersonRepositoryProtocol }