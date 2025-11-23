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
  console.log('\n--- getUserById Controller ---');
  console.log('Request params:', req.params);
  
  const { id } = req.params;
  console.log('Extracted ID:', id);
  
  if (!id) {
    console.log('Error: No ID provided');
    throw new ApiError(400, "User ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log('Error: Invalid MongoDB ID format');
    throw new ApiError(400, "Invalid MongoDB ID format");
  }

  const user = await User.findById(id);
  console.log('Found user:', user ? 'Yes' : 'No');

  if (!user) {
    console.log('Error: User not found');
    throw new ApiError(404, "User not found");
  }

  console.log('Sending response...');
  const response = new ApiResponse(200, "User fetched successfully", user);
  res.status(200).json(response);
});

const getAllUser = asyncHandler(async(req,res)=>{
    // Force immediate console output
    process.stdout.write("\n===========================================\n");
    process.stdout.write("🔍 GET /api/v1/users request received\n");
    process.stdout.write(`⏰ ${new Date().toISOString()}\n`);
    
    try {
        const users = await User.find().sort({createdAt:-1});
        
        // Immediate logging of results
        process.stdout.write("✅ Database query successful\n");
        process.stdout.write(`📊 Found ${users.length} users\n`);
        
        // Log user details
        const userDetails = users.map(user => ({
            id: user._id,
            username: user.username
        }));
        process.stdout.write(`📝 Users: ${JSON.stringify(userDetails, null, 2)}\n`);

        const response = new ApiResponse(200, "Users fetched Successfully", users);
        process.stdout.write("📤 Sending response to client\n");
        res.status(200).json(response);
        
        process.stdout.write("===========================================\n\n");
    } catch (error) {
        process.stdout.write(`❌ Error in getAllUser: ${error.message}\n`);
        throw error;
    }
})


// const getUserById = asyncHandler(async (req, res) => {
//   const { id } = req.params;
  
//   if (!id) {
//     throw new ApiError(400, "User ID is required");
//   }

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     throw new ApiError(400, "Invalid MongoDB ID format");
//   }

//   const user = await User.findById(id);

//   if (!user) {
//     throw new ApiError(404, "User not found");
//   }

//   const response = new ApiResponse(200, "User fetched successfully", user);
//   res.status(200).json(response);
// })


// const updateUser = asyncHandler(async (req,res) =>{
//   const id = req.params.id;
//   console.log(`Updating user with ID: ${id}`);

//   const { username, fullname, email, githubUsername } = req.body;

//   const existingUser = await User.findById(id);

//   if (!existingUser) {
//     throw new ApiError(404, "user not found");
//   }

//   existingUser.username = username || existingUser.username;
//   existingUser.fullname = fullname || existingUser.fullname;
//   existingUser.email = email || existingUser.email;
//   existingUser.githubUsername = githubUsername || existingUser.githubUsername;

//   const updatedUser = await existingUser.save();

//   const response = new ApiResponse(200, "User updated Successfully", updatedUser);
//   res.status(200).json(response);
// })


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

export {register,getAllUser,getUserById, UpdateUser}