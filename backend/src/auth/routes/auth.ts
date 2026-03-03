import { Router } from "express";
import { login, meController, signUp } from "../controller/auth";

const router = Router();

router.get("/me", meController);

router.post("/login", login);

router.post("/signup", signUp);

export default router;
