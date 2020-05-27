import { Router } from "express";
import EventsController from "../controllers/EventController";

  const router = Router();
  // list all events
  router.get("/", EventsController.listAll);

  //Edit one event
  router.patch(
    "/:id([0-9]+)",
    EventsController.editEvent
  );

  router.get(
    "/:id([0-9]+)",
    EventsController.getOneById
  );

  //Delete one event
  router.delete(
    "/:id([0-9]+)",
    EventsController.deleteEvent
  );

  // list event cards
  router.get("/cards", EventsController.listEventCards);

  //Create a new event
  router.post("/", EventsController.createEvent);

  export default router;