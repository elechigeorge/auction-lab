import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../model/user.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.headers["token"];
  let decoded;

  //Try to validate the token and get data
  try {
    // check if the token is there
    if (!token)
      response.status(400).json("Please login/register an account...");

    // GET DECODED VALUES
    decoded = jwt.verify(token, process.env.JWT);

    // GET AUTHORIZED USER FULL DETAILS
    const user = await User.findOne({ _id: decoded.id });

    // SET LOGGED IN USER DETAILS TO REQUEST OBJECT
    req.user = user;

    // move on to the next middleware
    next();
  } catch (error) {
    //If token is not valid, respond with 401 (unauthorized)
    console.log(error);
    res.status(401).json("Invalid Request...");
    return;
  }
});

export { authenticate };
