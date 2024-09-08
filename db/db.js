import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const url = process.env.dbUrl;

const connectToDb = async () =>

    await mongoose.connect(url);

export default connectToDb;