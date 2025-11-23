const asyncHandler = (functionToBeWrapped) => async (req, res, next) => {
    try {
        console.log(`[AsyncHandler] Executing ${functionToBeWrapped.name}`);
        await Promise.resolve(functionToBeWrapped(req, res, next));
        console.log(`[AsyncHandler] Successfully completed ${functionToBeWrapped.name}`);
    } catch (error) {
        console.error(`[AsyncHandler] Error in ${functionToBeWrapped.name}:`, error);
        next(error);
    }
}

export { asyncHandler }