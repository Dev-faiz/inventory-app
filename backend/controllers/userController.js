const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Token = require('../models/tokenModel');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail')

const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , {expiresIn:"1d"});

}

// @desc    Register user
const registerUser = asyncHandler(async (req,res)=>{
    const {name,email,password , phone } = req.body;

    // VALIDATION 
    if(!name || !email || !password) throw new Error('Please fill in all required fields');
    if(password.length < 6 ) throw new Error('Please enter password more than 6 characters');
    if(name.length < 3 ) throw new Error('Please enter name more than 3 characters');
    
    // check if user email already exists
    const existingUser = await User.findOne({email});
    if(existingUser) throw new Error('An user with email already exists');
    
    
    // encrypt password before saving into database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);
   
    // creating a new user
    const newUser = await User.create({
        name,
        email,
        password ,
        phone ,
       
    });
     // Generate token 
     const token = generateToken(newUser._id);
     
    // send HTTP-Only cookie 
    res.cookie("token" , token , {
        path : "/",
        httpOnly : true,
        expires: new Date(Date.now() + 1000 * 60 * 60 ) ,
        sameSite : "none"  ,
        secure : true
    });

    if(newUser){
        const {_id , name , email , photo , phone , bio } = newUser
        res.status(200).json({
            _id ,
            name,
            email,
            photo,
            hashedPassword , 
            phone,
            bio , 
            token

        });
    }else{
        res.status(400);
        throw new Error('Failed to create user');
    }

})

// @desc    Login user
const loginUser = asyncHandler(async (req,res)=>{
    const {email, password } = req.body;

    // validate Request 
    if(!email ||!password) throw new Error('Please fill in all required fields');
    if(password.length < 6 ) throw new Error('Please enter password more than 6 characters');
    
    // check if user email already exists
    const user = await User.findOne({ email });
    if(!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch) throw new Error('Password is incorrect');

 //   Generate Token
 const token = generateToken(user._id);

 // Send HTTP-only cookie
 res.cookie("token", token, {
   path: "/",
   httpOnly: true,
   Expires: new Date(Date.now() + 1000 * 86400), // 1 day
//    sameSite : "none" ,
//    secure : true

 });

    
    if(user , isMatch){
        const {_id, name, email, photo, phone, bio } = user ;
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone , 
            bio , 
            token
            
        })
    }else{
        res.status(400);
        throw new Error('Failed to login');
    }

    
});

// @desc    Logout user
const logoutUser = asyncHandler(async (req,res)=>{
 //   Generate Token

 // Send HTTP-only cookie
 res.cookie("token", "", {
   path: "/",
   httpOnly: true,
   Expires: new Date(0), // 1 day


 });
    return res.status(200).json({messsage: "Successfully Logout"})
})
  
const getUser = asyncHandler( async(req , res) => {
    const user = await User.findById(req.user._id);
    if(user){
        const {_id, name, email, photo, phone, bio } = user ;
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone , 
            bio , 
        })
    }else{
        res.status(400);
        throw new Error('Failed to login');
    }

})

const loginStatus = asyncHandler(async (req, res)=>{
    const token = req.cookies.token;
    if(!token) res.json(false);

    const verified = jwt.verify(token , process.env.JWT_SECRET);
    if(verified){
        res.json(true);
    }else{
        res.json(false);
    }
     
})

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user){
        const { _id , name , email , photo , phone , bio } = user ; 
        user.email = email ;
        user.name = req.body.name || name ;
        user.phone = req.body.phone || phone ;
        user.bio = req.body.bio || bio ;
        user.photo = req.body.photo || photo ;

        const updatedUser = await user.save();
        res.status(200).json({
            name:updatedUser.name,
            email:updatedUser.email,
            photo:updatedUser.photo,
            phone:updatedUser.phone,
            bio:updatedUser.bio

        })

    }else{
        res.status(400);
        throw new Error('user not found');
    }
})

const changePassword = asyncHandler(async (req, res) =>{
    const user = await User.findById(req.user._id);
    const {oldPassword,password} = req.body;

    if(!user){
        res.status(400);
        throw new Error('user not found , please signup again');
    }
    
    // validate 
    if(!oldPassword || !password){
        res.status(400)
        throw new Error('Please fill in all required fields');
    }
    // check if old password is matches password in database
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    // save new password
    if(user && isMatch) {
        user.password = password;
        await user.save();
        res.status(200).send({ message: "password changed successfully"});

    }else{
        res.status(400);
        throw new Error("Old password is not matches password in database")
    }
})

const forgotPassword = asyncHandler( async (req , res)=>{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        res.status(400);
        throw new Error('user not found, please signup');
    }
    // console.log(user);
    // creates a reset token 
    // delete token if exists in DB
    let token = await Token.findOne({userId: user._id});

    if(token){
        await Token.deleteOne();
    }

    let resetToken = crypto.randomBytes(32).toString('hex')+user._id;
   
    // Hash token before saving to DB
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest("hex");
    // console.log(hashedToken)
    
    // save Token to DB

    await new Token({
        userId: user._id,
        token : hashedToken ,
        createdAt: Date.now() ,
        expiresAt : Date.now() + 30 * (60*1000)// 30 minutes 
    }).save();

    // construct resetURL
    const resetURL = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
    const message = `
        <h2>Hello ${user.name}</h2>
        <p>Please use the url below to reset your password</p>
        <p>This reset link is valid only for 30 minutes.</p>
        <a href=${resetURL} clickTracking=off>Reset Link ${resetURL }</a>

        <p>Regards ... </p>
        </p> Inventory App </p>
    ` ;
    const subject = "Password Reset Request" ;
    const send_to = user.email
    const sent_from = process.env.EMAIL_USER 

    try {
        await sendEmail(subject, message , send_to , sent_from );
        res.status(200).json({success : true , message : "reset Email is sent"})
    } catch (error) {
        res.status(500);
        console.log(error);
        throw new Error("Email is not sent please try again");
    }
});

const resetPassword = asyncHandler( async (req, res)=>{
    const {password} = req.body;    
    const {resetToken} = req.params;
    
    // hash token then compare to token in DB
    const hashedToken = crypto.createHash('sha256')
    .update(resetToken) 
    .digest('hex');

    // find token in DB
    const userToken = await Token.findOne({
        token : hashedToken , 
        expiresAt : {$gt : Date.now()}
    });

    if(!userToken) {
        res.status(400);
        throw new Error('Token is invalid');
    };

    // findUser 
    const user = await User.findById({_id: userToken.userId});
    user.password = password ;
    await user.save();
    res.status(200).json({
        message: 'Password reset successfully'
        
    })

});

module.exports = {
    registerUser , 
    loginStatus,
    loginUser ,  
    logoutUser ,
    updateUser ,
    getUser , 
    changePassword ,
    forgotPassword ,
    resetPassword
}
