import { Router } from "express";
import { getCards, unlockCards } from "../controllers/card.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const cardRouter = Router()

cardRouter.get('/', getCards)
cardRouter.put('/unlockCards', verifyToken, unlockCards)

export default cardRouter;