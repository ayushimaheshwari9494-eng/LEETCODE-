const User = require('../models/user');
const validate = require('../utils/validator');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const register=async(req,res)=>{
    try{
        //validate the data
        validate(req.body);
        const {firstName,emailId,password}=req.body;

       req.body.password= await bcrypt.hash(password,10) 

        const user= await User.create(req.body);
        const token=jwt.sign({id:user._id , emailId:user.emailId},process.env.JWT_KEY,{expiresIn:60*60});

         res.cookie('token',token,{maxAge:60*60*1000});
         res.status(201).send("user registered successfully");


       
       
    }
    catch (err){
        res.status(400).send("error: "+err);
    }
}


const login=async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        if(!emailId)
            throw new Error('Invalid credentials');
        if(!password)
            throw new Error('Invalid credentials');
        const user=await User.findOne({emailId});
        const ans=bcrypt.compare(password,user.password);
        if(!ans)
            throw new Error('Invalid credentials');


        const token=jwt.sign({id:user._id , emailId:user.emailId},process.env.JWT_KEY,{expiresIn:60*60});
        res.cookie('token',token,{maxAge:60*60*1000});
        res.status(200).send("user logged in successfully");
    }
    catch(err){
        res.status(401).send("error: "+err);
    }
}