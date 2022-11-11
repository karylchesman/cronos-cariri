import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { havePermission } from '../middlewares/havePermission';

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/session", userController.getSession);
userRoutes.post("/register", userController.registerUser);

userRoutes.use(ensureAuthenticated);

userRoutes.post("/create", havePermission(["USER_CREATE"]), userController.createUser);
userRoutes.put("/update", havePermission(["USER_UPDATE", "USER_ADMIN_UPDATE"]), userController.updateUser);
userRoutes.put("/person/update", havePermission(["USER_UPDATE", "USER_ADMIN_UPDATE"]), userController.updatePersonData);
userRoutes.get("/logged", userController.getLoggedUser);
userRoutes.get("/:id", havePermission(["USER_LIST"]), userController.getUserById);
userRoutes.delete("/:id", havePermission(["USER_DELETE"]), userController.deleteUser);
userRoutes.post("/search", havePermission(["USER_LIST"]), userController.search)

export { userRoutes };