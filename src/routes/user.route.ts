/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import {
  createUserController,
  getUsersController,
  loginController
} from '@/controllers/user.controller';
import { authMiddleware } from '@/middlewares/auth.middleware';

const userRouter = Router();

/* userRouter.get('/', (req, res) => {
  res.json({ message: 'userRouter GET' });
});
*/

// Obtenere usuarios
userRouter.get('/', authMiddleware, getUsersController);
// userRouter.get('/', authMiddleware, getUsersController);

// Registrar usuarios
userRouter.post('/register', createUserController);

// Autenticación
userRouter.post('/login', loginController);

export default userRouter;
