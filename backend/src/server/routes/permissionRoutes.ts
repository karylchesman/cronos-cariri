import { Router } from 'express';
import { PermissionController } from '../controllers/permission-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const permissionRoutes = Router();

const roleController = new PermissionController();

permissionRoutes.use(ensureAuthenticated);

permissionRoutes.post("/create", roleController.createPermission);
permissionRoutes.post("/search", roleController.search);
permissionRoutes.put("/update", roleController.updatePermission);
permissionRoutes.post("/attach-to-role", roleController.attachPermissionToRole);

export { permissionRoutes };