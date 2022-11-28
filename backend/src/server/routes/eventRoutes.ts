import { Router } from 'express';
import multer from 'multer';
import { EventController } from '../controllers/event-controller';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { havePermission } from '../middlewares/havePermission';
import uploadDetailsEventConfig from '../../infra/multer/upload-details-event-config';
import uploadBannerCardEventConfig from '../../infra/multer/upload-banner-card-event-config';

const eventRoutes = Router();

const eventController = new EventController();

eventRoutes.get("/banner/:banner_archive_id/:file_name", eventController.getEventBanner);

eventRoutes.use(ensureAuthenticated);

eventRoutes.post("/create", havePermission(["EVENT_CREATE"]), eventController.createEvent);
eventRoutes.post("/search", havePermission(["EVENT_LIST"]), eventController.search);
eventRoutes.get("/url/:url_path/config", havePermission(["EVENT_CONFIG"]), eventController.getByUrl);

eventRoutes.put("/basic-info/update", havePermission(["EVENT_BASIC_UPDATE"]), eventController.updateEvent);
eventRoutes.put("/details/update", multer(uploadDetailsEventConfig).single("details"), havePermission(["EVENT_DETAILS_UPDATE"]), eventController.updateDetails);
eventRoutes.put("/banner/update", multer(uploadBannerCardEventConfig).single("banner"), havePermission(["EVENT_BANNER_UPDATE"]), eventController.updateBanner);
eventRoutes.put("/card/update", multer(uploadBannerCardEventConfig).single("card"), havePermission(["EVENT_CARD_UPDATE"]), eventController.updateCard);

eventRoutes.get("/banner/data/:event_id/:banner_archive_id", havePermission(["EVENT_BANNER_UPDATE"]), eventController.getEventBannerData);


export { eventRoutes };