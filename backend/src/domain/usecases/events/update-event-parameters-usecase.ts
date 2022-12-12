import { EventParametersProps, EventParameters } from "../../entities/event-parameters";
import { EventParametersRepositoryProtocol } from "../../repositories/interfaces/event-parameters-repository-protocol";
import { EventRepositoryProtocol } from "../../repositories/interfaces/event-repository-protocol";
import { isString } from "../../utils/validators";

export interface IUpdateEventParametersUsecaseResquest {
    parameters: EventParametersProps;
}

export type IUpdateEventParametersUsecaseResponse = EventParametersProps;

class UpdateEventParametersUsecase {
    constructor(
        private eventRepository: EventRepositoryProtocol,
        private eventParametersRepository: EventParametersRepositoryProtocol
    ) { }

    async execute({ parameters }: IUpdateEventParametersUsecaseResquest): Promise<IUpdateEventParametersUsecaseResponse> {

        isString(parameters.event_id, "Evento inválido.");

        const eventExists = await this.eventRepository.findById(parameters.event_id);

        if (!eventExists) {
            throw new Error("Evento não encontrado.");
        }

        const parametersExists = await this.eventParametersRepository.findByEventId(parameters.event_id);

        if (parametersExists) {
            const updated_parameters = new EventParameters(Object.assign(parametersExists, { ...parameters }));

            updated_parameters.validate();

            const saved_data = await this.eventParametersRepository.update(updated_parameters.getProps());

            return saved_data;
        } else {
            const event_parameters = new EventParameters({...parameters});

            event_parameters.validate();

            const saved_data = await this.eventParametersRepository.save(event_parameters.getProps());

            return saved_data;
        }
    }
}

export { UpdateEventParametersUsecase }