import User from "../schemas/user.model.mjs";
import sendEmail from "./resend.mjs";
import {
  generateEmailVerificationTemplate,
  generateWelcomeEmailTemplate,
} from "./templates.mjs";

export const sendVerficationEmail = async (userId) => {
  const user = await User.findById(userId);
  // Create verification tokens
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  const verificationTokenExpiry = new Date().getTime() + 1000 * 60 * 60 * 24;

  user.verificationToken = verificationToken;
  user.verificationTokenExpiry = verificationTokenExpiry;
  await user.save();

  // Send verification email
  const emailContent = generateEmailVerificationTemplate(
    user.name,
    "Authentication service",
    verificationToken,
    "Authentication service",
    new Date()
  );

  const subject = "Verify your email";

  await sendEmail(user.email, emailContent, subject);
};

export const sendWelcomeEmail = async (userId) => {
  const user = await User.findById(userId);
  const emailContent = generateWelcomeEmailTemplate(
    user.name,
    "Ali Raza Khalid",
    "Authentication service",
    "alikillerno@gmail.com"
  );
  const subject = "Welcome to Authentication service";
  await sendEmail(user.email, emailContent, subject);
};
