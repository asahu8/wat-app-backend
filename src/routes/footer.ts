import { Router } from "express";
import FooterController from "../controllers/FooterController";

  const router = Router();
  // list all footer-contentss
  router.get("/", FooterController.getAll);

export default router;