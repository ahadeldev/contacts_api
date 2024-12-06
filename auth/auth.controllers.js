import httpStatusCodes from "../shared/httpstatuscodes.js";
import ApiError from "../shared/apiError.js";

import AuthServices from "./auth.services.js";

const authServices = new AuthServices();

class AuthControllers {

  // @desc    Register new user
  // @route   POST /api/v1/auth/register
  // @access  Public
  async registerUserController(req, res, next){
    const {name, email, username, password} = req.body;
    if(!name || !email || !username || !password){
      return next(new ApiError("All fields required", httpStatusCodes.UNPROCESSABLE_ENTITY));
    }

    try {
      const userCreated = await authServices.registerUser(name, email, username, password);
      res.status(httpStatusCodes.RESOURCE_CREATED).json(userCreated);
    } catch (err) {
      if (err instanceof ApiError) {
        return next(err);
      }
    }
  }

  // @desc    Register new user
  // @route   POST /api/v1/auth/register
  // @access  Public
  async loginUserController(req, res, next){
    const {username, password} = req.body;
    if(!username || !password){
      return next(new ApiError("All fields required", httpStatusCodes.UNPROCESSABLE_ENTITY));
    }
    try {
      const loggedInUser = await authServices.loginUser(username, password);
      res.status(httpStatusCodes.OK).json(loggedInUser);
    } catch (err) {
      if (err instanceof ApiError) {
        return next(err)
      }
    }
  }

  // @desc    Get user profile
  // @route   GET /api/v1/auth/profile
  // @access  Private
  async userProfileController(req, res, next){
    const id = req.user.id;
    try {
      const profile = await authServices.userProfile(id);
      res.status(httpStatusCodes.OK).json(profile);
    } catch (err) {
      if (err instanceof ApiError) {
        return next(err)
      }
    }
  }

  // @desc    logout user
  // @route   POST /api/v1/auth/profile
  // @access  Private
  async userLogoutController(req, res, next){
    const token = req.token;
    try {
      const logout = await authServices.userLogout(token);
      res.status(httpStatusCodes.OK).json("Logout Successfully")
    } catch (err) {
      if (err instanceof ApiError) {
        return next(err)
      }
    }
  }

  // @desc    Update user profile
  // @route   PUT /api/v1/auth/profile
  // @access  Private
  async updateProfileController(req, res, next){
    const id = req.user.id;
    const {newName, newEmail, newUsername, newPassword} = req.body;
    try {
      const updated = await authServices.updateProfile(id, newName, newEmail, newUsername, newPassword);
      res.status(httpStatusCodes.OK).json(updated);
    } catch (err) {
      if (err instanceof ApiError) {
        return next(err)
      }
    }
  }

  // @desc    Delete user profile
  // @route   DELETE /api/v1/auth/profile
  // @access  Private
  async deleteProfileController(req, res, next){
    const id = req.user.id
    try {
      const delProfile = await authServices.deletePrrofile(id)
      res.status(httpStatusCodes.OK).json(`Profile ${delProfile} details removed`) 
    } catch (err) {
      if (err instanceof ApiError) {
        return next(err)
      }
    }
  }
}

export default AuthControllers;