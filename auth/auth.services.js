import httpStatusCodes from "../shared/httpstatuscodes.js";
import ApiError from "../shared/apiError.js";

import pool from "../config/db.config.js";
import hashPassword from "../utils/hashPassword.js";
import checkUser from "../utils/checkUser.js";
import checkPassword from "../utils/checkPassword.js";
import generateToken from "../utils/generateToken.js";


class AuthServices {
  // Register new user handler
  async registerUser(name, email, username, password){

    const userFound = await checkUser(email, username);
    if(userFound){
      throw new ApiError("Email or Username not valid", httpStatusCodes.CONFILCT);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *", 
      [name, email, username, hashedPassword]
    );

    if (!newUser.rows.length) {
      throw new ApiError("Error creating user", httpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    return newUser.rows[0];
  }

  // Login user handler
  async loginUser(username, password){
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if(checkUser.rowCount === 0){
      throw new ApiError("Wrong username", httpStatusCodes.BAD_REQUSEST);
    }
    
    const correctPassword = await checkPassword(password, checkUser.rows[0].password);
    if(!correctPassword){
      throw new ApiError("Wrong password", httpStatusCodes.BAD_REQUSEST);
    }

    const token = generateToken(checkUser.rows[0]);
    const loggedInUser = {
      userId: checkUser.rows[0].id,
      name: checkUser.rows[0].name,
      email: checkUser.rows[0].email,
      username: checkUser.rows[0].username,
      token
    };
    return loggedInUser;
  }

  // User profile handler
  async userProfile(id){
    const user = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    if (!user) {
      throw new ApiError("User not found", httpStatusCodes.NOT_FOUND);
    }
    
    const profile = {
      name: user.rows[0].name,
      email: user.rows[0].email,
      username: user.rows[0].username
    };
    return profile
  }

  // User logout handler
  async userLogout(token){
    const expiredToken = await pool.query(
      "INSERT INTO logout_tokens (token) VALUES ($1) RETURNING *",
      [token]
    );
    if(expiredToken.rowCount === 0){
      throw new ApiError("Error logging out", httpStatusCodes.INTERNAL_SERVER_ERROR);
    }
    return true;
  }

  // Update user info hander
  async updateProfile(id, newName, newEmail, newUsername, newPassword){
    const user = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );
    
    if (user.rowCount === 0) {
      throw new ApiError("User not found", httpStatusCodes.NOT_FOUND);
    }

    const newHashedPassword = newPassword ? await hashPassword(newPassword) : user.rows[0].password;
    const name = newName || user.rows[0].name;
    const email = newEmail || user.rows[0].email;
    const username = newUsername || user.rows[0].username;
    const password = newHashedPassword || user.rows[0].password;

    const updatedUser = await pool.query(
      "UPDATE users SET name = $1, email = $2, username = $3, password = $4, updatedAt = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *",
      [name, email, username, password, id]
    );

    if(!updatedUser){
      throw new ApiError("Error updating user info", httpStatusCodes.INTERNAL_SERVER_ERROR);
    }

    return updatedUser.rows[0];
  }

  // Delete user profile handler
  async deletePrrofile(id){
    const deleteUserContacts = await pool.query(
      "DELETE FROM contacts WHERE user_id = $1",
      [id]
    )
    const deleted = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if(deleted.rowCount === 0){
      throw new ApiError("user not found", httpStatusCodes.NOT_FOUND);
    }

    return deleted.rows[0].id;
  }
}

export default AuthServices;