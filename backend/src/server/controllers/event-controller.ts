import { Request, Response } from "express";
import { EventRepository } from "../../domain/repositories/event-repository";
import { CreateEventUsecase } from "../../domain/usecases/events/create-event-usecase";
import { SearchEventUsecase } from "../../domain/usecases/events/search-event-usecase";

class EventController {
    async createEvent(request: Request, response: Response) {
        const {
            name,
            event_date,
            event_time,
            address_street,
            address_number,
            address_district,
            address_city,
            address_uf,
            address_cep,
            email,
            phonenumber,
            event_type,
            inscription_limit_date
        } = request.body;

        const eventRepository = new EventRepository();
        const createEventUsecase = new CreateEventUsecase(eventRepository);

        const new_event = await createEventUsecase.execute({
            event: {
                name,
                event_date,
                event_time,
                address_street,
                address_number,
                address_district,
                address_city,
                address_uf,
                address_cep,
                email,
                phonenumber,
                event_type,
                inscription_limit_date
            }
        })

        return response.json(new_event);
    }

    async search(request: Request, response: Response) {
        const { 
            search_params,
            order_by,
            order
        } = request.body;
        const {
            page,
            limit
        } = request.query;

        const eventRepository = new EventRepository();
        const searchUserUsecase = new SearchEventUsecase(eventRepository);

        let has_page = Number(page);
        let has_limit = Number(limit);

        const events = await searchUserUsecase.execute({
            search_params,
            page: Number.isNaN(has_page) ? undefined : has_page,
            limit: Number.isNaN(has_limit) ? undefined : has_limit,
            order_by,
            order
        })

        return response.json(events);
    }
}

export { EventController }