const jwt = require("jsonwebtoken");

module.exports = function(roles){

    return (req,res,next)=>{

        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({message:"No token"});
        }

        try{

            const decoded = jwt.verify(
                token.split(" ")[1],
                process.env.JWT_SECRET
            );

            req.user = decoded;

            // convert role to number
            const userRole = Number(decoded.role);

            if(roles && !roles.includes(userRole)){
                return res.status(403).json({
                    message:"Access denied"
                });
            }

            next();

        }catch(err){

            return res.status(401).json({
                message:"Invalid token"
            });

        }

    }

}