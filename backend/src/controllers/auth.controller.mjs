import bcrypt from "bcryptjs";
const { hash, compare } = bcrypt;
import User from "../lib/schemas/user.model.mjs";
import { generateTokenAndSetCookie } from "../lib/generateTokenAndSetCookie.mjs";
import {
  sendVerficationEmail,
  sendWelcomeEmail,
} from "../lib/email/sendEmails.mjs";

export const signUp = async (req, res) => {
  const {
    body: { name, email, password },
  } = req;

  if (!email || !password)
    return res.status(401).send({
      message: "Incomplete Credentails",
    });

  const findUser = await User.findOne({ email });

  if (findUser) {
    return res.status(400).send({
      message: "user already exists",
    });
  }

  const hashedPassword = await hash(password, 8);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    name,
  });

  generateTokenAndSetCookie(res, newUser._id);
  await sendVerficationEmail(newUser._id);

  res.status(200).send({
    message: "User Created Check Your inbox",
  });
};

export const signIn = async (req, res) => {
  const {
    body: { email, password },
  } = req;

  if (!email || !password)
    return res.status(401).send({
      message: "Incomplete Credentails",
    });

  // Check password and email
  const findUser = await User.findOne({ email });
  if (!findUser) {
    return res.status(401).send({
      message: "User not found",
    });
  }

  // First make sure email is verified
  if (!findUser.isVerified) {
    return res.status(400).send({
      message: "Please verify your email",
    });
  }

  const isPasswordCorrect = compare(password, findUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).send({
      message: "Incorect password",
    });
  }

  generateTokenAndSetCookie(res, findUser._id);
  findUser.lastLogin = new Date();

  res.status(200).send({
    success: true,
    message: "User logged in successfully",
    user: {
      ...findUser._doc,
      password: undefined,
    },
  });
};

export const verifyEmail = async (req, res) => {
  const { verificationToken } = req.body;
  try {
    const user = await User.findOne({
      verificationToken,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    await sendWelcomeEmail(user._id);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verifyEmail ", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("Error in checkAuth ", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
	res.clearCookie("token");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};

