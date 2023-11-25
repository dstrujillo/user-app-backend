import type { Request, Response } from 'express';

import { createUserService } from '@/services/user.service';

export const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.body;
  console.log(req.body);
  try {
    const createdUser = await createUserService(user);
    res.json({
      message: 'User created successfully',
      user: createdUser
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error creating user',
      error: err
    });
  }
};
