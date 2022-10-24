import { Router } from 'express';
import { eventRoutes } from './eventRoutes';
import { roleRoutes } from './roleRoutes';
import { userRoutes } from './userRoutes';

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/events", eventRoutes);
routes.use("/roles", roleRoutes);

export { routes };