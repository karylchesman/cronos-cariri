import {
    Category,
    CategoryProps,
    ECategoryGenderType,
    ECategoryTypes,
} from '../../entities/category';
import { CategoryRepositoryProtocol } from '../../repositories/interfaces/category-repository-protocol';
import { EventRepositoryProtocol } from '../../repositories/interfaces/event-repository-protocol';

export interface ICreateCategoryUsecaseResquest {
    category: {
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

export type ICreateCategoryUsecaseResponse = CategoryProps;

class CreateCategoryUsecase {
    constructor(
        private eventRepository: EventRepositoryProtocol,
        private categoryRepository: CategoryRepositoryProtocol
    ) {}

    async execute({
        category,
    }: ICreateCategoryUsecaseResquest): Promise<ICreateCategoryUsecaseResponse> {
        const [eventExists] = await this.eventRepository.find({
            id: category.event_id,
        });

        if (!eventExists) {
            throw new Error('Evento não encontrado.');
        }

        const [categoryAlreadyExists] = await this.categoryRepository.find({
            name: category.name,
            event_id: category.event_id,
        });

        if (categoryAlreadyExists) {
            throw new Error(
                'Nome de categoria já cadastrado, por favor escolha outro.'
            );
        }

        const new_category = new Category({ ...category });

        new_category.validate();

        const saved_category = await this.categoryRepository.save(
            new_category.getProps()
        );

        return saved_category;
    }
}

export { CreateCategoryUsecase };
