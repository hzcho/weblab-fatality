import User from "../models/user.js";
import {BadRequestError, UnauthorizedError } from "../utils/errors.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_EXPIRATION = "15m";

class AuthService{
    async register(name, email, password){
        const existsUser= await User.findOne({ where: {email} })
        if (existsUser){
            throw new BadRequestError("Пользователь с таким email уже существует");
        }

        await User.create({name, email, password})
    }

    async login(email, password){
        const existsUser=await User.findOne({where: {email}})
        if(!existsUser){
            throw new UnauthorizedError("Неверный email или пароль1");
        }

        const isPasswordValid = await bcrypt.compare(password, existsUser.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Неверный email или пароль2");
        }

        const accessToken = jwt.sign(
            { id: existsUser.id, email: existsUser.email, name: existsUser.name },
            JWT_SECRET,
            { expiresIn: ACCESS_EXPIRATION }
        );

        return accessToken;
    }
}

export default new AuthService();