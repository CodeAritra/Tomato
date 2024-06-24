import express from "express";
import { isLoggedIn } from "../middlewares/auth.js";
import { createOrder } from "../controllers/orderController.js";

const router = express.Router()

router.post("/create-order",isLoggedIn,createOrder)

export default router