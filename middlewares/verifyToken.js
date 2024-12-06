import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import ApiError from "../shared/apiError.js";
import httpStatusCodes from "../shared/httpstatuscodes.js";
import pool from "../config/db.config.js";

dotenv.config()

const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(" ")[1];

  const loggedOutToken = await pool.query(
    "SELECT * FROM logout_tokens WHERE token = $1",
    [token]
  );
  if (loggedOutToken.rows.length > 0) {
    return next(new ApiError("Access denied, Expired token, Please login", httpStatusCodes.FORBIDDEN));
  }

  if(!token){
    return next(new ApiError("Not autherized, No token, Please login", httpStatusCodes.FORBIDDEN))
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    if(err.name === "TokenExpiredError"){
      return next(new ApiError("Token has expired, please login again", httpStatusCodes.BAD_REQUSEST));
    } else {
      return next(new ApiError("Invalid token, please login", httpStatusCodes.BAD_REQUSEST));
    }
  }

  
}


export default verifyToken;