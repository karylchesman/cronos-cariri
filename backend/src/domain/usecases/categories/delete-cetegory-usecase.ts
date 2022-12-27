import { CategoryRepositoryProtocol } from '../../repositories/interfaces/category-repository-protocol';
import { isEmpty } from '../../utils/validators';

export interface IDeleteCategoryUsecaseResquest {
    category_id: string;
}

export type IDeleteCategoryUsecaseResponse = void;

class DeleteCategoryUsecase {
    constructor(private categoryRepository: CategoryRepositoryProtocol) {}

    async execute({
        category_id,
    }: IDeleteCategoryUsecaseResquest): Promise<IDeleteCategoryUsecaseResponse> {
        isEmpty(category_id, 'Categoria não definida.');

        const [categoryExists] = await this.categoryRepository.find({
            id: category_id,
        });

        if (!categoryExists) {
            throw new Error('Categoria não encontrada.');
        }

        await this.categoryRepository.deleteById(category_id);

        return;
    }
}

export { DeleteCategoryUsecase };
