const ProductService = require("../services/ProductService");
const Validator = require("validatorjs");

class ProductController{

    async create(req,res){

        try{
            // rule
            const rules = {
                name: "required",
                price: "required|integer",
                description: "required",
                categoryId: "required"
                
            };
            // rule validator
            const validation = new Validator(req.body, rules);
            if (validation.fails()) {
                return res.status(400).json({
                    success: false,
                    errors: validation.errors.all()
                });
            }
            const data = req.body;

            if(req.file){
                data.image = req.file.filename;
            }

            const product = await ProductService.create(data);

            res.json(product);

        }catch(err){
            res.status(500).json({error:err.message});
        }

    }

    async list(req,res){

        const products = await ProductService.getAll();

        res.json(products);

    }

      async update(req,res){

        try{

            const id = req.params.id;
            const data = req.body;

            if(req.file){
                data.image = req.file.filename;
            }

            const product = await ProductService.update(id,data);

            res.json(product);

        }catch(err){
            res.status(500).json({error:err.message});
        }

    }

    async delete(req,res){

        try{

            const id = req.params.id;

            await ProductService.delete(id);

            res.json({
                message:"Product deleted successfully"
            });

        }catch(err){
            res.status(500).json({error:err.message});
        }

    }

}

module.exports = new ProductController();