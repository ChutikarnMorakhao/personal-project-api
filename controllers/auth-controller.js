exports.register =(req, res, next)=>{
//code
try { 
    res.json({message: "hello register"})
    
} catch (error) {
    console.log(error)
    res.status(500).json({message:"Server Error!!"})
    
}
};

exports.login = (req, res, next)=>{
    //code
    try {
        // console.log(sssksksk)

        res.json({message: "Hello Login"})
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: "Server Error!!"})
    }
}
