import express from "express";

import AuthControllers from "./auth.controllers.js";
import verifyToken from "../middlewares/verifyToken.js";
import logoutMiddleware from "../middlewares/logoutMiddleware.js";

const authControllers = new AuthControllers();
const router = express.Router();

// Register new user route
router.post("/register", authControllers.registerUserController);

// Login user route
router.post("/login", authControllers.loginUserController);

// User profile Route
router.get("/profile", verifyToken, authControllers.userProfileController);

// user logout route
router.post("/profile", logoutMiddleware, authControllers.userLogoutController);

// update profile info route
router.put("/profile", verifyToken, authControllers.updateProfileController);

// Delete user profile
router.delete("/profile", verifyToken, authControllers.deleteProfileController);

export default router;