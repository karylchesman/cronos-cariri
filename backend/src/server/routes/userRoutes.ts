import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/session", userController.getSession);

userRoutes.use(ensureAuthenticated);

userRoutes.post("/create", userController.createUser);
userRoutes.put("/update", userController.updateUser);
userRoutes.get("/:id", userController.getUserById);
userRoutes.delete("/:id", userController.deleteUser);
userRoutes.post("/search",userController.search)

export { userRoutes };