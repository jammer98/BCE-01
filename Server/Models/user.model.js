import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required: true,
            lowercase:true,
            trim:true
        },
        fullname:{
            type:String,
            required: true,
            lowercase:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            lowercase:true,
            trim:true
        },
        githubUsername:{
            trype:String,
            required:true,
            trim:true
        }
    },
    {timestamps:true}
)

export const User = mongoose.model("User",userSchema);