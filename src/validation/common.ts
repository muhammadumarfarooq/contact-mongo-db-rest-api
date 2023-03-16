import {z, ZodError} from "zod";

export const zodAnyString = z.string();
export const zodAnyBoolean = z.boolean();
export const zodAnyNumber = z.number().nonnegative();
export const zodAnyStringArray = z.array(z.string());

export const customZodError = (err: ZodError) => {
    const firstErr = err.errors[0];
    return `${firstErr.message}: [${firstErr.path[0]}]`;
};