import {Document, model, Schema} from 'mongoose';
import {UserSchema as User} from "../types";
import {CollectionNames} from "../constants";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please add the username"]
    },
    email: {
        type: String,
        required: [true, 'Please add the user email address'],
        unique: [true, "Email address already taken"]
    },
    password: {
        type: String,
        required: [true, "Please add the user password"]
    }
}, {timestamps: true});

export type UserDoc = Document & User;
export default model<UserDoc>(CollectionNames.USER, UserSchema);