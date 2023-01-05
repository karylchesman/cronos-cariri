import { Repository } from 'typeorm';
import { AppDataSource } from '../../infra/typeORM/connection';
import { ORMPayPlan } from '../../infra/typeORM/entities/ORMPayPlan';
import { PayPlanProps } from '../entities/pay-plan';
import { PayPlanRepositoryProtocol } from './interfaces/payplan-repository-protocol';

class PayPlanRepository implements PayPlanRepositoryProtocol {
    private payPlanRepository: Repository<ORMPayPlan>;

    constructor() {
        this.payPlanRepository = AppDataSource.getRepository(ORMPayPlan);
    }

    async save(payplan: PayPlanProps): Promise<PayPlanProps> {
        const new_payplan = await this.payPlanRepository.save(
            this.payPlanRepository.create(payplan)
        );

        return new_payplan;
    }

    async findByEventId(event_id: string): Promise<PayPlanProps[]> {
        const payplans = await this.payPlanRepository.find({
            where: {
                event_id,
            },
        });

        return payplans;
    }

    async alreadyExists(
        event_id: string,
        name: string
    ): Promise<PayPlanProps | null> {
        const payplanExists = await this.payPlanRepository.findOne({
            where: {
                event_id,
                name,
            },
        });

        return payplanExists;
    }
}

export { PayPlanRepository };
