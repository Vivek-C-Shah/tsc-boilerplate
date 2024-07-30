import mongoose from "mongoose";
import { catchAsyncError } from "../middlewares/catchAsyncError";

const connectDB = catchAsyncError(async () => {
	const conn = await mongoose.connect(process.env.MONGO_URI as string);
	console.log(`MongoDB Connected: ${conn.connection.host}`);
});
