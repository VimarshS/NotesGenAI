import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;
        if (!mongoUri) {
            throw new Error("MONGODB_URI or MONGODB_URL environment variable is not set");
        }
        await mongoose.connect(mongoUri)
        console.log("DB Connected")
    } catch (error) {
        console.error("DB Error:", error.message)
    }
}
export default connectDb