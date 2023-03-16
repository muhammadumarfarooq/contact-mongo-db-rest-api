import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {LoginUserDto, RegisterUserDto} from "../validation";
import User, {UserDoc} from "../models/user.model";
import {BadRequest} from "../errors";

const mapUser = (user: UserDoc) => ({
    id: user.id,
    name: user.username,
    email: user.email,
});

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

export const loginUser = async (params: LoginUserDto) => {
    const {email, password} = params;
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))){
        return jwt.sign({user: {
            username: user.username,
            email: user.email,
            id: user.id,
            }},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30m'}
        );
    } else{
        throw new BadRequest('User or password is incorrect');
    }
}

export const getUser = async (id: string) => {
    const foundUser = await User.findById(id);
    if(!foundUser){
        throw new BadRequest('User not found');
    }

    return mapUser(foundUser);
};