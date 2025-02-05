const createError = require("../utils/createError")
exports.register =(req, res, next)=>{
//code
try { 
    //code 
    // Step 1 req.body 
    const {email, firstname, lastname, password, confirmPassword} = req.body 
    // Step 2 validate
    if(!email){  
        return createError(400,"Email is require"); 
    }
    if(!firstname){
        return createError(400,"Firstname is require"); 
    }
    // Step 3 Check already 
    // Step 4 Encrypt bcrypt
    // Step 5 Insert tp DB
    // Step 6 Response 
    res.json({message: "hello register"})
} catch (error) {
    next(error); 
}};
exports.login = (req, res, next)=>{
    //code
    try {
        //console.log(sssksksk)
        res.json({message: "Hello Login"})
    } catch (error) {
        next(error);}
}
