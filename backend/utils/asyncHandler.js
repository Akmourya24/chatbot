const asyncHandler =(requestHandler)=>{
    return(req, res, next)=>{
        Promise.resolve(requestHandler(req,res,next).
    catch(Error =>{
        Error
    }))
    }
}
export default asyncHandler