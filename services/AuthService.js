const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Token = require("../utils/generateToken");

class AuthService {

    async register(data){

        const hash = await bcrypt.hash(data.password,10);

        const user = new User({
        name:data.name,
        email:data.email,
        password:hash,
        role:data.role || "user"
        });

        return await user.save();
    }

    async login(email,password){

        const user = await User.findOne({email});

        if(!user) throw new Error("Email not found");

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch) throw new Error("Invalid credentials");

        const token = Token.generate(user);

        return {user,token};
    }

     async getAllUsers(){

        return await User.find().select("-password");

    }

    async updateUser(id,data){

        if(!data.name){
           throw new Error("Name is required");
        }

        const user = await User.findByIdAndUpdate(
            id,
            { name: data.name },
            { new: true }
        ).select("-password");

        return user;

    }

    async deleteUser(id){

        return await User.findByIdAndDelete(id);

    }

}

module.exports = new AuthService();