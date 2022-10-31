import { Router } from 'express';
import { PermissionController } from '../controllers/permission-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const permissionRoutes = Router();

const roleController = new PermissionController();

permissionRoutes.use(ensureAuthenticated);

permissionRoutes.post("/create", roleController.createPermission);
permissionRoutes.post("/search", roleController.search);

export { permissionRoutes };