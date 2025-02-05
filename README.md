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

## Step 7 










