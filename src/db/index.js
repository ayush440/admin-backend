import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    try {
        // Connection string should reference the MONGO_URI environment variable
        const uri = `${process.env.MONGO_URI}/${DB_NAME}`;
        console.log(`Connected to the database: ${uri}`);

        // Connect to the database using the URI from .env
        await mongoose.connect(uri);
    } catch (error) {
        console.error("Error connecting to the database: ", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
