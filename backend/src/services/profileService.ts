import User from "@models/user";
import {BadRequestError} from "@utils/errors";

class ProfileService{
    async getUserById(id: string): Promise<User | null>{
        const user = User.findByPk(id)
        if (!user){
            throw new BadRequestError("пользователь не найден");
        }
        return user
    }
}

export default new ProfileService();