import { Router } from 'express';
import { categoryRoutes } from './categoryRoutes';
import { eventRoutes } from './eventRoutes';
import { payPlanRoutes } from './payPlanRoutes';
import { permissionRoutes } from './permissionRoutes';
import { roleRoutes } from './roleRoutes';
import { userRoutes } from './userRoutes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/events', eventRoutes);
routes.use('/roles', roleRoutes);
routes.use('/permissions', permissionRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/payplans', payPlanRoutes);

export { routes };
