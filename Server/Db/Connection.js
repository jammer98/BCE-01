import mongoose from "mongoose";
import DBName from '../Constants/Database.js'

const connectDB = async() =>{
    try{
        await mongoose.connect(`${process.env.DATABASE_URI}/${DBName}`);
        console.log("Database connection SUCCSESSFUL!!!!");
    }
    catch(error){
        console.log("Database connection FAILED!!",error);
        process.exit(1);
    }
}

export default connectDB;