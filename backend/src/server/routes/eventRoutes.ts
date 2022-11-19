import { Router } from 'express';
import { EventController } from '../controllers/event-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { havePermission } from '../middlewares/havePermission';

const eventRoutes = Router();

const eventController = new EventController();

eventRoutes.use(ensureAuthenticated);

eventRoutes.post("/create", havePermission(["EVENT_CREATE"]), eventController.createEvent);
eventRoutes.post("/search", havePermission(["EVENT_LIST"]), eventController.search)

export { eventRoutes };