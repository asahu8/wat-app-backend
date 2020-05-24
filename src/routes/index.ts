import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import event from './event';

const routes = Router();

// routes.use("/auth", auth);
routes.use("/contributors", user);
routes.use("/events", event);

export default routes;
