import { Router } from "express";
import { login, register, getUsers } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.get('/',verifyToken, getUsers)
authRouter.post('/login', login)
authRouter.post('/register', register)

export default authRouter;