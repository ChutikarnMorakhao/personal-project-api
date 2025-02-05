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










