import { Router } from "express";
import {
  checkAuth,
  logout,
  oauthSignIn,
  signIn,
  signUp,
  verifyEmail,
} from "../controllers/auth.controller.mjs";
import { verifyToken } from "../middleware/verfifyToken.mjs";
import { getAllUsers } from "../controllers/admin.controller.mjs";
import { verifyRole } from "../middleware/verifyRole.mjs";

const userRouter = Router();

userRouter.get("/auth/check-auth", verifyToken, checkAuth);

userRouter.post("/auth/sign-up", signUp);

userRouter.post("/auth/google-oauth", oauthSignIn);

userRouter.post("/auth/sign-in", signIn);

userRouter.post("/auth/verify-email", verifyEmail);

userRouter.get("/auth/users", verifyToken, verifyRole, getAllUsers);

userRouter.post("/auth/logout", logout);

export default userRouter;
