const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async (req , res , next)=>{
    
    try{
        
        const token = req.cookies.token ;
        if(!token){
            res.status(401);
            throw new Error("Not authorized token please login"); 
        }

        // verify token 
        const verified = jwt.verify(token , process.env.JWT_SECRET);
        if(!verified){
            res.status(401);
            throw new Error("Not authorized please login"); 
        }

        //get User from token 
        const user = await User.findById(verified.id).select("-password");
        if(!user) {
            throw new Error("User not found");
        }

        req.user = user;
        next();



    }catch(err){
        res.status(401);
        throw new Error(err.message);

    }
})

module.exports = protect