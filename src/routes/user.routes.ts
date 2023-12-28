import express from 'express';
import * as UserController from '../controllers/user.controller';
import { authenticateJwt } from '../middlewares/auth.middleware';
import { userUpdateValidator } from '../validators/user.validator';

const userRouter = express.Router();

userRouter.get('/', authenticateJwt, UserController.getAllUsers);
userRouter.get('/:id', authenticateJwt, UserController.getUserById);
userRouter.put('/:id', authenticateJwt, userUpdateValidator, UserController.updateUser);
userRouter.delete('/:id', authenticateJwt, UserController.removeUser);

export default userRouter;