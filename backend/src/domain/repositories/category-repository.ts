import { Repository } from 'typeorm';
import { AppDataSource } from '../../infra/typeORM/connection';
import { ORMCategory } from '../../infra/typeORM/entities/ORMCategory';
import { CategoryProps } from '../entities/category';
import { getWhereObject, ISearchObject } from '../utils/search-object';
import {
    CategoryRepositoryProtocol,
    TCategoryOrderByFields,
} from './interfaces/category-repository-protocol';

class CategoryRepository implements CategoryRepositoryProtocol {
    private categoryRepository: Repository<ORMCategory>;

    constructor() {
        this.categoryRepository = AppDataSource.getRepository(ORMCategory);
    }

    async save(category: CategoryProps) {
        const new_category = this.categoryRepository.create(category);

        await this.categoryRepository.save(new_category);

        return new_category;
    }

    async update(category: CategoryProps) {
        category.updated_at = new Date();

        await this.categoryRepository.update(category.id, category);

        return category;
    }

    async find(category?: Partial<CategoryProps>) {
        const found_categories = await this.categoryRepository.find({
            where: category,
        });

        return found_categories;
    }

    async findById(id: string) {
        const category = await this.categoryRepository.findOne({
            where: {
                id,
            },
        });

        if (category) {
            return category;
        }

        return null;
    }

    async search(
        search_params?: ISearchObject<CategoryProps>[] | string,
        page?: number,
        limit?: number,
        order_by?: TCategoryOrderByFields,
        order?: 'ASC' | 'DESC'
    ) {
        const query = this.categoryRepository
            .createQueryBuilder('categories')
            .select('categories');

        if (search_params !== undefined) {
            if (typeof search_params === 'string') {
                query.where(`name LIKE :category_name`, {
                    category_name: `%${search_params}%`,
                });
            }

            if (Array.isArray(search_params)) {
                search_params.forEach((item, idx) => {
                    const search_object = getWhereObject(
                        item.operator,
                        item.key,
                        item.value,
                        'categories'
                    );

                    if (idx === 0) {
                        query.where(
                            search_object.where_string,
                            search_object.value_param
                        );
                    } else {
                        query.andWhere(
                            search_object.where_string,
                            search_object.value_param
                        );
                    }
                });
            }
        }

        if (limit !== undefined && page !== undefined) {
            const skip = (page - 1) * limit;

            query.skip(skip);
            query.take(limit);
        }

        if (order_by !== undefined && order !== undefined) {
            query.addOrderBy(order_by, order);
        }

        const categories_found = await query.getManyAndCount();

        return {
            categories: categories_found[0],
            registers: categories_found[1],
        };
    }

    async deleteById(id: string) {
        await this.categoryRepository.delete(id);

        return;
    }
}

export { CategoryRepository };
