import Contacts, {ContactDoc} from '../models/contact.model';
import {BadRequest} from "../errors";

const mapContacts = (contact: ContactDoc) => ({
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone
});

export const getContacts = async () => {
    const contacts = await Contacts.find();
    if(!contacts){
        throw new BadRequest('Unable to get contacts');
    }

    return contacts.map(mapContacts);
}

export const createContact = () => {
    // create contact logic will go here...
}

export const getContact = () => {
    // get single contact logic will go here...
}

export const updateContact = () => {
    // update contact logic will go here...
}

export const deleteContact = () => {
    // delete contact logic will go here...
}