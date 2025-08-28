import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

function errorMiddleware(err: CustomError, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  if (err.statusCode) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}

export default errorMiddleware;
