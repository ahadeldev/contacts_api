import httpStatusCodes from "../shared/httpstatuscodes.js";
import ApiError from "../shared/apiError.js";
import ContactsServices from "./contacts.services.js";

const contactsServices = new ContactsServices();

class ContactsControllers {

  // @desc    Create new contact
  // @route   POST /api/v1/contacts/create
  // @access  Private
  async createContactController(req, res, next){
    const userId = req.user.id;
    const {first_name, last_name, phone_number, address} = req.body;
    if(!first_name || !last_name || !phone_number){
      return next(new ApiError("All firlds required (first_name, last_name, phone_number)"), httpStatusCodes.UNPROCESSABLE_ENTITY);
    }

    try {
      const created = await contactsServices.createContact(first_name, last_name, phone_number, address, userId);
      res.status(httpStatusCodes.RESOURCE_CREATED).json(created)
    } catch (err) {
      if(err instanceof ApiError){
        return next(err);
      }
    }
  }

  // @desc    Get all contacts
  // @route   GET /api/v1/contacts/all
  // @access  Private
  async getAllContactsController(req, res, next){
    const userId = req.user.id
    try {
      const allContacts = await contactsServices.getAllContacts(userId);
      res.status(200).json(allContacts);
    } catch (err) {
      if (err instanceof ApiError) {
        return next(err);
      }
    }
  }

  // @desc    Get certain contact via id
  // @route   GET /api/v1/contacts/:id
  // @access  Private
  async getContactController(req, res, next){
    const id = req.params.id;
    try {
      const found = await contactsServices.getContact(id);
      res.status(httpStatusCodes.OK).json(found);
    } catch (err) {
      if(err instanceof ApiError){
        return next(err);
      }
    }
  }

  // @desc    Update contact via id
  // @route   PUT /api/v1/contacts/:id
  // @access  Private
  async updateContactController(req, res, next){
    const id = req.params.id;
    const {newFirstName, newLastName, newPhoneNumber, newEmail, newAddress} = req.body;
    try {
      const updated = await contactsServices.updateContact(id, newFirstName, newLastName, newPhoneNumber, newEmail, newAddress);
      res.status(httpStatusCodes.OK).json(updated);
    } catch (err) {
      if (err instanceof ApiError) {
        return next(err);
      }
    }
  }

  // @desc    Delete contact via id
  // @route   DELETE /api/v1/contacts/:id
  // @access  Private
  async deleteConatctController(req, res, next){
    const id = req.params.id;
    try {
      const deleted = await contactsServices.deleteConatct(id);
      res.status(httpStatusCodes.OK).json(deleted);
    } catch (err) {
      if (err instanceof ApiError) {
        return next(err);
      }
    }
  }
}

export default ContactsControllers;