import mongoose from "mongoose";
const connectDb = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(
      (process.env.MONGO_URI as string) || "mongodb://localhost:27017/store",
    );
    console.log("db connection is 🚀🚀");
  } catch (error) {
    console.error("mongo db connection failed", error);
    process.exit(1);
  }
};
export default connectDb;
