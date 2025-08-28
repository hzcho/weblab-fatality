import { Response } from 'express';

class CustomError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

class BadRequestError extends CustomError {
  constructor(message = 'Некорректный запрос') {
    super(message, 400);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message = 'Неавторизованный доступ') {
    super(message, 401);
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'Ресурс не найден') {
    super(message, 404);
  }
}

class InternalServerError extends CustomError {
  constructor(message = 'Внутренняя ошибка сервера') {
    super(message, 500);
  }
}

class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden: Invalid API Key') {
    super(message, 403);
  }
}

// handleError с типизацией Express Response
const handleError = (
  res: Response,
  error: unknown,
  defaultMessage?: string,
) => {
  console.error(defaultMessage || error);

  const statusCode = error instanceof CustomError ? error.statusCode : 500;
  const message =
    error instanceof Error ? error.message : defaultMessage || 'Ошибка сервера';

  res.status(statusCode).json({ error: message });
};

export {
  CustomError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  InternalServerError,
  ForbiddenError,
  handleError,
};
