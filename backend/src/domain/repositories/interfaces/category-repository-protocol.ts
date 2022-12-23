import { CategoryProps } from '../../entities/category';
import { ISearchObject } from '../../utils/search-object';

export type TCategorySearchProps = CategoryProps;

export type TCategoryOrderByFields = keyof TCategorySearchProps;

interface CategoryRepositoryProtocol {
    save: (category: CategoryProps) => Promise<CategoryProps>;
    update: (category: CategoryProps) => Promise<CategoryProps>;
    find: (category?: Partial<CategoryProps>) => Promise<CategoryProps[]>;
    search: (
        search_params?: ISearchObject<TCategorySearchProps>[] | string,
        page?: number,
        limit?: number,
        order_by?: TCategoryOrderByFields,
        order?: 'ASC' | 'DESC'
    ) => Promise<{ categories: CategoryProps[]; registers: number }>;
    findById: (id: string) => Promise<CategoryProps | null>;
    deleteById: (id: string) => Promise<void>;
}

export { CategoryRepositoryProtocol };
