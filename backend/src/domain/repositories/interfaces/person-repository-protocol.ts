import { PersonProps } from "../../entities/person";
import { SearchObject } from "../../utils/search-object";

interface PersonRepositoryProtocol {
    save: (person: PersonProps) => Promise<PersonProps>;
    update: (person: PersonProps) => Promise<PersonProps>;
    find: (person?: Partial<PersonProps>) => Promise<PersonProps[]>;
    search: (search_params?: SearchObject<PersonProps>[], page?: number, limit?: number) => Promise<{ persons: PersonProps[], registers: number}>;
    findById: (id: string) => Promise<PersonProps | null>;
    deleteById: (id: string) => Promise<void>;
}

export { PersonRepositoryProtocol }