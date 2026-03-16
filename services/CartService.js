const Cart = require("../models/Cart");

class CartService {

    async addToCart(userId,data){

        const cart = new Cart({
            user:userId,
            product:data.product,
            quantity:data.quantity
        });

        return await cart.save();
    }

    async getCart(userId){

        return await Cart.find({user:userId})
            .populate("product");

    }

    async removeCart(id){

        return await Cart.findByIdAndDelete(id);
    }

}

module.exports = new CartService();