const express= require('express');
//const userMiddleware = require('../middleware/userMiddleware');
const submitRouter = express.Router();
const userMiddleware=require("../middleware/userMiddleware")
const {submitCode,runCode}=require("../controllers/userSubmission")
//const {runCodeLimiter,submitCodeLimiter} = require("../middleware/submitLimiter");
const submitLimiter = require("../middleware/submitLimiter");
const runLimiter = require("../middleware/runLimiter");
submitRouter.post("/submit/:id",userMiddleware,submitLimiter,submitCode)
submitRouter.post("/run/:id",userMiddleware,runLimiter,runCode)
module.exports=submitRouter