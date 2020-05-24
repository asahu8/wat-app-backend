import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Event } from "../entity/Event";

class EventController{
  static listAll = async(req: Request, res: Response) => {
    const eventRepository = getRepository(Event);
    /*
     TODO: Needs bit work to send required attributes to frontend
    const events = await eventRepository.find({
      select: [ "id", "name", "eventDate", "budget", "items", "description", "location", "active" ]
    });
    res.send(events);
    */
    res.status(201).send({
      data: [
        { id: 1, name: "Hearing Aids", date: "2020-02-10", createdBy: "ajays", commentsCount: 10, canView: true, canEdit: true, canDel: true },
        { id: 2, name: "Books to Orphan age", date: "2020-01-10", createdBy: "mmuray", commentsCount: 20, canView: true, canEdit: true, canDel: true },
        { id: 3, name: "Mountain Biking", date: "2020-05-10", createdBy: "alexh", commentsCount: 30, canView: true, canEdit: true, canDel: true },
        { id: 4, name: "Summer camp", date: "2020-07-10", createdBy: "rberger", commentsCount: 12, canView: true, canEdit: true, canDel: true }
      ]
    });

  };

  static createEvent = async (req: Request, res: Response) => {
    const eventRepository = getRepository(Event);
    let eventData = req.body.event;
    eventData.budget = 500;
    eventData.items = "default item";
    eventData.active = true;
    try {
      await eventRepository.save(eventData);
    } catch (e) {
      console.log(e);
      res.status(500).send("something went wrong");
      return;
    }
    //If all ok, send 201 response
    res.status(201).send("Event created");
  };

  static listEventCards = async(req: Request, res: Response) => {
    res.status(201).send({
      data: [
        { cardType: "past", cardName: "past events", eventCount: 50 },
        { cardType: "future", cardName: "future events", eventCount: 15 }
      ]
    })
  }
}

export default EventController;
