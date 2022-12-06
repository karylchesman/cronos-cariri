import { EventParametersProps } from "../../entities/event-parameters";

interface EventParametersRepositoryProtocol {
    save: (event_parameters: EventParametersProps) => Promise<EventParametersProps>;
    update: (event_parameters: EventParametersProps) => Promise<EventParametersProps>;
    findByEventId: (event_id: string) => Promise<EventParametersProps | null>;
}

export { EventParametersRepositoryProtocol }