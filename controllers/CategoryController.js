const CategoryService = require("../services/CategoryService");
const Validator = require("validatorjs");

class CategoryController{

    async create(req,res){

        try{
            
            // rule
            const rules = {
                name: "required"
            };
            // rule validator
            const validation = new Validator(req.body, rules);
            if (validation.fails()) {
                return res.status(400).json({
                    success: false,
                    errors: validation.errors.all()
                });
            }

            const category = await CategoryService.create(req.body);

            res.json(category);

        }catch(err){
            res.status(500).json({error:err.message});
        }

    }

    async list(req,res){

        const categories = await CategoryService.getAll();

        res.json(categories);

    }

        async update(req,res){

        try{

            const category = await CategoryService.update(
                req.params.id,
                req.body
            );

            res.json({
                success:true,
                category
            });

        }catch(err){
            res.status(500).json({error:err.message});
        }

    }

    // DELETE CATEGORY
    async delete(req,res){

        try{

            await CategoryService.delete(req.params.id);

            res.json({
                success:true,
                message:"Category deleted successfully"
            });

        }catch(err){
            res.status(500).json({error:err.message});
        }

    }

}

module.exports = new CategoryController();