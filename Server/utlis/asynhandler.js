const asyncHandler = (functionToBeWrapped) => async(req,res,next) =>{
    return Promise.resolve(functionToBeWrapped(req,res,next))
           .catch((error) => next(error))
}

export {asyncHandler}

// this is the higher order function which accepts function as the parameter and returns a function also 
