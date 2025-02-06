//1. List all users 
//2. Update Role 
//3. Delete User

const  prisma  = require("../configs/prisma");

exports.listUsers = async(req, res, next)=>{
    //code 
   try {
    console.log(req.user)
    const users = await prisma.profile.findMany({
        // select: {
        //     id: true, 
        //     email: true, 
        //     firstname: true, 
        //     lastname: true,
        //     role: true,
        //     updatedAt: true, 
        //     createdAt: true,
        // }, 
        omit:{ // field ที่เราไม่เอาเป็น true แล้วมันจะซ่อนอันนั้นไว้ให้ 
            password: true
        }, 
    });
    // console.log(users);
    res.json({ result: users})
   } catch (error) {
    next(error)
   }
};

exports.updateRole = async(req,res,next) => {
    try {
        const {id, role} = req.body; 
        console.log(id, role); 
        // console.log(typeof id)
        const updated = await prisma.profile.update({
            where:{id: Number(id)},
            data:{role: role,}
        })

        res.json({message: "Update Success"})
        
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