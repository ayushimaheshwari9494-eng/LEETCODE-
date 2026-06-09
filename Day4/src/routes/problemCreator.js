const express = require('express')
const problemRouter =express.Router();
const adminMiddleware=require('../middleware/adminMiddleware')
//create
problemRouter.post("/create",adminMiddleware,CreateProblem) //prblm create bs admin hi krskta



problemRouter.get("/:id",getProblemById)




problemRouter.get("/",getAllProblem)



problemRouter.patch("/:id",UpdateProblem)



problemRouter.delete("/:id",DeleteProblem)


problemRouter.get("/user",solvedAllProblembyUser)