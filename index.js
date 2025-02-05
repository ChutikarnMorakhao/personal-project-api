//import 
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
// Routing 
const authRouter = require('./routes/auth-route')


const app = express()


//Middlewares
app.use(cors()); // Allows cross domain 
app.use(morgan("dev")); 
app.use(express.json()); 

// Routing 
app.use("/api", authRouter)







//start Server
const PORT = 8999; 
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));