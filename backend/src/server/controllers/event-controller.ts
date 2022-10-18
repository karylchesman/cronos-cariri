import { Request, Response } from "express";
import { EventRepository } from "../../domain/repositories/event-repository";
import { CreateEventUsecase } from "../../domain/usecases/events/create-event-usecase";

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
}

export { EventController }