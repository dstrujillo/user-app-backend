/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  createUserController,
  getUsersController,
  loginController
} from '@/controllers/user.controller';

const userRouter = Router();

/* userRouter.get('/', (req, res) => {
  res.json({ message: 'userRouter GET' });
});
*/

userRouter.get('/', getUsersController);

userRouter.post('/', createUserController);

userRouter.post('/login', loginController);

export default userRouter;
