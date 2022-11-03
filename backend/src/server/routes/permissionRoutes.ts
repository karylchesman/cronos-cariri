import { Router } from 'express';
import { PermissionController } from '../controllers/permission-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { havePermission } from '../middlewares/havePermission';

const permissionRoutes = Router();

const roleController = new PermissionController();

permissionRoutes.use(ensureAuthenticated);

permissionRoutes.post("/create", havePermission(["PERMISSION_CREATE"]), roleController.createPermission);
permissionRoutes.post("/search", havePermission(["PERMISSION_LIST"]), roleController.search);
permissionRoutes.put("/update", havePermission(["PERMISSION_UPDATE"]), roleController.updatePermission);
permissionRoutes.post("/attach-to-role", havePermission(["PERMISSION_ATTACH"]), roleController.attachPermissionToRole);

export { permissionRoutes };