import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/50*50",
    },
    lastLogin: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    verificationTokenExpiry: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const User = mongoose?.models?.User || mongoose?.model("User", userSchema);

export default User;
