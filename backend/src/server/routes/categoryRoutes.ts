import { Router } from 'express';
import { CategoryController } from '../controllers/category-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { havePermission } from '../middlewares/havePermission';

const categoryRoutes = Router();

const categoryController = new CategoryController();

categoryRoutes.use(ensureAuthenticated);

categoryRoutes.post(
    '/create',
    havePermission(['CATEGORY_CREATE']),
    categoryController.create
);
categoryRoutes.post(
    '/search',
    havePermission(['CATEGORY_LIST']),
    categoryController.search
);

export { categoryRoutes };
