import {asyncHandler} from "../utlis/asynhandler.js"
import { ApiError } from "../utlis/apiErrors.js"
import { ApiResponse } from "../utlis/ApiResponse.js"
import { User } from "../Models/user.model.js"
import axios from "axios"

const register = asyncHandler( async (req,res) =>{
   const { username , fullname , email , githubUsername } = req.body;

   if( !username || !fullname || !email || !githubUsername){
    throw new ApiError(400,"All fields are required")
   }

    // check for the github username is valid 
    
    const githubId = await axios.get(`https://api.github.com/users/${githubUsername}`)
    if(githubId.status !== 200){
        throw new ApiError(400,"Github username is not valid")
    }

    // save the data in the DB
    const user = await new User({username , fullname , email , githubUsername}).save();

    const response = new ApiResponse(201,"Saved the user successfully",user)
    res.status(201).json(response)
})

const getAllUser = asyncHandler(async(req,res)=>{
    const users = await User.find().sort({createdAt:-1})
    const response = new ApiResponse(200,"Users fetched Successfully",users)
    res.status(200).json(response)
})


export {register,getAllUser}