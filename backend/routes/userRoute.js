const express = require('express');
const router = express.Router();
const { registerUser ,loginUser , changePassword ,updateUser , resetPassword , logoutUser , getUser , loginStatus , forgotPassword } = require('../controllers/userController');
const protect = require('../middleWare/authMiddleWare');

router.post('/register' , registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getUser' , protect , getUser) ;
router.get('/loggedIn' , loginStatus );
router.patch("/updateUser" , protect , updateUser);
router.patch('/changePassword' , protect ,changePassword);
router.post('/forgotPassword' ,forgotPassword);
router.put('/resetPassword/:resetToken' ,resetPassword);

module.exports = router;
