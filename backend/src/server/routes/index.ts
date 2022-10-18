import { Router } from 'express';
import { eventRoutes } from './eventRoutes';
import { userRoutes } from './userRoutes';

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/events", eventRoutes);

export { routes };