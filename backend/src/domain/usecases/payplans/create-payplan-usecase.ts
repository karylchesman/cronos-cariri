import { PayPlan, PayPlanProps } from '../../entities/pay-plan';
import { PayPlanRepositoryProtocol } from '../../repositories/interfaces/payplan-repository-protocol';

export interface ICreatePayPlanUsecaseResquest {
    payplan: {
        name: string;
        event_id: string;
        elderly_discount: number | null;
        elderly_age: number | null;
        details: string;
        value: number | null;
    };
}

export interface ICreatePayPlanUsecaseResponse {
    payplan: PayPlanProps;
}

class CreatePayPlanUsecase {
    constructor(private payPlanRepository: PayPlanRepositoryProtocol) {}

    async execute({
        payplan,
    }: ICreatePayPlanUsecaseResquest): Promise<ICreatePayPlanUsecaseResponse> {
        const new_payplan = new PayPlan({ ...payplan });

        new_payplan.validate();

        const payplanExists = await this.payPlanRepository.alreadyExists(
            new_payplan.getProps().event_id,
            new_payplan.getProps().name
        );

        if (payplanExists) {
            throw new Error(
                'Nome de Plano de pagamento já cadastrado nesse evento.'
            );
        }

        const saved_payplan = await this.payPlanRepository.save(
            new_payplan.getProps()
        );

        return {
            payplan: saved_payplan,
        };
    }
}

export { CreatePayPlanUsecase };
