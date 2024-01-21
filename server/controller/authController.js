import JWT from "jsonwebtoken";
import { comparePassword, hashedPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";

const JWT_SECRET = "HTGahgyg@56ghgtf*%$";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Password is required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is required" });
    }
    if (!address) {
      return res.send({ error: "Address is required" });
    }

    // Find Existing User

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(200).send({
        success: true,
        message: "Already registered please login",
      });
    }

    const hashedpassword = await hashedPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedpassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "New User created successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registring",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Wrong email or password",
      });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status("404").send({
        success: false,
        message: "Email is not registered",
      });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Logging in",
      err,
    });
  }
};
