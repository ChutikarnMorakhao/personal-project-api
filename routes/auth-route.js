const express = require("express"); 
const authRouter = express.Router()
const authController = require('../controllers/auth-controller');
const { validateWithZod, registerSchema, loginSchema } = require("../middlewares/validators");


//@ENDPOINT http://localhost:8999/api/register 
authRouter.post('/register', validateWithZod(registerSchema),authController.register)
authRouter.post('/login', validateWithZod(loginSchema),authController.login)

//export 
module.exports = authRouter;