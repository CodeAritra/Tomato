import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongoose connected ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in mongodb ${error}`);
    }
}

export default connectDB

// "mongodb+srv://aritradhank21:GGs13z5oH3FJ3nep@cluster0.aokde86.mongodb.net/