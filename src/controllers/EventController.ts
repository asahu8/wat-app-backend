import { Request, Response } from "express";
import Event from "../entity/Event";
import { isUndefined } from 'lodash';
import { User } from "../entity/User";

class EventController {

  static listAll = async (req: Request, res: Response) => {
    try {
      const events = await Event.getAllEvents();
      res.status(200).send(events);
    } catch (error) {
      res.status(500).send({ error: 'something went wrong' });
    }
  }

  static getOneById = async (req: Request, res: Response) => {
    try {
      const event = await Event.getEventByID(parseInt(req.params.id));
      res.status(200).send(event);
    } catch (error) {
      res.status(404).send({ error: "Event not found" });
    }
  }

  static createEvent = async (req: Request, res: Response) => {
    const eventParams = req.body;

    try {
      let event = new Event(eventParams);
      let currentUser = await EventController.getCurrentUser(req);

      if (currentUser === undefined) {
        return res.status(422).send({ error: "invalid user" });
      }

      event.user = currentUser[0];
      const validationResult = await Event.validateEvent(event)
      if (validationResult.length) {
        return res.status(422).send(validationResult);
      } else {
        const resource = await Event.createEvent(event);
        res.status(200).send(resource);
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ error: 'something went wrong' });
    }
  }

  static updateEvent = async (req: Request, res: Response) => {
    try {
      const validationResult = await Event.validateEvent(req.body);
      if (validationResult.length) {
        return res.status(422).send({ data: validationResult });
      }
      const event = Event.updateEvent(req.body);
      res.status(200).send({ data: event });
    } catch (error) {
      res.status(500).send({ error: 'something went wrong' })
    }
  }

  static deleteEvent = async (req: Request, res: Response) => {
    const eventID = parseInt(req.params.id);
    try {
      const event = await Event.getEventByID(eventID);

      if (isUndefined(event)) {
        return res.status(404).send({ error: "Event not found" });
      }
      await Event.deleteEvent(eventID);
      res.status(200).send({ data: event });

    } catch (error) {
      res.status(500).send({ error: "something went wrong" });
    }
  }

  static listEventCards = async (req: Request, res: Response) => {
    res.status(201).send([
      { id: 1, cardType: "past", cardName: "past events", eventCount: 50 },
      { id: 2, cardType: "future", cardName: "future events", eventCount: 15 }
    ]);
  }


  private static getCurrentUser = async (req) => {
    return await User.getUserByID(req['userID']);
  }
}

export default EventController;
