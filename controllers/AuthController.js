const AuthService = require("../services/AuthService");
const Validator = require("validatorjs");
const User = require("../models/User");

class AuthController {

   async register(req, res) {

        try {
            // rule
            const rules = {
                name: "required",
                email: "required|email",
                password: "required|min:6",
                role: "required|integer"
            };
            // rule validator
            const validation = new Validator(req.body, rules);
            if (validation.fails()) {
                return res.status(400).json({
                    success: false,
                    errors: validation.errors.all()
                });
            }
             // Check duplicate email
            const existingUser = await User.findOne({ email: req.body.email });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    errors: {
                        email: ["Email already exists"]
                    }
                });
            }
            const user = await AuthService.register(req.body);
            res.json({ success: true, user });

        } catch (err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        }

    }

    async login(req,res){

        try{
            // rule
            const rules = {
                email: "required|email",
                password: "required"
            };
            // rule validator
            const validation = new Validator(req.body, rules);
            if (validation.fails()) {
                return res.status(400).json({
                    success: false,
                    errors: validation.errors.all()
                });
            }
            const result = await AuthService.login(
                req.body.email,
                req.body.password
            );

            res.json(result);

        }catch(err){
            res.status(400).json({error:err.message});
        }

    }

    async list(req,res){

        try{
            const users = await AuthService.getAllUsers();
            res.json({
                success:true,
                users
            });
        }catch(err){
            res.status(500).json({error:err.message});
        }
    }

    // UPDATE USER
    async update(req,res){

        try{

            const user = await AuthService.updateUser(
                req.params.id,
                req.body
            );

            res.json({
                success:true,
                user
            });

        }catch(err){
            res.status(500).json({error:err.message});
        }

    }

    // DELETE USER
    async delete(req,res){

        try{

            await AuthService.deleteUser(req.params.id);

            res.json({
                success:true,
                message:"User deleted successfully"
            });

        }catch(err){
            res.status(500).json({error:err.message});
        }

    }

}

module.exports = new AuthController();