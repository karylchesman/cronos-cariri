import { Repository } from "typeorm";
import { AppDataSource } from "../../infra/typeORM/connection";
import { ORMEventParameters } from "../../infra/typeORM/entities/ORMEventParameters";
import { EventParametersProps } from "../entities/event-parameters";
import { EventParametersRepositoryProtocol } from "./interfaces/event-parameters-repository-protocol";

class EventParametersRepository implements EventParametersRepositoryProtocol {
    private eventParametersRepository: Repository<ORMEventParameters>;

    constructor() {
        this.eventParametersRepository = AppDataSource.getRepository(ORMEventParameters);
    }

    async save(event_parameters: EventParametersProps) {
        const new_event_parameters = this.eventParametersRepository.create(event_parameters);

        await this.eventParametersRepository.save(new_event_parameters);

        return new_event_parameters;
    }

    async update(event_parameters: EventParametersProps) {
        event_parameters.updated_at = new Date();

        await this.eventParametersRepository.update({
            id: event_parameters.id,
            event_id: event_parameters.event_id
        }, event_parameters);

        return event_parameters;
    }

    async findByEventId(event_id: string) {
        const event_parameters = this.eventParametersRepository.findOne({
            where:{
                event_id
            }
        });

        if(event_parameters){
            return event_parameters;
        }

        return null;
    }
}

export { EventParametersRepository }