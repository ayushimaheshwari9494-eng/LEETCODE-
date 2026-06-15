 const Problem = require("../models/problem")
 const Submission=require("../models/submission")
 const getLanguageById=require("../utils/Problemutility")
 const submitCode = async(req,res)=>{
   try{
     const userId=req.result._id
     const problemId=req.params.id
     const {code,language} = req.body
     if(!userId || !code || !problemId || !language)
        return res.status(400).send("Some field Missing")
//fetch problem from db
 const problem=await Problem.findById(problemId)


 //jo cod aya phle db m dalege thenn judge0 ko denge kyuki in case judge0 crash hua ya kch b issue hua to hump user ka code to saved hoga
 const submittedResult = await Submission.create({
    userId,
    problemId,
    code,
    language,
    
    status:'pending',
    testCasesTotal:problem.hiddenTestCases.length
 })

 //judge0ko dena hai

 const languageId = getLanguageById(language)

 const submissions=Problem.hiddenTestCases.map((testcase)=>({
    source_code: code,
    language_id: languageId,
    stdin: testcase.input,
    expected_output: testecase.output

 }))

 const submitResult = await submitBatch(submissions)
 const resultToken = submitResult.map((value)=>value.token)
 const testResult = await submitToken(resultToken)

 //update submitted res
 let testCasesPassed=0
 let runtime=0
 let memory=0 //ye sb ab judge0 code chlak dera hai kitna kya laga wo sab db m dalre hai hum 
 let status='accepted'
 let errmsg=""
 for(const test of testResult){
    if(test.status_id==3){
        testCasesPassed++;
        runtime=runtime+parseFloat(test.time) //ye judge0 dera hai test.time 
        memory=Math.max(memory,test.memory)
    }
    else{
       if(test.status_id==4){
        status = 'error'
        errmsg=test.stderr // from judge0
       }
       else{
        status='wrong'
        errmsg=test.stderr
       }
    }
 }
//store in db
submittedResult.status=status
submittedResult.testCasesPassed=testCasesPassed
submittedResult.errorMessage=errmsg
submittedResult.runtime=runtime
submittedResult.memory=memory
await submittedResult.save();
res.status(201).send("submitted")
   }
   catch(err){
res.status(500).send("error: "+err)
   }
 }
 module.exports=submitCode