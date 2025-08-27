import asyncHandler from "../middleware/asyncHandler.js";
import {BadRequestError } from "../utils/errors.js";
import AuthService from "../services/authService.js"

class AuthController{
    register=asyncHandler(async (req, res) => {
        const {name, email, password} = req.body;

        if (!name || !email || !password){
             throw new BadRequestError("Все обязательные поля должны быть заполнены");
        }

        await AuthService.register(name, email, password)
        res.status(200).json({message: "успешная регистрация"})
    });

    login=asyncHandler(async (req, res) =>{
        const {email, password} =req.body;

        const accessToken= await AuthService.login(email, password);
        res.status(200).json(accessToken)
    });
}

export default new AuthController();