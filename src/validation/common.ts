import {ZodError} from "zod";

export const customZodError = (err: ZodError) => {
    const firstErr = err.errors[0];
    return `${firstErr.message}: [${firstErr.path[0]}]`;
};