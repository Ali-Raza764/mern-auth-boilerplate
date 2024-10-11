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

const userRouter = Router();

userRouter.get("/auth/check-auth", verifyToken, checkAuth);

userRouter.post("/auth/sign-up", signUp);

userRouter.post("/auth/google-oauth", oauthSignIn)

userRouter.post("/auth/sign-in", signIn);

userRouter.post("/auth/verify-email", verifyEmail);

userRouter.post("/auth/logout", logout);

export default userRouter;
