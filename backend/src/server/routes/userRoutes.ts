import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/session", userController.getSession);
userRoutes.post("/register", userController.registerUser);

userRoutes.use(ensureAuthenticated);

userRoutes.put("/update", userController.updateUser);
userRoutes.get("/logged", userController.getLoggedUser);
userRoutes.get("/:id", userController.getUserById);
userRoutes.delete("/:id", userController.deleteUser);
userRoutes.post("/search",userController.search)

export { userRoutes };