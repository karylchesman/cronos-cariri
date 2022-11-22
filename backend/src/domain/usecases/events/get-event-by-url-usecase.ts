import { EventProps } from "../../entities/event";
import { EventRepositoryProtocol } from "../../repositories/interfaces/event-repository-protocol";
import { isString } from "../../utils/validators";

export type GetEventByUrlUsecaseUsecase = {
    url_path: string;
};

export type IGetEventByUrlUsecaseResponse = EventProps;

class GetEventByUrlUsecase {
    constructor(private eventRepository: EventRepositoryProtocol) { }

    async execute({ url_path }: GetEventByUrlUsecaseUsecase): Promise<IGetEventByUrlUsecaseResponse> {
        isString(url_path, "Url inválida.");

        const events = await this.eventRepository.findByUrlPath(url_path, false);

        if (events === null || events?.length <= 0) {
            throw new Error("Evento não encontrado.");
        }

        return events[0];
    }
}

export { GetEventByUrlUsecase }