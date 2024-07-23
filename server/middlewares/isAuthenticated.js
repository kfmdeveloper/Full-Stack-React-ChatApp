const jwt = require("jsonwebtoken")
const isAuthenticated = async(req,res,next)=>{
    try {
        const token = req.cookies.token
      
        if(!token){
            return res.status(401).json({
                message:"User not Authenticated!",
                success:false
            })
        }
        const decode = await jwt.verify(token,process.env.JWT_SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                message:"invalid token"
            })
        }
        req.id = decode.userId
        next()
    } catch (error) {
        console.log(error);
    }
}



module.exports = isAuthenticated