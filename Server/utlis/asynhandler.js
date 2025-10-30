const asyncHandler = (functionToBeWrapped) => async(req,res,next) =>{
    return Promise.resolve(functionToBeWrapped(req,res,next))
           .catch((error) => next(error))
}

export {asyncHandler}