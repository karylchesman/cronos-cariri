import { CategoryProps } from '../../entities/category';
import {
    CategoryRepositoryProtocol,
    TCategoryOrderByFields,
} from '../../repositories/interfaces/category-repository-protocol';
import {
    ISearchObject,
    isValidSearchKey,
    isValidSearchOperator,
    isValidSearchValue,
} from '../../utils/search-object';

export type ISearchCategoryUsecaseRequest = {
    search_params?: ISearchObject<CategoryProps>[] | string;
    page?: number;
    limit?: number;
    order_by?: TCategoryOrderByFields;
    order?: 'ASC' | 'DESC';
};

export type ISearchCategoryUsecaseResponse = {
    categories: CategoryProps[];
    registers: number;
};

class SearchCategoryUsecase {
    constructor(private categoryRepository: CategoryRepositoryProtocol) {}

    async execute({
        search_params,
        limit,
        page,
        order,
        order_by,
    }: ISearchCategoryUsecaseRequest): Promise<ISearchCategoryUsecaseResponse> {
        if (order_by) {
            if (order !== 'ASC' && order !== 'DESC')
                throw new Error(
                    'Defina uma ordem para a chave de ordenação selecionada.'
                );
        }

        if (Array.isArray(search_params)) {
            search_params.forEach((item) => {
                isValidSearchKey(item.key, [
                    'name',
                    'distance',
                    'start_age',
                    'end_age',
                    'category_type',
                    'gender_type',
                ]);
                isValidSearchValue(item.value);
                isValidSearchOperator(item.operator);
            });
        }

        const categories = await this.categoryRepository.search(
            search_params,
            page,
            limit,
            order_by,
            order
        );

        return categories;
    }
}

export { SearchCategoryUsecase };
