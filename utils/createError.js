const createError =(code, message)=>{
//code

console.log("Step 1 create error")
const error = new Error(message)
error.statusCode = code; 
throw error; 

};

module.exports = createError; 