import { Request, Response } from 'express';
import ProfileService from "@services/profileService";
import { UnauthorizedError } from '@utils/errors';
import User from '@models/user';
import asyncHandler from '@middleware/asyncHandler.js';

class ProfileController{
    getCurrentUser = asyncHandler(async (req:Request, res:Response) =>{
        if (!req.user) {
        throw new UnauthorizedError("пользователь не авторизирован");
      }

      const currentUser = req.user as User;
      const user = await ProfileService.getUserById(currentUser.id);
      
      res.status(200).json(user)
    })
}

export default new ProfileController();