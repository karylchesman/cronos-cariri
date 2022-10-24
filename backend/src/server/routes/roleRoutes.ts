import { Router } from 'express';
import { RoleController } from '../controllers/role-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const roleRoutes = Router();

const roleController = new RoleController();

roleRoutes.use(ensureAuthenticated);

roleRoutes.post("/create", roleController.createRole);
roleRoutes.post("/search", roleController.search);

export { roleRoutes };