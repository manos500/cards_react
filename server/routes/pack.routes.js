import { Router } from "express";
import { getPacks } from "../controllers/pack.controller.js";

const packRouter = Router();

packRouter.get('/', getPacks)

export default packRouter;