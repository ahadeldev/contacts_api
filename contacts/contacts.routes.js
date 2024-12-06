import express from "express";
import ContactsControllers from "./contacts.controlers.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();
const contactsControllers = new ContactsControllers();

// Create new contact route
router.post("/create", verifyToken, contactsControllers.createContactController);

// Get all contacts route
router.get("/all", verifyToken, contactsControllers.getAllContactsController);

// Get a contact route
router.get("/:id", verifyToken, contactsControllers.getContactController);

// Update contact route
router.put("/:id", verifyToken, contactsControllers.updateContactController);

// Delete contact route
router.delete("/:id", verifyToken, contactsControllers.deleteConatctController);

export default router;