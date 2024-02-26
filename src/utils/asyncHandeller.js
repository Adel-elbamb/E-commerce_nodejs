
//TRY CATCH
export const asyncHandler = (fn) => {
    return (req, res, next) => { //error is optional 
        fn(req, res, next).catch(error => {
            return next(new Error (error , {cause : 500 }))
            // return res.status(500).json({ message: "Catch error", error: error.message, stack: error.stack }) // stack is the postion of error
        })
    }
}

export const globalError = (error, req, res, next) => { 
     if(req.validationError) {
        return res.json({message: error.message , validationError : req.validationError.details})
     }
    if(process.env.MODD == "dev" ) {

    return res.status(error.cause || 500).json({ message: error.message, stack: error.stack })
    }
    return res.json({ message: error.message })

}