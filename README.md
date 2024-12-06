# Contacts API  

A RESTful API for managing user accounts and their personal contacts, built with Node.js, Express.js, and PostgreSQL. The API includes user authentication and authorization using JWT, as well as CRUD operations for user contacts.  

## Table of Contents  
- [Features](#features)  
- [Technologies Used](#technologies-used)  
- [Folder Structure](#folder-structure)  
- [Routes](#routes)  
- [Installation](#installation)  
- [Usage](#usage)  
- [API Documentation](#api-documentation) 

---

## Features  
- **Authentication & Authorization**:  
  - User registration, login, and logout.  
  - Profile management (view, update, delete).  
  - JWT-based access control.  

- **Contacts Management**:  
  - Create, read, update, and delete contacts for authenticated users.  
  - Contacts are user-specific, ensuring data isolation.  

- **Error Handling**:  
  - Custom error messages with structured HTTP status codes.  
  - Graceful handling of invalid routes or methods.  

- **Security**:  
  - Passwords hashed using `bcrypt`.  
  - Token invalidation for secure logout.  

---

## Technologies Used  
- **Node.js**: Server-side runtime.  
- **Express.js**: Web framework for building the API.  
- **PostgreSQL**: Database for persisting data.  
- **JWT**: Authentication and authorization.  
- **bcrypt**: Password hashing.  
- **Postman**: API testing and documentation.  

---

## Folder Structure  
```
auth/
    auth.controllers.js
    auth.routes.js    
auth.services.js
config/
    db.config.js
    db.conn.js
contacts/
    contacts.controllers.js
    contacts.routes.js
    contacts.services.js
middlewares/
    appErrorHandler.js
    logger.js
    logoutMiddleware.js
    notFound.js
    verifyToken.js
postman/
    Contacts API.postman_collection.json
schema/
    schema.sql
shared/
    apiError.js
    httpStatusCodes.js
utils/
    checkPassword.js
    checkUser.js
    generateToken.js
    hashPassword.js
.env
.gitignore
package-lock.json
package.json
server.js
```

---

## Routes  

### Auth Service  
- **Register User**:  
  `POST /api/v1/auth/register` (Public)  
  Registers a new user.  

- **Login User**:  
  `POST /api/v1/auth/login` (Public)  
  Authenticates and provides a token.  

- **Get Profile**:  
  `GET /api/v1/auth/profile` (Private)  
  Retrieves the authenticated user's profile.  

- **Logout User**:  
  `POST /api/v1/auth/logout` (Private)  
  Logs out the user and invalidates the token.  

- **Update Profile**:  
  `PUT /api/v1/auth/profile` (Private)  
  Updates the authenticated user's profile.  

- **Delete Profile**:  
  `DELETE /api/v1/auth/profile` (Private)  
  Deletes the user's account and associated contacts.  

### Contacts Service  
- **Create Contact**:  
  `POST /api/v1/contacts/create` (Private)  
  Adds a new contact for the authenticated user.  

- **Get All Contacts**:  
  `GET /api/v1/contacts/all` (Private)  
  Retrieves all contacts for the authenticated user.  

- **Get Contact by ID**:  
  `GET /api/v1/contacts/:id` (Private)  
  Retrieves a specific contact by ID.  

- **Update Contact**:  
  `PUT /api/v1/contacts/:id` (Private)  
  Updates the details of a contact.  

- **Delete Contact**:  
  `DELETE /api/v1/contacts/:id` (Private)  
  Deletes a contact by ID.  

---

## Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/your-username/contacts-api.git  
   cd contacts-api  
   ```  

2. Install dependencies:  
   ```bash  
   npm install  
   ```  

3. Create a `.env` file and configure the following environment variables:  
   ```env  
   PORT=8000  
   DATABASE_URL=your_postgres_database_url  
   JWT_SECRET=your_jwt_secret  
   ```  

4. Run the database migrations using the provided schema:  
   ```bash  
   psql -U your_username -d contacts_api -f schema/schema.sql  
   ```  

5. Start the server:  
   ```bash  
   npm start  
   ```  

---

## Usage  
- Use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/) to test the API endpoints.  
- The `postman/Contacts API.postman_collection.json` file contains pre-configured requests for easy testing.  

---

## API Documentation  
The API is documented using a Postman collection, available in the `postman/` folder. Import it into Postman to view and test all endpoints.  
