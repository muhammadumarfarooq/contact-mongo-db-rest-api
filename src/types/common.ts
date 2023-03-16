import {Request} from "express";

export interface AuthenticatedRequest extends Request {
    user: any; // change "any" to the type of your user object
}