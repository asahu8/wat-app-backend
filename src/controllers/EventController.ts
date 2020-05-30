import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { Event } from "../entity/Event";

class EventController{
  static listAll = async(req: Request, res: Response) => {
    const eventRepository = getRepository(Event);

    const events = await eventRepository.find({
      select: [ "id", "name", "eventDate", "budget", "items", "description", "location", "active" ]
    });
    res.send(events);
  };

  static getOneById = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id: string = req.params.id;

    //Get the user from database
    const eventRepository = getRepository(Event);
    try {
      const event = await eventRepository.findOneOrFail(id, {
        select: [ "id", "name", "eventDate", "budget", "items", "description", "location", "active" ]
      });
      res.send(event);
    } catch (error) {
      res.status(404).send("Event not found");
    }
  };

  static createEvent = async (req: Request, res: Response) => {
    const eventRepository = getRepository(Event);
    let eventData = req.body.event;
    try {
      await eventRepository.save(eventData);
    } catch (e) {
      console.log(e);
      res.status(500).send("something went wrong");
      return;
    }
    setTimeout(() => {  res.status(201).send("Event created"); }, 3000);
  };

  static deleteEvent = async (req: Request, res: Response) => {
    const id = req.params.id;
    const eventRepository = getRepository(Event);
    let event: Event;
    try {
      event = await eventRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Event not found");
      return;
    }
    eventRepository.delete(id);
    res.status(204).send();
  }

  static editEvent = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, eventDate, budget, items, description, location, active } = req.body.event;
    const eventRepository = getRepository(Event);
    let event;

    try {
      event = await eventRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("Event not found");
      return;
    }

    event.name = name;
    event.eventDate = eventDate;
    event.budget = budget;
    event.items = items;
    event.description = description;
    event.location = location;
    event.active = active;
    const errors = await validate(event);
    if (errors.length > 0) {
      console.log(event);
      res.status(400).send(errors);
      return;
    }

    try {
      await eventRepository.save(event);
    } catch (e) {
      console.log(e); // TODO: Remove this after adding synching all validations with frontend
      res.status(409).send("some issue occured");
      return;
    }
    setTimeout(() => { res.status(204).send(); }, 3000);

  };

  static listEventCards = async(req: Request, res: Response) => {
    res.status(201).send({
      data: [
        { id: 1, cardType: "past", cardName: "past events", eventCount: 50 },
        { id: 2, cardType: "future", cardName: "future events", eventCount: 15 }
      ]
    })
  }
}

export default EventController;
