import { Request, Response } from "express";
import { EventRepository } from "../../domain/repositories/event-repository";
import { CreateEventUsecase } from "../../domain/usecases/events/create-event-usecase";
import { GetEventByUrlUsecase } from "../../domain/usecases/events/get-event-by-url-usecase";
import { SearchEventUsecase } from "../../domain/usecases/events/search-event-usecase";
import { UpdateEventDetailsUsecase } from "../../domain/usecases/events/update-event-details-usecase";
import { UpdateEventUsecase } from "../../domain/usecases/events/update-event-usecase";
import fs from 'node:fs';
import path from 'node:path';
import { UpdateEventBannerUsecase } from "../../domain/usecases/events/update-event-banner-usecase";
import { EventAttachmentRepository } from "../../domain/repositories/event-attachment-repository";
import { UpdateEventCardUsecase } from "../../domain/usecases/events/update-event-card-usecase";
import { GetEventBannerDataUsecase } from "../../domain/usecases/events/get-event-banner-data-usecase";
import { GetEventBannerArchiveUsecase } from "../../domain/usecases/events/get-event-banner-archive-usecase";
import { GetEventCardArchiveUsecase } from "../../domain/usecases/events/get-event-card-archive-usecase";
import { GetEventCardDataUsecase } from "../../domain/usecases/events/get-event-card-data-usecase";
import { EventParametersRepository } from "../../domain/repositories/event-parameters-repository";
import { UpdateEventParametersUsecase } from "../../domain/usecases/events/update-event-parameters-usecase";
import { GetEventParametersUsecase } from "../../domain/usecases/events/get-event-parameters-usecase";

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

    async updateEvent(request: Request, response: Response) {
        const {
            id,
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
        const updateEventUsecase = new UpdateEventUsecase(eventRepository);

        const event_updated = await updateEventUsecase.execute({
            event: {
                id,
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

        return response.json(event_updated);
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

    async getByUrl(request: Request, response: Response) {
        const {
            url_path
        } = request.params;

        const eventRepository = new EventRepository();
        const getEventByUrlUsecase = new GetEventByUrlUsecase(eventRepository);

        const event = await getEventByUrlUsecase.execute({ url_path });

        return response.json(event);
    }

    async updateDetails(request: Request, response: Response) {
        const {
            event_id,
        } = request.body;

        const details = request.file;

        if (!details) {
            throw new Error("Recurso não localizado.");
        }

        const details_in_text = fs.readFileSync(path.resolve(details.path)).toString("utf-8");

        const eventRepository = new EventRepository();
        const updateEventDetailsUsecase = new UpdateEventDetailsUsecase(eventRepository);

        await updateEventDetailsUsecase.execute({ event_id, details: details_in_text });

        return response.json({ message: "Success" });
    }

    async updateBanner(request: Request, response: Response) {
        const {
            event_id,
        } = request.body;

        const banner = request.file;

        if (!banner) {
            throw new Error("Recurso não localizado.");
        }

        const banner_in_text = fs.readFileSync(path.resolve(banner.path)).toString("base64");

        const eventRepository = new EventRepository();
        const eventAttachmentsRepository = new EventAttachmentRepository();
        const updateEventBannerUsecase = new UpdateEventBannerUsecase(eventRepository, eventAttachmentsRepository);

        const event_banner = await updateEventBannerUsecase.execute({
            event_id,
            event_banner: {
                filename: banner.filename,
                archive: banner_in_text,
                mimetype: banner.mimetype
            }
        });

        return response.json(event_banner);
    }

    async updateCard(request: Request, response: Response) {
        const {
            event_id,
        } = request.body;

        const card = request.file;

        if (!card) {
            throw new Error("Recurso não localizado.");
        }

        const card_in_text = fs.readFileSync(path.resolve(card.path)).toString("base64");

        const eventRepository = new EventRepository();
        const eventAttachmentsRepository = new EventAttachmentRepository();
        const updateEventCardUsecase = new UpdateEventCardUsecase(eventRepository, eventAttachmentsRepository);

        const event_card = await updateEventCardUsecase.execute({
            event_id,
            event_card: {
                filename: card.filename,
                archive: card_in_text,
                mimetype: card.mimetype
            }
        });

        return response.json(event_card);
    }

    async getEventBannerData(request: Request, response: Response) {
        const {
            event_id,
            banner_archive_id
        } = request.params;

        const eventRepository = new EventRepository();
        const eventAttachmentRepository = new EventAttachmentRepository();
        const getEventBannerDataUsecase = new GetEventBannerDataUsecase(eventRepository, eventAttachmentRepository);

        const event_banner = await getEventBannerDataUsecase.execute({
            event_id,
            banner_archive_id
        });

        return response.json(event_banner);
    }

    async getEventCardData(request: Request, response: Response) {
        const {
            event_id,
            card_archive_id
        } = request.params;

        const eventRepository = new EventRepository();
        const eventAttachmentRepository = new EventAttachmentRepository();
        const getEventCardDataUsecase = new GetEventCardDataUsecase(eventRepository, eventAttachmentRepository);

        const event_card = await getEventCardDataUsecase.execute({
            event_id,
            card_archive_id
        });

        return response.json(event_card);
    }

    async getEventBanner(request: Request, response: Response) {
        const {
            file_name,
            banner_archive_id
        } = request.params;

        const eventAttachmentRepository = new EventAttachmentRepository();
        const getEventBannerArchiveUsecase = new GetEventBannerArchiveUsecase(eventAttachmentRepository);

        const result = await getEventBannerArchiveUsecase.execute({
            file_name,
            banner_archive_id
        });

        response.contentType(result.event_banner.mimetype)
        return response.send(Buffer.from(result.event_banner.archive, "base64"));
    }

    async getEventCard(request: Request, response: Response) {
        const {
            file_name,
            card_archive_id
        } = request.params;

        const eventAttachmentRepository = new EventAttachmentRepository();
        const getEventCardArchiveUsecase = new GetEventCardArchiveUsecase(eventAttachmentRepository);

        const result = await getEventCardArchiveUsecase.execute({
            file_name,
            card_archive_id
        });

        response.contentType(result.event_card.mimetype)
        return response.send(Buffer.from(result.event_card.archive, "base64"));
    }

    async updateEventParameters(request: Request, response: Response) {
        const {
            event_id,
            inscription_made_email,
            inscription_confirmed_email,
            inscription_canceled_email,
            show_inscription_list,
            pagseguro_token,
            pagseguro_email,
            pagseguro_api_link
        } = request.body;

        const eventRepository = new EventRepository();
        const eventParametersRepository = new EventParametersRepository();
        const updateEventParametersUsecase = new UpdateEventParametersUsecase(eventRepository, eventParametersRepository);

        const result = await updateEventParametersUsecase.execute({
            parameters: {
                event_id,
                inscription_made_email,
                inscription_confirmed_email,
                inscription_canceled_email,
                show_inscription_list,
                pagseguro_token,
                pagseguro_email,
                pagseguro_api_link
            }
        });

        return response.json(result);
    }

    async getEventParameters(request: Request, response: Response) {
        const {
            event_id
        } = request.params;

        const eventRepository = new EventRepository();
        const eventParametersRepository = new EventParametersRepository();
        const getEventParametersUsecase = new GetEventParametersUsecase(eventRepository, eventParametersRepository);

        const result = await getEventParametersUsecase.execute({ event_id });

        return response.json(result);
    }
}

export { EventController }