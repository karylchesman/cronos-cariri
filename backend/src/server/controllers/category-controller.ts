import { Request, Response } from 'express';
import { CategoryRepository } from '../../domain/repositories/category-repository';
import { EventRepository } from '../../domain/repositories/event-repository';
import { CreateCategoryUsecase } from '../../domain/usecases/categories/create-cetegory-usecase';
import { GetCategoriesByEventIdUsecase } from '../../domain/usecases/categories/get-categories-by-event-id-usecase';
import { SearchCategoryUsecase } from '../../domain/usecases/categories/search-category-usecase';
import { UpdateCategoryOrderOfEventUsecase } from '../../domain/usecases/categories/update-category-order-of-event-usecase';

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

    async getByEventId(request: Request, response: Response) {
        const { event_id } = request.params;

        const categoryRepository = new CategoryRepository();
        const eventRepository = new EventRepository();
        const getCategoriesByEventIdUsecase = new GetCategoriesByEventIdUsecase(
            categoryRepository,
            eventRepository
        );

        const categories = await getCategoriesByEventIdUsecase.execute({
            event_id,
        });

        return response.json(categories);
    }

    async updateOrder(request: Request, response: Response) {
        const { event_id, categories } = request.body;

        const categoryRepository = new CategoryRepository();
        const eventRepository = new EventRepository();

        const updateCategoryOrderOfEventUsecase =
            new UpdateCategoryOrderOfEventUsecase(
                categoryRepository,
                eventRepository
            );

        await updateCategoryOrderOfEventUsecase.execute({
            event_id,
            categories,
        });

        return response.json({ message: 'Success' });
    }
}

export { CategoryController };
