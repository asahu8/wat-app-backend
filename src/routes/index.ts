import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import event from './event';
import footer from './footer';

const routes = Router();

routes.use("/contributors", user);
routes.use("/events", event);
routes.use("/footer-contents", footer);

export default routes;
