import { Router } from "express";
import { getUserOrders, placeOrder } from "../controllers/order.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();
router.use(authenticate);
router.get("/getorders", getUserOrders);
router.post("/placeorder", placeOrder);

export default router;
