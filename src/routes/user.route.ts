import { Router } from 'express';

import { createUserController } from '@/controllers/user.controller';

const userRouter = Router();

userRouter.get('/', (req, res) => {
  res.json({ message: 'userRouter GET' });
});

userRouter.post('/', createUserController);

export default userRouter;
