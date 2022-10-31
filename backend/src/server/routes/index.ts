import { Router } from 'express';
import { eventRoutes } from './eventRoutes';
import { permissionRoutes } from './permissionRoutes';
import { roleRoutes } from './roleRoutes';
import { userRoutes } from './userRoutes';

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/events", eventRoutes);
routes.use("/roles", roleRoutes);
routes.use("/permissions", permissionRoutes);

export { routes };