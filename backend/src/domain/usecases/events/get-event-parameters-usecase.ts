import { EventParametersProps } from "../../entities/event-parameters";
import { EventParametersRepositoryProtocol } from "../../repositories/interfaces/event-parameters-repository-protocol";
import { EventRepositoryProtocol } from "../../repositories/interfaces/event-repository-protocol";
import { isString } from "../../utils/validators";

export type IGetEventParametersUsecaseRequest = {
    event_id: string;
};

export type IGetEventParametersUsecaseResponse = {
    parameters: EventParametersProps | null;
}

class GetEventParametersUsecase {
    constructor(
        private eventRepository: EventRepositoryProtocol,
        private eventParametersRepository: EventParametersRepositoryProtocol
    ) { }

    async execute({ event_id }: IGetEventParametersUsecaseRequest): Promise<IGetEventParametersUsecaseResponse> {
        isString(event_id, "Evento inválido.");

        const eventExists = await this.eventRepository.findById(event_id);

        if (!eventExists) {
            throw new Error("Evento não encontrado.");
        }

        const parameters = await this.eventParametersRepository.findByEventId(event_id);

        return {
            parameters
        }
    }
}

export { GetEventParametersUsecase }