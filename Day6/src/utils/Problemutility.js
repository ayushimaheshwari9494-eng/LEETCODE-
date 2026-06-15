
const axios = require('axios');
const getLanguageById =(lang)=>{
    const language={
        "c++":54,
        "java":62,
        "javascript":63
    }
    return language[lang.toLowerCase()];
}


const submitBatch=async (submissions)=>{
  const options = {
  method: 'POST',
 url: 'http://localhost:2358/submissions/batch',
  params: {
    base64_encoded: 'false'
  },
  headers: {
    
    'Content-Type': 'application/json'
  },
  data:{
    submissions
  }
  }



async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}

return await fetchData();
}
 const waiting = (timer) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timer);
  });
};
const submitToken = async(resultTokens)=>{
 const options = {
  method: 'GET',
 url: 'http://localhost:2358/submissions/batch',
  params: {
    tokens: resultTokens.join(","),
    base64_encoded: 'false',
    fields: '*'
  },
  headers: {
   
    'Content-Type': 'application/json'
  }
};

async function fetchData() {
	try {
		const response = await axios.request(options);
		return response.data;
	} catch (error) {
		console.error(error);
	}
}
while(true){
const result=await fetchData();
if (!result || !result.submissions) {
    throw new Error("Judge0 did not return submissions");
}
const isResultObtained=result.submissions.every((r)=>r.status_id>2);
if(isResultObtained) return result.submissions;
 
await waiting(1000);


}
}
module.exports={getLanguageById,submitBatch,submitToken};