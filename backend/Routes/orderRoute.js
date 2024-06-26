import express from "express";
import { isAdmin, isLoggedIn } from "../middlewares/auth.js";
import {
  braintreePayment,
  braintreeToken,
  createOrder,
  getallorder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create-order", isLoggedIn, createOrder);
router.get("/admin", isLoggedIn,isAdmin, getallorder);
router.get("/braintree/token", braintreeToken);
router.post("/braintree/payment", isLoggedIn, braintreePayment);

export default router;
