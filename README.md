# Server 

## Step1 create package 

```bash
npm init -y

```

## Step 2 install package ...

```bash
npm install express nodemon cors morgan bcryptjs jsonwebtoken zod prisma

```
```bash
npx prisma init
```

## Step 3 Git 
```bash
git init
git add . 
git commit -m "message"
```
next step 
copy code from repo 

``` bash
git remote add origin https://github.com/ChutikarnMorakhao/personalproject-api.git
git branch -M main
git push -u origin main 
``` 

when update code
```bash
git add .
git commit -m "message"
git push
``` 

## Step 4 update package.json 

```js
"scripts": {
    "start": "nodemon index.js"
  },
``` 

and code index.js

```js
const express = require('express')
const app = express()

//start Server
const PORT = 8999; 
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

```

## Step 5 update import & middleware  ==> ./index.js
```js 
//import 
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()

//Middlewares
app.use(cors()); // Allows cross domain 
app.use(morgan("dev")); 
app.use(express.json()); 

// Routing 


//start Server
const PORT = 8999; 
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

```

## Step 6 Routing & Controller [Register ]

### Step 6.1 create folder routes ==> ./routes 
create file auth-route.js 
write code in this file 

```js
const express = require("express"); 
const authRouter = express.Router()
const authController = require('../controllers/auth-controller')

//@ENDPOINT http://localhost:8999/api/register 
authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)

//export 
module.exports = authRouter;
```
### Step 6.2 create folder controllers  ==> ./controllers 
create file auth-controller.js 
write code in this file 

```js
exports.register =(req, res, next)=>{
//code
try { 
    res.json({message: "hello register"}) 
} catch (error) {
    console.log(error)
    res.status(500).json({message:"Server Error!!"})
}};
exports.login = (req, res, next)=>{
    //code
    try {
        res.json({message: "Hello Login"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server Error!!"})
    }}
```
## Step 6.3 create path in post man  for authRouter & authRegister
create new folder --> Persolnal project --> Add request --> set name "authRouter-register" --> select "POST" --> http://localhost:8999/api/register 

![alt text](./postman.png)

create new request --> set name "authRouter-login" --> select "POST" --> http://localhost:8999/api/register 

![alt text](./postman2.png)

## Step 7 create Middlewares folder ==> ./middlewares 
create new file error.js --> ./middlewares/error.js 
write code in error.js 

```js
const handleErrors =(err, req, res, next)=>{
    //code
    res
    .status(err.statusCode || 500)
    .json({message: err.message || "Something wrong!!"});
};

module.exports = handleErrors; 
```
update code at index.js 
import 
```js
const handleErrors = require('./middlewares/error')
```
called error use in index.js 
```js
//handleErrors 
app.use(handleErrors)
``` 

update  "next(error)" in auth-controller.js file  
```js
exports.register =(req, res, next)=>{
//code
try { 
    res.json({message: "hello register"})
} catch (error) {
    console.log(error)
    next(error); }
};
exports.login = (req, res, next)=>{
    //code
    try {
        //console.log(sssksksk)
        res.json({message: "Hello Login"})
    } catch (error) {
        console.log(error.message)
        next(error);}
}

```
when update code in Github 

```bash
git add .
git commit -m "message"
git push
```  

## Step 8 Update code & use Postman 

postman
![alt text](./postman3.png)

update code in auth-controller
```js
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

```


## Step 9 Create utils folder => ./utils 
create file in utils --> ./utils/createError.js 
write createError code
```js
const createError =(code, message)=>{
//code

console.log("Step 1 create error")
const error = new Error(message)
error.statusCode = code; 
throw error; 

};
module.exports = createError; 
```

|METHOD|ENDPOINT|BODY|
|-----|-----|------|
|POST|/api/register|email,password|


## Step 10 validate with zod
/middlewares/validators.js  
 
```js
const { z } = require("zod"); 

// TEST validator
exports.registerSchema = z.object({
    email: z.string().email("email ไม่ถูกต้อง"), 
    firstname: z.string().min(3,"Firstname ต้องมากกว่า 3 อักขระ"), 
    lastname: z.string().min(3, "Lastname ต้องมากกว่า 3 อักขระ"), 
    password: z.string().min(6, "Password ต้องมากกว่า 6 อักขระ"), 
    confirmPassword: z.string().min(6, "Confirm Password ต้องมากกว่า 6 อักขระ"), 
}).refine((data)=>data.password === data.confirmPassword,{
    message:"confirm Password ไม่ตรงกัน",
    path:["confirmPassword"]
})

exports.loginSchema = z.object({
    email: z.string().email("email ไม่ถูกต้อง"), 
    password: z.string().min(6, "Password ต้องมากกว่า 6 อักขระ"), 
})


exports.validateWithZod = (schema) => (req, res, next) =>{
    try {
        console.log("Hello middleware")
        schema.parse(req.body)
        next(); 
    } catch (error) {
       const errMsg = error.errors.map((item) => item.message)
       const errTxt = errMsg.join(",")
       const mergeError = new Error(errTxt)
        next(mergeError);        
    }
}
```

and then update code 
/rotues/auth-route.js

```js 
const express = require("express"); 
const authRouter = express.Router()
const authController = require('../controllers/auth-controller');
const { validateWithZod, registerSchema, loginSchema } = require("../middlewares/validators");


//@ENDPOINT http://localhost:8999/api/register 
authRouter.post('/register', validateWithZod(registerSchema),authController.register)
authRouter.post('/login', validateWithZod(loginSchema),authController.login)

//export 
module.exports = authRouter;
```


## Step 11  Prisma 
```bash
npx prisma db push 
#or 
npx prisma migrate dev --name init 
```

## Step 12 update code in schema.prisma 
```js

```

## Step 13 ลง Prisma generate 

```bash 
sudo npx prisma generate 
```

## Step 14 Config prisma
/configs/prisma.js

```js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient(); 

module.exports = prisma; 

```

update code
Register
/controllers/auth-controller.js
```js
const prisma = require("../configs/prisma");
const createError = require("../utils/createError")
const bcrypt = require("bcryptjs"); 

exports.register = async(req, res, next)=>{
//code
try { 
    
    const {email, firstname, lastname, password, confirmPassword} = req.body 
  
    const checkEmail = await prisma.profile.findFirst({
        where:{
            email: email, 
        },      
    })
    console.log(checkEmail)
    if(checkEmail){
        return createError(400, "Email is already exits!!!")
    }

const hashedPassword = bcrypt.hashSync(password,10)

  const profile = await prisma.profile.create({
    data:{
        email: email,
        firstname: firstname,
        lastname: lastname, 
        password: hashedPassword
    },
  })
 

    res.json({message: "Register Success"})
} catch (error) {
    console.log(error)
    next(error); 
}};
exports.login = (req, res, next)=>{
    //code
    try {
        res.json({message: "Hello Login"})
    } catch (error) {
        console.log(error)
        next(error);}
}

```

## Step 15 Login 
/controllers/auth-controller.js 
```js
const prisma = require("../configs/prisma");
const createError = require("../utils/createError")
const bcrypt = require("bcryptjs"); 
const jwt = require("jsonwebtoken")
exports.register = async(req, res, next)=>{
try { 
    const {email, firstname, lastname, password, confirmPassword} = req.body 
    const checkEmail = await prisma.profile.findFirst({
        where:{
            email: email, 
        },      
    })
    console.log(checkEmail)
    if(checkEmail){
        return createError(400, "Email is already exits!!!")
    }
const hashedPassword = bcrypt.hashSync(password,10)

  const profile = await prisma.profile.create({
    data:{
        email: email,
        firstname: firstname,
        lastname: lastname, 
        password: hashedPassword
    },
  })
    res.json({message: "Register Success"})
} catch (error) {
    console.log(error)
    next(error); 
}};
exports.login = async(req, res, next)=>{
    try {
        const {email, password} = req.body; 
        console.log(email, password);
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
      const payload = {
        id: profile.id, 
        email: profile.email, 
        firstname: profile.firstname, 
        lastname: profile.lastname,
        role: profile.role,
      }
const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn:"1d", 
})
      console.log(payload);
        res.json({
            message: "Login Success",
            payload: payload,
            token: token, 
        })
    } catch (error) {

        next(error);}
}

```

## Step 16 Current-user
/controllers/auth-controller.js 
```js
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
    expiresIn:"1d", 
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



```


/controllers/auth-route.js 
```js
const express = require("express"); 
const authRouter = express.Router()
const authController = require('../controllers/auth-controller');
const { validateWithZod, registerSchema, loginSchema } = require("../middlewares/validators");


//@ENDPOINT http://localhost:8999/api/register 
authRouter.post('/register', validateWithZod(registerSchema),authController.register)
authRouter.post('/login', validateWithZod(loginSchema),authController.login)

authRouter.get('/current-user' ,authController.currentUser )

//export 
module.exports = authRouter;
```



## Step 17 User Controller & Routes 
/controllers/user-controller.js 
```js
//1. List all users 
//2. Update Role 
//3. Delete User

exports.listUsers = async(req, res, next)=>{
    //code 
   try {
    res.json({message: "Hello, List users"})
   } catch (error) {
    next(error)
   }
};

exports.updateRole = async(req,res,next) => {
    try {
        res.json({message: "Hello, Update Role"})
        
    } catch (error) {
     next(error); 
    }
}; 

exports.deleteUser = async(req, res, next)=>{
   try {

    res.json({message:"Hello, Delete User"})
    
   } catch (error) {
    next(error)
    
   }


}

```

/routes/user-route.js 
```js
const express = require("express"); 
const userRouter = express.Router();
// import controller 
const userController = require('../controllers/user-controller')

//@ENDPOINT http://localhost:8999/api/users
userRouter.get('/users', userController.listUsers)
userRouter.patch('/user/update-role', userController.updateRole)
userRouter.delete("/user/:id", userController.deleteUser) 

module.exports = userRouter;

```

## Step 18 Update index 

```js
//import 
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
// Routing 
const authRouter = require('./routes/auth-route')
const handleErrors = require('./middlewares/error')
const userRouter = require('./routes/user-route')
const app = express()

//Middlewares
app.use(cors()); // Allows cross domain 
app.use(morgan("dev")); 
app.use(express.json()); 

// Routing 
app.use("/api", authRouter)
app.use("/api", userRouter)


//handleErrors 
app.use(handleErrors)

//start Server
const PORT = 8999; 
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
```







