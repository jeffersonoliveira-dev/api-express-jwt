import express from 'express';
import * as AuthController from '../controllers/auth.controller';
import { userCreateValidator, userLoginValidator } from '../validators/user.validator';

const authRouter = express.Router();

authRouter.post('/register',userCreateValidator, AuthController.register);
authRouter.post('/login', userLoginValidator, AuthController.login);
export default authRouter;
