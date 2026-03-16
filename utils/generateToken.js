const jwt = require("jsonwebtoken");

class Token {

    static generate(user){

        return jwt.sign(
            {id:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        );
    }

}

module.exports = Token;