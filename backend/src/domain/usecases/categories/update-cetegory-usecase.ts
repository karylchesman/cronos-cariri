import {
    Category,
    CategoryProps,
    ECategoryGenderType,
    ECategoryTypes,
} from '../../entities/category';
import { CategoryRepositoryProtocol } from '../../repositories/interfaces/category-repository-protocol';
import { EventRepositoryProtocol } from '../../repositories/interfaces/event-repository-protocol';

export interface IUpdateCategoryUsecaseResquest {
    category: {
        id: string;
        name: string;
        event_id: string;
        distance: number;
        start_age: number;
        end_age: number;
        category_type: ECategoryTypes;
        gender_type: ECategoryGenderType;
        order: number;
    };
}

export type IUpdateCategoryUsecaseResponse = CategoryProps;

class UpdateCategoryUsecase {
    constructor(
        private eventRepository: EventRepositoryProtocol,
        private categoryRepository: CategoryRepositoryProtocol
    ) {}

    async execute({
        category,
    }: IUpdateCategoryUsecaseResquest): Promise<IUpdateCategoryUsecaseResponse> {
        const [eventExists] = await this.eventRepository.find({
            id: category.event_id,
        });

        if (!eventExists) {
            throw new Error('Evento não encontrado.');
        }

        const [categoryExists] = await this.categoryRepository.find({
            id: category.id,
        });

        if (!categoryExists) {
            throw new Error('Categoria não encontrada.');
        }

        if (categoryExists.name !== category.name) {
            const [categoryAlreadyExists] = await this.categoryRepository.find({
                name: category.name,
                event_id: eventExists.id,
            });

            if (categoryAlreadyExists) {
                throw new Error(
                    'Nome de categoria já cadastrado, por favor escolha outro.'
                );
            }
        }

        const updated_category = new Category(
            Object.assign(categoryExists, { ...category })
        );

        updated_category.validate();

        const saved_update = await this.categoryRepository.update(
            updated_category.getProps()
        );

        return saved_update;
    }
}

export { UpdateCategoryUsecase };
