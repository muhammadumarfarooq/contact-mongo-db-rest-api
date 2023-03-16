import { z } from 'zod';
import {
    zodAnyString,
} from './common';

export const registerUserSchema = z.object({
    username: zodAnyString,
    email: zodAnyString,
    password: zodAnyString,
});
export const loginUserSchema = z.object({
    email: zodAnyString,
    password: zodAnyString,
});

export type RegisterUserDto = z.infer<typeof registerUserSchema>;
export type LoginUserDto = z.infer<typeof loginUserSchema>;
