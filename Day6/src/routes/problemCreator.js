const express = require('express')
const problemRouter =express.Router();
const adminMiddleware=require('../middleware/adminMiddleware')
const {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem}=require('../controllers/userProblem')
const userMiddleware=require('../middleware/userMiddleware')
//create
problemRouter.post("/create",adminMiddleware,createProblem) //prblm create bs admin hi krskta



 problemRouter.get("/problemById/:id",userMiddleware,getProblemById)




 problemRouter.get("/getAllProblem",userMiddleware,getAllProblem)



 problemRouter.put("/update/:id",adminMiddleware,updateProblem)



 problemRouter.delete("/delete/:id",adminMiddleware,deleteProblem)


// problemRouter.get("/problemSolvedByUser",userMiddleware,solvedAllProblembyUser)


module.exports=problemRouter