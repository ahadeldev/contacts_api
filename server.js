import express from "express";
import dotenv from "dotenv";

import dbConn from "./config/db.conn.js";
import logger from "./middlewares/logger.js";
import routeNotFound from "./middlewares/notFound.js";
import appErrorhandler from "./middlewares/appErrorHandler.js";

import authRoutes from "./auth/auth.routes.js";
import contactsRoutes from "./contacts/contacts.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.json());
app.use(logger);

// API routes
app.use("/api/v1/auth", authRoutes); // User authentiaction and autherization routes
app.use("/api/v1/contacts", contactsRoutes); // Contacts routes

// route not found middleware
app.use(routeNotFound);

// Global error hanlder middleware
app.use(appErrorhandler);

dbConn();
app.listen(PORT, ()=>{
  console.log(`==> Server running on port: ${PORT}`);
})