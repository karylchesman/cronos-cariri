import { Request, Response } from 'express';
import { EventRepository } from '../../domain/repositories/event-repository';
import { PayPlanRepository } from '../../domain/repositories/payplan-repository';
import { CreatePayPlanUsecase } from '../../domain/usecases/payplans/create-payplan-usecase';
import { GetPayPlansByEventIdUsecase } from '../../domain/usecases/payplans/get-payplans-by-event-id-usecase';

class PayPlanController {
    async create(request: Request, response: Response) {
        const {
            name,
            event_id,
            elderly_discount,
            elderly_age,
            details,
            value,
        } = request.body;

        const payPlanRepository = new PayPlanRepository();
        const createPayPlanUsecase = new CreatePayPlanUsecase(
            payPlanRepository
        );

        const payplan = await createPayPlanUsecase.execute({
            payplan: {
                name,
                event_id,
                elderly_discount,
                elderly_age,
                details,
                value,
            },
        });

        return response.json(payplan);
    }

    async getByEventId(request: Request, response: Response) {
        const { event_id } = request.params;

        const payPlanRepository = new PayPlanRepository();
        const eventRepository = new EventRepository();
        const getPayPlansByEventIdUsecase = new GetPayPlansByEventIdUsecase(
            payPlanRepository,
            eventRepository
        );

        const payplans = await getPayPlansByEventIdUsecase.execute({
            event_id,
        });

        return response.json(payplans);
    }
}

export { PayPlanController };
