import { Request, Response } from 'express';
import { CategoryRepository } from '../../domain/repositories/category-repository';
import { EventRepository } from '../../domain/repositories/event-repository';
import { CreateCategoryUsecase } from '../../domain/usecases/categories/create-cetegory-usecase';
import { SearchCategoryUsecase } from '../../domain/usecases/categories/search-category-usecase';

class CategoryController {
    async create(request: Request, response: Response) {
        const {
            name,
            event_id,
            distance,
            start_age,
            end_age,
            category_type,
            gender_type,
            order,
        } = request.body;

        const eventRepository = new EventRepository();
        const categoryRepository = new CategoryRepository();
        const createCategoryUsecase = new CreateCategoryUsecase(
            eventRepository,
            categoryRepository
        );

        const new_category = await createCategoryUsecase.execute({
            category: {
                name,
                event_id,
                distance,
                start_age,
                end_age,
                category_type,
                gender_type,
                order,
            },
        });

        return response.json(new_category);
    }

    async search(request: Request, response: Response) {
        const { search_params, order_by, order } = request.body;
        const { page, limit } = request.query;

        const categoryRepository = new CategoryRepository();
        const searchCategoryUsecase = new SearchCategoryUsecase(
            categoryRepository
        );

        const has_page = Number(page);
        const has_limit = Number(limit);

        const categories = await searchCategoryUsecase.execute({
            search_params,
            page: Number.isNaN(has_page) ? undefined : has_page,
            limit: Number.isNaN(has_limit) ? undefined : has_limit,
            order_by,
            order,
        });

        return response.json(categories);
    }
}

export { CategoryController };
