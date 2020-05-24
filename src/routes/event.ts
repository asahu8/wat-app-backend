import { Router } from "express";
import EventsController from "../controllers/EventController";

  const router = Router();
  // list all events
  router.get("/", EventsController.listAll);

  // list event cards
  router.get("/cards", EventsController.listEventCards);

  //Create a new event
  router.post("/", EventsController.createEvent);

  export default router;