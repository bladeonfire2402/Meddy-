import mongoose from "mongoose";

 const connectDB = async () => {
    try {
      const conn = await mongoose.connect('mongodb+srv://liempham24022004:meomeo@meddy.dnwm4.mongodb.net/meddy',);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error);
    }
  };

  export default connectDB;

  