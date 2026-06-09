const express = require('express')
const problemRouter =express.Router();
//create
problemRouter.post("/create",problemCreate)



problemRouter.get("/:id",problemFetch)




problemRouter.get("/",getAllProblem)



problemRouter.patch("/:id",problemUpdate)



problemRouter.delete("/:id",problemDelete)


problemRouter.get("/user",solvedProblem)