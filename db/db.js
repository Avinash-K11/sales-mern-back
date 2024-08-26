import mongoose from "mongoose";

const url= process.env.dbUrl;

const connectToDb = async () =>

    await mongoose.connect(url);

export default connectToDb;