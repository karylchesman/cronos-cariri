import { Router } from 'express';
import { EventController } from '../controllers/event-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const eventRoutes = Router();

const eventController = new EventController();

eventRoutes.use(ensureAuthenticated);

eventRoutes.post("/create", eventController.createEvent);

export { eventRoutes };