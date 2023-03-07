const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');
const contactUs = asyncHandler(async (req , res)=>{

    const {subject , message } = req.body ; 
    const user = await User.findById(req.user.id);
    if(!user) {
        res.status(400);
        throw new Error('User not found');
    }
    // validation 
    if(!subject || !message) {
        res.status(400);
        throw new Error('Please provide subject and message');
    }
    const send_to = process.env.EMAIL_USER ;
    const sent_from =   process.env.EMAIL_USER ;
    const reply_to = user.email ;  
    // send email
    try {
        await sendEmail( subject, message , send_to , sent_from , reply_to);
        res.status(200).json({
            success: true,
            message: 'Query Submitted successfully' ,
        });
        
    } catch (error) {
        res.status(500)
        throw new Error("email is not send , please try again");
    }
});

module.exports = contactUs;