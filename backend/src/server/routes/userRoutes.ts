import { Router } from 'express';
import { UserController } from '../controllers/user-controller';

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/create", userController.createUser);
userRoutes.put("/update", userController.updateUser);
userRoutes.get("/:id", userController.getUserById);
userRoutes.delete("/:id", userController.deleteUser);
userRoutes.post("/search",userController.search)

export { userRoutes };