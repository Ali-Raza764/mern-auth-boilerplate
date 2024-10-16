import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: function () {
        return this.authType === "credentials";
      },
    },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/50*50",
    },
    lastLogin: { type: Date, default: Date.now },
    isVerified: {
      type: Boolean,
      default: function () {
        return this.authType === "oauth";
      },
    },
    authType: {
      type: String,
      enum: ["credentials", "oauth"], // Only allow 'credentials' or 'oauth'
      required: true,
      default: "credentials", // Default is 'credentials'
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    verificationToken: { type: String, default: null },
    verificationTokenExpiry: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

const User = mongoose?.models?.User || mongoose?.model("User", userSchema);

export default User;
