import {
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  ManyToOne,
  BeforeInsert,
} from "typeorm";
import { Length } from "class-validator";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "./User";

@Entity("events")
export default class Event {

  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id: number;

  @ManyToOne(type => User, user => user.events)
  user: User

  @Length(4, 50)
  @Column()
  name: string;


  @Column()
  eventDate: string;

  @Column()
  budget: number

  @Column()
  @Length(4, 50)
  items: string;

  @Column()
  @Length(4, 200)
  description: string;

  @Column()
  @Length(4, 30)
  location: string;

  @Column()
  active: boolean;


  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  constructor(event: Partial<Event>) {
    Object.assign(this, event);
 }

 @BeforeInsert()
 modifyText() {
   this.active =  new Date(this.eventDate) >= new Date();
 }

 static getAllEvents = async() =>{
  return await Event.eventRepo().find({
    select: ["id", "name", "eventDate", "budget", "items", "description", "location", "active"]
  });
 }

 static getEventByID = async(eventID: number) => {
  return await Event.eventRepo().findOne(eventID);
 }

 static createEvent = async(eventObject) => {
   try {
      return await Event.eventRepo().save(eventObject);
   } catch(error) {
    return null;
   }
 }

 static updateEvent = async(eventObject: any) => {
  const property = await Event.eventRepo().findOne({
    where: { id: eventObject.id }
  });

  return await Event.eventRepo().save({
    ...property,
    ...eventObject
  });
 }

 static deleteEvent = async(eventID) => {
  return await Event.eventRepo().delete(eventID)
 }

 static validateEvent = async(eventObject: any) => {
  return await validate(new Event(eventObject));
 }

 private static eventRepo() {
  return getRepository(Event);
 }

}
