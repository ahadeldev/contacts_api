import httpStatusCodes from "../shared/httpstatuscodes.js";
import ApiError from "../shared/apiError.js";

import pool from "../config/db.config.js";

class ContactsServices {

  // Create new contact handler
  async createContact(first_name, last_name, phone_number, address, user_id){
    const newContact = await pool.query(
      `
      INSERT INTO contacts (first_name, last_name, phone_number, address, user_id) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [first_name, last_name, phone_number, address, user_id]
    );

    if(!newContact.rows.length){
      throw new ApiError("Error creating contact", httpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    return newContact.rows[0];
  }

  // Get all contacts
  async getAllContacts(id){
    const contacts = await pool.query("SELECT * FROM contacts WHERE user_id = $1", [id]);
    if(!contacts.rows.length){
      throw new ApiError("Error getting contacts". httpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    return contacts.rows;
  }

  // Get contact by id handler
  async getContact(id){
    const contact = await pool.query(
      `SELECT * FROM contacts WHERE id = $1`,
      [id]
    );
    
    if(!contact.rows.length){
      throw new ApiError("Contact not found", httpStatusCodes.NOT_FOUND);
    }

    return contact.rows[0];
  }

  // Update contact by id handler
  async updateContact(id, newFirstName, newLastName, newPhoneNumber, newEmail, newAddress){
      if(id.length < 36){
        throw new ApiError("Invalid id", httpStatusCodes.UNPROCESSABLE_ENTITY);
      }

      const contact = await pool.query(
        `SELECT * FROM contacts WHERE id = $1`,
        [id]
      );
      
      if(!contact){
        throw new ApiError("Contact not found", httpStatusCodes.NOT_FOUND);
      }

      const first_name = newFirstName || contact.rows[0].first_name;
      const last_name = newLastName || contact.rows[0].last_name;
      const phone_number = newPhoneNumber || contact.rows[0].phone_number;
      const email = newEmail || contact.rows[0].email;
      const address = newAddress || contact.rows[0].address;

      const updatedContact = await pool.query(
        `UPDATE contacts SET 
        first_name = $1,
        last_name = $2, 
        phone_number = $3,
        email = $4,
        address = $5,
        updatedAt = CURRENT_TIMESTAMP
        WHERE id = $6
        RETURNING *`,
        [first_name, last_name, phone_number, email, address, id]
      );

      if(!updatedContact){
        throw new ApiError("Error updating contact", httpStatusCodes.INTERNAL_SERVER_ERROR);
      }
      
      return updatedContact.rows[0];
  }

  // Delete contact handler
  async deleteConatct(id){
    if(id.length < 36){
      throw new ApiError("Invalid id", httpStatusCodes.UNPROCESSABLE_ENTITY);
    }

    const deletedContact = await pool.query(
      `DELETE FROM contacts WHERE id = $1 RETURNING *`, 
      [id]);
    
    if(!deletedContact.rows.length){
      throw new ApiError("Contact not found", httpStatusCodes.NOT_FOUND);
    }
    return deletedContact.rows[0];
  }
}

export default ContactsServices;