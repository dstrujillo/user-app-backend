import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'No se ha enviado un token' });
    return;
  }
  const jwtToken = process.env.JWT_API_SECRET_KEY || '';
  try {
    const isValid = jwt.verify(token, jwtToken);
    console.log(isValid);
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({ message: 'Token inválido' });
  }
};
