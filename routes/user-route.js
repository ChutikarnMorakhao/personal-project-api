const express = require("express"); 
const userRouter = express.Router();
// import controller 
const userController = require('../controllers/user-controller')

//@ENDPOINT http://localhost:8999/api/users
userRouter.get('/users', userController.listUsers)
userRouter.patch('/user/update-role', userController.updateRole)
userRouter.delete("/user/:id", userController.deleteUser) 



module.exports = userRouter;