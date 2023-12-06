import type { Request, Response } from 'express';
import Joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  createUserService,
  getUsersService,
  getOneUserService
} from '@/services/user.service';

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})
  .messages({
    'any.required': 'El campo {{#label}} es obligatorio',
    'string.email': 'El campo {{#label}} no es válido',
    'string.min': 'El campo {{#label}} debe ser de longitud {{#limit}}'
  })
  .options({ abortEarly: false });

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})
  .messages({
    'any.required': 'El campo {{#label}} es obligatorio',
    'string.email': 'El campo {{#label}} no es válido',
    'string.min': 'El campo {{#label}} debe ser de longitud {{#limit}}'
  })
  .options({ abortEarly: false });

export const createUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.body;
  const { error } = createUserSchema.validate(user);
  if (error) {
    res.status(400).json({
      message: 'Error creating user',
      error: error.details
    });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(user.password, salt);

  const newUser = {
    ...user,
    password: hashedPassword
  };

  try {
    const createdUser = await createUserService(newUser);
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

export const getUsersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getUsersService();
    res.status(200).json({
      message: 'Users fetched successfully',
      users
    });
  } catch (err) {
    res.status(500).json({
      message: 'Could not retrieve users',
      err
    });
  }
};

export const getOneUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await getOneUserService({ _id: id });
    res.status(200).json({
      message: 'User fetched successfully',
      user
    });
  } catch (err) {
    res.status(500).json({
      message: 'Could not find user',
      err
    });
  }
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const loginData = req.body;
  const { error } = loginUserSchema.validate(loginData);
  if (error) {
    res.status(400).json({
      message: 'Error login user',
      error: error.details
    });
    return;
  }

  const { email, password } = loginData;
  const user = await getOneUserService({ email });

  if (!user) {
    res.status(401).json({
      message: 'Invalid credentials'
    });
    return;
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    res.status(401).json({
      message: 'Invalid credentials'
    });
    return;
  }

  const jwtToken = process.env.JWT_API_SECRET_KEY || '';

  const token = jwt.sign(
    {
      name: user.name,
      email: user.email
    },
    jwtToken,
    { expiresIn: '1h' }
  );

  res.json({
    message: 'User successfully logged in',
    accessToken: token
  });
};
