import {Schema, model, Document} from 'mongoose';
import {CollectionNames} from "../constants";
import {ContactSchema as Contact} from "../types";

const ContactSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: CollectionNames.USER,
    },
    name: {
        type: String,
        required: [true, 'Please add the contact name']
    },
    email: {
        type: String,
        required: [true, 'Please add the email address']
    },
    phone: {
        type: String,
        required: [true, 'Please add the phone number']
    }
}, {timestamps: true});


export type ContactDoc = Document & Contact;
export default model<ContactDoc>(CollectionNames.CONTACT, ContactSchema);