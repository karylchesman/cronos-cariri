import { Request, Response } from 'express';
import { PayPlanRepository } from '../../domain/repositories/payplan-repository';
import { CreatePayPlanUsecase } from '../../domain/usecases/payplans/create-payplan-usecase';

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
}

export { PayPlanController };
