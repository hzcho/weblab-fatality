import asyncHandler from '@middleware/asyncHandler.js';
import { BadRequestError } from '@utils/errors.js';
import AuthService from '@services/authService.js';
import { Request, Response } from 'express';

class AuthController {
  register = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new BadRequestError('Все обязательные поля должны быть заполнены');
    }

    await AuthService.register(name, email, password);
    res.status(200).json({ message: 'успешная регистрация' });
  });

  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const tokens = await AuthService.login(email, password);
    res.status(200).json(tokens);
  });

  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    const tokens = await AuthService.refreshToken(refreshToken);
    res.status(200).json(tokens);
  });
}

export default new AuthController();
