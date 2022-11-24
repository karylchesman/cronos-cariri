import { Router } from 'express';
import multer from 'multer';
import { EventController } from '../controllers/event-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { havePermission } from '../middlewares/havePermission';
import uploadDetailsEventConfig from '../../infra/multer/upload-details-event-config';

const eventRoutes = Router();

const eventController = new EventController();

eventRoutes.use(ensureAuthenticated);

eventRoutes.post("/create", havePermission(["EVENT_CREATE"]), eventController.createEvent);
eventRoutes.put("/basic-info/update", havePermission(["EVENT_BASIC_UPDATE"]), eventController.updateEvent);
eventRoutes.post("/search", havePermission(["EVENT_LIST"]), eventController.search);
eventRoutes.get("/url/:url_path/config", havePermission(["EVENT_CONFIG"]), eventController.getByUrl);
eventRoutes.put("/details/update", multer(uploadDetailsEventConfig).single("details"), havePermission(["EVENT_DETAILS_UPDATE"]), eventController.updateDetails);

export { eventRoutes };