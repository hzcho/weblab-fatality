import User from "../models/user.js";
import {BadRequestError, UnauthorizedError } from "../utils/errors.js";

class AuthService{
    async register(name, email, password){
        existsUser=User.findOne({ where: {email} })
        if (existsUser){
            throw new BadRequestError("Пользователь с таким email уже существует");
        }

        User.create({name, email, password})
    }

    async login(email, password){
        existsUser=User.findOne({where: {email}})
        if(!existsUser){
            throw new UnauthorizedError("Неверный email или пароль");
        }

        const isPasswordValid = await bcrypt.compare(password, existsUser.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError("Неверный email или пароль");
        }

        const accessToken = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: ACCESS_EXPIRATION }
        );

        return accessToken;
    }
}