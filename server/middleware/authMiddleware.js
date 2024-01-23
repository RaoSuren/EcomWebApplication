import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

const JWT_SECRET = "HTGahgyg@56ghgtf*%$";
export const requireSignIn = (req, res, next) => {
  try {
    console.log("Hit");
    const decode = JWT.verify(req.headers.authorization, JWT_SECRET);
    req.user = decode;
    next();
  } catch (err) {
    console.log(err);
  }
};

export const adminMiddleware = (req, res, next) => {
  try {
    const user = userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.staus(401).send({
        success: false,
        messsage: "Anauthorized for this action",
      });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    return res.staus(401).send({
      success: false,
      error,
      messsage: "Anauthorized for this action",
    });
  }
};
