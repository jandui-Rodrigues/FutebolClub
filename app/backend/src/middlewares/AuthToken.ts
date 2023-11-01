import { NextFunction, Request, Response } from 'express';
import { log } from 'console';
import jwt from '../utils/jwt';

class AuthValidation {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    // Bearer
    const [, token] = authorization.split(' ');

    try {
      const payload = jwt.verify(token);
      log(payload);
      res.locals.user = payload;
      return next();
    } catch (err) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default AuthValidation;
