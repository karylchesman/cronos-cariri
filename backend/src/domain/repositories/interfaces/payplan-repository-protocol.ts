import { PayPlanProps } from '../../entities/pay-plan';

interface PayPlanRepositoryProtocol {
    save: (payplan: PayPlanProps) => Promise<PayPlanProps>;
    alreadyExists: (
        event_id: string,
        name: string
    ) => Promise<PayPlanProps | null>;
    findByEventId: (event_id: string) => Promise<PayPlanProps[]>;
}

export { PayPlanRepositoryProtocol };
