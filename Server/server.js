import cors from "cors";
import "dotenv/config";
import MedicineRouter from "./routes/medicineRoute.js";
import express from "express";
import path from "path"; // Import path module
import connectDB from "./db.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";


const app = express();
const port = 5010;

// Middleware to serve static files from the uploadMedicines directory
app.use('/uploadMedicines', express.static(path.join(path.resolve(), 'uploadMedicines')));

// Connect to the database
connectDB();

// Middleware to enable CORS
app.use(cors());


// Middleware to parse JSON
app.use(express.json());

// Use the MedicineRouter for the medicines endpoint
app.use("/api/medicines", MedicineRouter);
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter)


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
