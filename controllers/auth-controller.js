const prisma = require("../configs/prisma");
const createError = require("../utils/createError")
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken")


exports.register = async(req, res, next)=>{
//code
try { 
    //code 
    // Step 1 req.body 
    const {email, firstname, lastname, password, confirmPassword} = req.body 
    // Step 2 validate
    // if(!email){  
    //     return createError(400,"Email is require"); 
    // }
    // if(!firstname){
    //     return createError(400,"Firstname is require"); 
    // }
    // Step 3 Check already 
    const checkEmail = await prisma.profile.findFirst({
        where:{
            email: email, 
        },      
    })
    console.log(checkEmail)
    if(checkEmail){
        return createError(400, "Email is already exits!!!")
    }

    // Step 4 Encrypt bcrypt
//const salt = bcrypt.genSaltSync(10)
const hashedPassword = bcrypt.hashSync(password,10)
// console.log(hashedPassword)

    // Step 5 Insert tp DB
  const profile = await prisma.profile.create({
    data:{
        email: email,
        firstname: firstname,
        lastname: lastname, 
        password: hashedPassword
    },
  })
    // Step 6 Response 

    res.json({message: "Register Success"})
} catch (error) {
    console.log(error)
    next(error); 
}};
exports.login = async(req, res, next)=>{
    //code
    try {
        //step 1 req.body 
        const {email, password} = req.body; 
        console.log(email, password);
        //step 2 check mail and password 
        const profile = await prisma.profile.findFirst({
            where:{
                email:email,  
            }
        }); 
        if(!profile){
            return createError(400, "Email, Password is invalid!!")
        }
        const isMatch = bcrypt.compareSync(password, profile.password)

        if(!isMatch){
            return createError(400, "Email, Password is invalid!!!")
        }

        //step 3 Generate token
      const payload = {
        id: profile.id, 
        email: profile.email, 
        firstname: profile.firstname, 
        lastname: profile.lastname,
        role: profile.role,
      }
const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn:"1D",  //อายุุ ของ token คือ session หมดเวลา 
})


       console.log(payload);
        //step 4 Response 
        res.json({
            message: "Login Success",
            payload: payload,
            token: token, 
        })
    } catch (error) {

        next(error);}
}

exports.currentUser = async (req, res, next) =>{
    //code
    try {
        res.json({message: "Hello, current user"})
        


    } catch (error) {
        next(error);
    }
}; 

