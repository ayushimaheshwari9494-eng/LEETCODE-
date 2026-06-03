const express = require('express');
const router = express.Router();
const {register,login,logout}=require('../controllers/userAuth');
const userMiddleware = require('../middleware/userMiddleware');

//Register
router.post('/register',register);
router.post('/login',login);
router.post('/logout',userMiddleware,logout);
// router.get('/getProfile',getProfile);


module.exports=router;