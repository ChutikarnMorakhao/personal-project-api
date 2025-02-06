const express = require("express"); 
const authRouter = express.Router()
const authController = require('../controllers/auth-controller');
const { validateWithZod, registerSchema, loginSchema } = require("../middlewares/validators");
const { authCheck } = require("../middlewares/auth-middlewares");


//@ENDPOINT http://localhost:8999/api/register 
authRouter.post('/register', validateWithZod(registerSchema),authController.register)
authRouter.post('/login', validateWithZod(loginSchema),authController.login)

authRouter.get('/current-user',authCheck,authController.currentUser )


//export 
module.exports = authRouter;