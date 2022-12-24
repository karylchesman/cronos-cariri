import { CategoryProps } from '../../entities/category';
import { CategoryRepositoryProtocol } from '../../repositories/interfaces/category-repository-protocol';
import { EventRepositoryProtocol } from '../../repositories/interfaces/event-repository-protocol';
import { isString } from '../../utils/validators';

export interface IGetCategoriesByEventIdUsecaseRequest {
    event_id: string;
}

export interface IGetCategoriesByEventIdUsecaseResponse {
    categories: CategoryProps[];
}

class GetCategoriesByEventIdUsecase {
    constructor(
        private categoryRepository: CategoryRepositoryProtocol,
        private eventRepository: EventRepositoryProtocol
    ) {}

    async execute({
        event_id,
    }: IGetCategoriesByEventIdUsecaseRequest): Promise<IGetCategoriesByEventIdUsecaseResponse> {
        isString(event_id, 'Evento inválido.');

        const eventExists = await this.eventRepository.findById(event_id);

        if (!eventExists) {
            throw new Error('Evento não encontrado.');
        }

        const categories = await this.categoryRepository.find({
            event_id: eventExists.id,
        });

        return {
            categories,
        };
    }
}

export { GetCategoriesByEventIdUsecase };
