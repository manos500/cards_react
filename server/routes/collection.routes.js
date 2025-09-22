import { Router } from "express";
import { getUserCollection } from "../controllers/collection.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const collectionRouter = Router();

collectionRouter.get('/', verifyToken, getUserCollection)

export default collectionRouter;