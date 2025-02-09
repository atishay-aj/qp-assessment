import { Router } from "express";
import { getGroceries, loginUser } from "../controllers/user.controller";

const router = Router();
router.post("/login", loginUser);
router.get("/groceries", getGroceries);

export default router;
