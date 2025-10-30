import {asyncHandler} from "../utlis/asynhandler.js"
import { ApiError } from "../utlis/apiErrors.js"
import { ApiResponse } from "../utlis/ApiResponse.js"

const register = asyncHandler( async (req,res) =>{
    res.status(200).json({
        message:"ok"
    })
})


export {register}