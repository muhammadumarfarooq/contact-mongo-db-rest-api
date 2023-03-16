import { z } from 'zod';
import {
    zodAnyString,
} from './common';

export const createContactSchema = z.object({
    name: zodAnyString,
    email: zodAnyString,
    phone: zodAnyString,
});

export type CreateContactDto = z.infer<typeof createContactSchema>;
