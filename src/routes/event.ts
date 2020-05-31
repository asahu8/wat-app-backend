import { Router } from "express";
import EventsController from "../controllers/EventController";
import { checkJwt } from "../middlewares/checkJwt";

  const router = Router();
  // list all events
  router.get("/", [checkJwt], EventsController.listAll);

  //Edit one event
  router.patch(
    "/:id([0-9]+)",
    [checkJwt],
    EventsController.editEvent
  );

  router.get(
    "/:id([0-9]+)",
    [checkJwt],
    EventsController.getOneById
  );

  //Delete one event
  router.delete(
    "/:id([0-9]+)",
    [checkJwt],
    EventsController.deleteEvent
  );

  // list event cards
  router.get("/cards",[checkJwt], EventsController.listEventCards);

  //Create a new event
  router.post("/",  [checkJwt], EventsController.createEvent);

  export default router;