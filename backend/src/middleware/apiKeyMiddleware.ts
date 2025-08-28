import { ForbiddenError } from '@utils/errors.js';
import { Request, Response, NextFunction } from 'express';

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('x-api-key');

  if (!apiKey || apiKey !== process.env.API_KEY) {
    throw new ForbiddenError();
  }

  next();
};

export default apiKeyMiddleware;
