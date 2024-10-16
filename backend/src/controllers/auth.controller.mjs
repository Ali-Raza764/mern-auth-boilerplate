import bcrypt from "bcryptjs";
const { hash, compare } = bcrypt;
import User from "../lib/schemas/user.model.mjs";
import { generateTokenAndSetCookie } from "../lib/generateTokenAndSetCookie.mjs";
import {
  sendVerficationEmail,
  sendWelcomeEmail,
} from "../lib/email/sendEmails.mjs";
import { OAuth2Client } from "google-auth-library";
import "dotenv";

const client = new OAuth2Client({
  //! client secret is not required for simple authentication it is only required for  server to server communication the verify token ensures that the token was issued by google for this application
  // clientSecret: process.env.AUTH_GOOGLE_SECRET,
});

export const oauthSignIn = async (req, res) => {
  const { credential, client_id } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: client_id,
    });
    const payload = ticket.getPayload();
    const { name, email, picture } = payload;

    const user = await User.findOne({ email });
    if (user) {
      generateTokenAndSetCookie(res, user._id, user.role);
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
          ...user._doc,
          password: undefined,
        },
      });
    }
    const isAdmin = email === process.env.NODE_ADMIN_EMAIL;
    const newUser = await User.create({
      name,
      email,
      avatar: picture,
      authType: "oauth",
      role: isAdmin ? "admin" : "user",
    });
    generateTokenAndSetCookie(res, newUser._id, newUser.role);
    await sendWelcomeEmail(newUser._id);

    res.status(200).json({
      success: true,
      message: "User logged",
      ...user._doc,
    });
  } catch (err) {
    res.status(400).json({ err });
  }
};

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

  const isAdmin = email === process.env.NODE_ADMIN_EMAIL;

  const newUser = await User.create({
    email,
    password: hashedPassword,
    name,
    role: isAdmin ? "admin" : "user",
  });

  generateTokenAndSetCookie(res, newUser._id, newUser.role);
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

  if (findUser.authType !== "credentials") {
    return res.status(400).send({
      message: "This email is not registered with credentials",
      user: {
        ...findUser._doc,
        password: undefined,
      },
    });
  }

  const isPasswordCorrect = compare(password, findUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).send({
      message: "Incorect password",
    });
  }

  generateTokenAndSetCookie(res, findUser._id, findUser.role);
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
