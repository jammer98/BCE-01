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

    console.log("this route is hitting ");
    const users = await User.find().sort({createdAt:-1})
    const response = new ApiResponse(200,"Users fetched Successfully",users)
    
    res.status(200).json(response)
})


const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log(`Fetching user with ID: ${id}`);

  const user =  await User.findById(id);

  if(!user){
    throw new ApiError(404,"user not found");
  }

  const response = new ApiResponse(200,"User fetched Successfully",user);
  res.status(200).json(response);
})

const updateUser = asyncHandler(async (req,res) =>{
  const id = req.params.id;
  console.log(`Updating user with ID: ${id}`);

  const { username, fullname, email, githubUsername } = req.body;

  const existingUser = await User.findById(id);

  if (!existingUser) {
    throw new ApiError(404, "user not found");
  }

  existingUser.username = username || existingUser.username;
  existingUser.fullname = fullname || existingUser.fullname;
  existingUser.email = email || existingUser.email;
  existingUser.githubUsername = githubUsername || existingUser.githubUsername;

  const updatedUser = await existingUser.save();

  const response = new ApiResponse(200, "User updated Successfully", updatedUser);
  res.status(200).json(response);
})

export {register,getAllUser,getUserById,updateUser}