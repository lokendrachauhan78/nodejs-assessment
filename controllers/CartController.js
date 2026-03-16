const CartService = require("../services/CartService");
const Validator = require("validatorjs");

class CartController {

    async add(req,res){

        // rule
        const rules = {
            product: "required",
            quantity: "required|integer"
        };
        // rule validator
        const validation = new Validator(req.body, rules);
        if (validation.fails()) {
            return res.status(400).json({
                success: false,
                errors: validation.errors.all()
            });
        }

        const cart = await CartService.addToCart(
            req.user.id,
            req.body
        );

        res.json(cart);
    }

    async list(req,res){

        const cart = await CartService.getCart(req.user.id);

        res.json(cart);
    }

    async remove(req,res){

        await CartService.removeCart(req.params.id);

        res.json({message:"Removed"});
    }

}

module.exports = new CartController();