import Contact, {ContactDoc} from '../models/contact.model';
import {BadRequest} from "../errors";
import {CreateContactDto} from "../validation/contact";

const mapContact = (contact: ContactDoc) => ({
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone
});

export const getContacts = async () => {
    const contacts = await Contact.find();
    if(!contacts){
        throw new BadRequest('Unable to get contacts');
    }

    return contacts.map(mapContact);
}

export const createContact = async (params: CreateContactDto) => {

    const foundContact = await Contact.findOne({
        phone: params.phone
    });

    if(foundContact){
        throw new BadRequest('A contact with the same phone number already exist!');
    }

    const contact = {
        name: params.name,
        phone: params.phone,
        email: params.email,
    };

    const newContact = await Contact.create(contact);

    if(!newContact){
       throw new BadRequest('Unable to create new contact');
    }

    return mapContact(newContact)
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