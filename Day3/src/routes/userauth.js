const express = require('express');
const router = express.Router();
const {register,login,logout,adminRegister}=require('../controllers/userAuth');
const userMiddleware = require('../middleware/userMiddleware');
const adminMiddleware=require('../middleware/adminMiddleware');
//Register
router.post('/register',register);
router.post('/login',login);
router.post('/logout',userMiddleware,logout);
router.post('/admin/register',adminMiddleware,adminRegister);
// router.get('/getProfile',getProfile);


module.exports=router;