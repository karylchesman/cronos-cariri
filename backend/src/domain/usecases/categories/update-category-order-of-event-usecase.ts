import { CategoryRepositoryProtocol } from '../../repositories/interfaces/category-repository-protocol';
import { EventRepositoryProtocol } from '../../repositories/interfaces/event-repository-protocol';
import { isNumber, isString } from '../../utils/validators';

export interface IUpdateCategoryOrderOfEventUsecaseRequest {
    event_id: string;
    categories: {
        id: string;
        order: number;
    }[];
}

export type IUpdateCategoryOrderOfEventUsecaseResponse = void;

class UpdateCategoryOrderOfEventUsecase {
    constructor(
        private categoryRepository: CategoryRepositoryProtocol,
        private eventRepository: EventRepositoryProtocol
    ) {}

    async execute({
        event_id,
        categories,
    }: IUpdateCategoryOrderOfEventUsecaseRequest): Promise<IUpdateCategoryOrderOfEventUsecaseResponse> {
        isString(event_id, 'Evento inválido.');
        categories.forEach((item) => {
            isString(item.id, 'Identificador da categoria inválido.');
            isNumber(item.order, 'Ordem da categoria inválida.');
        });

        const eventExists = await this.eventRepository.findById(event_id);

        if (!eventExists) {
            throw new Error('Evento não encontrado.');
        }

        const categoriesExists = await this.categoryRepository.findByIdList(
            categories.map((item) => item.id)
        );

        if (categoriesExists.length !== categories.length) {
            throw new Error(
                'Não foram encontradas todas as categorias para atualização.'
            );
        }

        await this.categoryRepository.updateCategoriesOrderByEventId(
            event_id,
            categories
        );

        return;
    }
}

export { UpdateCategoryOrderOfEventUsecase };
