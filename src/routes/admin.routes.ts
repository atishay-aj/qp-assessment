import { Router } from "express";
import {
  addGrocery,
  getGroceries,
  updateGrocery,
  deleteGrocery,
} from "../controllers/admin.controller";
import { authenticate, authorizeAdmin } from "../middlewares/auth.middleware";

const router = Router();
router.use(authenticate, authorizeAdmin);
router.post("/grocery", addGrocery);
router.get("/grocery", getGroceries);
router.patch("/grocery/:id", updateGrocery);
router.delete("/grocery/:id", deleteGrocery);

export default router;
