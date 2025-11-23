import {asyncHandler} from "../utlis/asynhandler.js"
import { ApiError } from "../utlis/apiErrors.js"
import { ApiResponse } from "../utlis/ApiResponse.js"
import { User } from "../Models/user.model.js"
import axios from "axios"
import mongoose from "mongoose"

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

const getUserById = asyncHandler(async (req, res) => {
  
  const { id } = req.params;
  
  if (!id) {
   
    throw new ApiError(400, "User ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid MongoDB ID format");
  }

  const user = await User.findById(id);

  if (!user) {
    
    throw new ApiError(404, "User not found");
  }

  const response = new ApiResponse(200, "User fetched successfully", user);
  res.status(200).json(response);
});

const getAllUser = asyncHandler(async(req,res)=>{
   
    try {
        const users = await User.find().sort({createdAt:-1});
        
       
        // Log user details
        const userDetails = users.map(user => ({
            id: user._id,
            username: user.username
        }));
      

        const response = new ApiResponse(200, "Users fetched Successfully", users);
        res.status(200).json(response);
        
        process.stdout.write("===========================================\n\n");
    } catch (error) {
        throw error;
    }
})

const UpdateUser = asyncHandler(async(req,res) =>{
    const id = req.params.id;

    const {username , fullname ,email, githubUsername} =  req.body;

    const existingUser = await User.findById(id);

    if(!existingUser){
      throw new ApiError(404,"user not found");
    }

    existingUser.username = username || existingUser.username;
    existingUser.fullname = fullname || existingUser.fullname;
    existingUser.email = email || existingUser.email;
    existingUser.githubUsername = githubUsername || existingUser.githubUsername;

    const updateUser = await existingUser.save();

    const response = new ApiResponse(200, "User update successfully", updateUser);
    res.status(200).json(response);

  })

  const DeleteUser = asyncHandler(async(req,res) =>{
    const id = req.params.id;

    const exisitingUser = await User.findByIdAndDelete(id);
    if(!exisitingUser){
      throw new ApiError(404,"user not found");
    } 

    const response = new ApiResponse(204,"User deleted successfully",null);
    res.status(204).json(response);

  })

export {register,getAllUser,getUserById, UpdateUser, DeleteUser}