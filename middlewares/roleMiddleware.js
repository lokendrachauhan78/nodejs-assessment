module.exports = function(roles){

    return (req,res,next)=>{

        if(!roles.includes(String(req.user.role))){
            return res.status(403).json({
                success:false,
                message:"Access denied"
            });
        }

        next();

    }

}