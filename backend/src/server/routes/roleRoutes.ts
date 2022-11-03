import { Router } from 'express';
import { RoleController } from '../controllers/role-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { havePermission } from '../middlewares/havePermission';

const roleRoutes = Router();

const roleController = new RoleController();

roleRoutes.use(ensureAuthenticated);

roleRoutes.post("/create", havePermission(["ROLE_CREATE"]), roleController.createRole);
roleRoutes.post("/search", havePermission(["ROLE_LIST"]), roleController.search);
roleRoutes.post("/attach-to-user", havePermission(["ROLE_ATTACH"]), roleController.attachRoleToUser);
roleRoutes.get("/user/:user_id", havePermission(["ROLE_LIST_BY_USER"]), roleController.getByUser);
roleRoutes.put("/update", havePermission(["ROLE_UPDATE"]), roleController.updateRole);
roleRoutes.delete("/:id", havePermission(["ROLE_DELETE"]), roleController.deleteRole);

export { roleRoutes };