import { Router } from 'express';
import { PayPlanController } from '../controllers/payplan-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { havePermission } from '../middlewares/havePermission';

const payPlanRoutes = Router();

const payPlanController = new PayPlanController();

payPlanRoutes.use(ensureAuthenticated);

payPlanRoutes.post(
    '/create',
    havePermission(['PAYPLAN_CREATE']),
    payPlanController.create
);

payPlanRoutes.get(
    '/:event_id/list',
    havePermission(['PAYPLAN_LIST_BY_EVENT']),
    payPlanController.getByEventId
);

export { payPlanRoutes };
