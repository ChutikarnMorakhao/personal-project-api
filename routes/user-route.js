const express = require("express"); 
const userRouter = express.Router();
// import controller 
const userController = require('../controllers/user-controller');
//Import Middleware
const { authCheck } = require("../middlewares/auth-middlewares");

//@ENDPOINT http://localhost:8999/api/users
userRouter.get('/users', authCheck,userController.listUsers)
userRouter.patch('/user/update-role',authCheck, userController.updateRole)
userRouter.delete("/user/:id",authCheck, userController.deleteUser) 



module.exports = userRouter;