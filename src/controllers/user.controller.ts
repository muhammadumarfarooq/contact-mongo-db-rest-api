import bcrypt from 'bcrypt';
import { RegisterUserDto } from "../validation";
import User from "../models/user.model";
import {BadRequest} from "../errors";

export const registerUser = async (params: RegisterUserDto) => {
    const userAvailable = await User.findOne({email: params.email});
    if(userAvailable){
        throw new BadRequest('User already registered');
    }

    const hashedPassword = await bcrypt.hash(params.password, 10);

    return await User.create({
        username: params.username,
        email: params.email,
        password: hashedPassword,
    });

}