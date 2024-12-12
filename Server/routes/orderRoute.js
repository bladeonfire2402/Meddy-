import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js";

const orderRouter = express.Router();

// Route for placing an order (user authentication required)
orderRouter.post("/place", authMiddleware, placeOrder);

// Route for fetching user-specific orders (user authentication required)
orderRouter.post("/userorders", authMiddleware, userOrders);

// Route for listing all orders (user authentication required)
orderRouter.get("/list", listOrders);


// Route for updating the status of an order (user authentication required)
orderRouter.put("/status", updateStatus);


export default orderRouter;
