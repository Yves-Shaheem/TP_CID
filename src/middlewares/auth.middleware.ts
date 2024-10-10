import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/jwt.util';

// Middleware pour vérifier le JWT
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Access denied or no token provided.' });
    try {
        jwt.verify(token, JWT_SECRET, (err, user) => {
          if (err) return res.sendStatus(403).json({ message: 'Access denied or no token provided.' });
          req.body.user = user;
          next();
      });
      } catch (error) {
        res.status(401).json({ message: 'Invalid Token.' });
      }
};
