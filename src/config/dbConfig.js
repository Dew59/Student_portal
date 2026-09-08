import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const dbUri = process.env.DB_URI.replace("<db_password>", process.env.DB_PASSWORD);

        await mongoose.connect(dbUri);
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection error", error);
        process.exit(1);
    }
}

export default connectDb;