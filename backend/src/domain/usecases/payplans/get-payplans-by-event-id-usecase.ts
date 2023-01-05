import { PayPlanProps } from '../../entities/pay-plan';
import { EventRepositoryProtocol } from '../../repositories/interfaces/event-repository-protocol';
import { PayPlanRepositoryProtocol } from '../../repositories/interfaces/payplan-repository-protocol';
import { isEmpty } from '../../utils/validators';

export interface IGetPayPlansByEventIdUsecaseResquest {
    event_id: string;
}

export interface IGetPayPlansByEventIdUsecaseResponse {
    payplans: PayPlanProps[];
}

class GetPayPlansByEventIdUsecase {
    constructor(
        private payPlanRepository: PayPlanRepositoryProtocol,
        private eventRepository: EventRepositoryProtocol
    ) {}

    async execute({
        event_id,
    }: IGetPayPlansByEventIdUsecaseResquest): Promise<IGetPayPlansByEventIdUsecaseResponse> {
        isEmpty(event_id, 'Evento não definido.');

        const eventExists = await this.eventRepository.findById(event_id);

        if (!eventExists) {
            throw new Error('Evento não encontrado.');
        }

        const payplans = await this.payPlanRepository.findByEventId(
            eventExists.id
        );

        return {
            payplans,
        };
    }
}

export { GetPayPlansByEventIdUsecase };
