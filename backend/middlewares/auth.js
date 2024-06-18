import userModel from "../models/User.js";
import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  try {
    let token = req.headers.authorization
    let decoded = jwt.verify(token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ username: decoded.username })
      .select("-password");
    req.user = user;
    next();
  } catch (error) {
    res.send(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.send("Unauthorised access");
    } else {
      next();
    }
  } catch (error) {
    res.send(error);
  }
};
