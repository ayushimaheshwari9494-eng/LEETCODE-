const validator = require('validator');
const validate=(data)=>{
   const mandatoryFields=['firstName','emailId','password'];
   const isAllowed=mandatoryFields.every((k)=>Object.keys(data).includes(k));
    if(!isAllowed) throw new Error('Missing mandatory fields');
    if(!validator.isEmail(data.emailId)) throw new Error('Invalid email id');
    if(!validator.isStrongPassword(data.password)) throw new Error('Password should be strong');
}
module.exports=validate;